"use server";

import { randomUUID } from "node:crypto";
import { del, head } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { endSession, isAdmin, passwordMatches, startSession } from "@/lib/auth";
import { getContent, saveContent, type SiteContent, type Testimonial } from "@/lib/content";
import {
  formatMB,
  MAX_NAME_LENGTH,
  MAX_PHOTO_BYTES,
  MAX_QUOTE_LENGTH,
  MAX_REELS,
  MAX_TESTIMONIALS,
  MAX_VIDEO_BYTES,
  MIN_REELS,
  PHOTOS_FOLDER,
  REELS_FOLDER,
} from "@/lib/limits";

// `id` is set when something new was created.
export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

const NOT_SIGNED_IN: ActionResult = { ok: false, error: "Not signed in." };

function isBlobUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

// Removes a file from our Blob store. Anything else (the bundled /public
// photos, or a file that's already gone) is ignored.
async function deleteBlob(url: string) {
  if (!isBlobUrl(url)) return;
  try {
    await del(url);
  } catch (error) {
    console.error("Failed to delete blob", url, error);
  }
}

function isInUse(content: SiteContent, url: string) {
  return content.reels.some((r) => r.src === url) || content.testimonials.some((t) => t.image === url);
}

// Checks a just-uploaded file against the limits using the store's own record
// of it, so the dashboard can't be tricked into saving something else.
// A file that fails is deleted straight away.
async function verifyUpload(
  url: string,
  kind: { folder: string; typePrefix: string; maxBytes: number; label: string },
): Promise<string | null> {
  if (!isBlobUrl(url)) return `Invalid ${kind.label} URL.`;

  let info;
  try {
    info = await head(url);
  } catch {
    return `That ${kind.label} could not be found in storage.`;
  }

  let problem: string | null = null;
  if (!info.pathname.startsWith(kind.folder)) problem = `Invalid ${kind.label} location.`;
  else if (!info.contentType.startsWith(kind.typePrefix)) problem = `That file is not a ${kind.label}.`;
  else if (info.size > kind.maxBytes) problem = `The ${kind.label} must be ${formatMB(kind.maxBytes)} or smaller.`;

  if (problem) await deleteBlob(url);
  return problem;
}

const VIDEO = { folder: REELS_FOLDER, typePrefix: "video/", maxBytes: MAX_VIDEO_BYTES, label: "video" };
const PHOTO = { folder: PHOTOS_FOLDER, typePrefix: "image/", maxBytes: MAX_PHOTO_BYTES, label: "photo" };

async function commit(content: SiteContent) {
  await saveContent(content);
  revalidatePath("/");
}

export async function login(_prev: string | null, formData: FormData): Promise<string | null> {
  if (!process.env.ADMIN_PASSWORD) return "ADMIN_PASSWORD is not configured on the server.";

  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    // Slows down anyone trying to guess the password.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "Wrong password.";
  }

  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

export async function addReel(src: string): Promise<ActionResult> {
  if (!(await isAdmin())) return NOT_SIGNED_IN;

  const content = await getContent();
  if (content.reels.length >= MAX_REELS) {
    await deleteBlob(src);
    return { ok: false, error: `You can have at most ${MAX_REELS} videos.` };
  }

  const problem = await verifyUpload(src, VIDEO);
  if (problem) return { ok: false, error: problem };

  const id = randomUUID();
  content.reels = [...content.reels, { id, src }];
  await commit(content);
  return { ok: true, id };
}

export async function replaceReel(id: string, src: string): Promise<ActionResult> {
  if (!(await isAdmin())) return NOT_SIGNED_IN;

  const content = await getContent();
  const existing = content.reels.find((reel) => reel.id === id);
  if (!existing) {
    await deleteBlob(src);
    return { ok: false, error: "Video not found." };
  }

  const problem = await verifyUpload(src, VIDEO);
  if (problem) return { ok: false, error: problem };

  const oldSrc = existing.src;
  content.reels = content.reels.map((reel) => (reel.id === id ? { ...reel, src } : reel));
  await commit(content);
  // Only remove the old file once the site no longer points at it.
  if (oldSrc !== src && !isInUse(content, oldSrc)) await deleteBlob(oldSrc);
  return { ok: true };
}

export async function deleteReel(id: string): Promise<ActionResult> {
  if (!(await isAdmin())) return NOT_SIGNED_IN;

  const content = await getContent();
  const existing = content.reels.find((reel) => reel.id === id);
  if (!existing) return { ok: true };
  if (content.reels.length <= MIN_REELS) {
    return { ok: false, error: `The site needs at least ${MIN_REELS} video. Use Replace instead.` };
  }

  content.reels = content.reels.filter((reel) => reel.id !== id);
  await commit(content);
  if (!isInUse(content, existing.src)) await deleteBlob(existing.src);
  return { ok: true };
}

export async function saveTestimonial(input: Omit<Testimonial, "id"> & { id?: string }): Promise<ActionResult> {
  if (!(await isAdmin())) return NOT_SIGNED_IN;

  const name = input.name.trim();
  const quote = input.quote.trim();
  const image = input.image.trim();
  if (!name || !quote) return { ok: false, error: "Name and testimonial text are required." };
  if (name.length > MAX_NAME_LENGTH) return { ok: false, error: `Name must be ${MAX_NAME_LENGTH} characters or fewer.` };
  if (quote.length > MAX_QUOTE_LENGTH) {
    return { ok: false, error: `Testimonial must be ${MAX_QUOTE_LENGTH} characters or fewer.` };
  }

  const content = await getContent();
  const existing = input.id ? content.testimonials.find((t) => t.id === input.id) : undefined;
  if (input.id && !existing) return { ok: false, error: "Testimonial not found." };
  if (!existing && content.testimonials.length >= MAX_TESTIMONIALS) {
    return { ok: false, error: `You can have at most ${MAX_TESTIMONIALS} testimonials.` };
  }

  // A new photo must be a fresh upload; an unchanged one (including the
  // bundled /public photos) is kept as is.
  const photoChanged = image !== "" && image !== existing?.image;
  if (photoChanged) {
    const problem = await verifyUpload(image, PHOTO);
    if (problem) return { ok: false, error: problem };
  }

  const id = existing?.id ?? randomUUID();
  content.testimonials = existing
    ? content.testimonials.map((t) => (t.id === id ? { id, name, quote, image } : t))
    : [...content.testimonials, { id, name, quote, image }];

  await commit(content);
  if (existing && existing.image !== image && !isInUse(content, existing.image)) await deleteBlob(existing.image);
  return { ok: true, id };
}

export async function deleteTestimonial(id: string): Promise<ActionResult> {
  if (!(await isAdmin())) return NOT_SIGNED_IN;

  const content = await getContent();
  const existing = content.testimonials.find((t) => t.id === id);
  if (!existing) return { ok: true };

  content.testimonials = content.testimonials.filter((t) => t.id !== id);
  await commit(content);
  if (!isInUse(content, existing.image)) await deleteBlob(existing.image);
  return { ok: true };
}

// Cleans up a file that was uploaded but never saved (e.g. a photo picked and
// then cancelled). Files the site is using are never touched.
export async function discardUpload(url: string): Promise<ActionResult> {
  if (!(await isAdmin())) return NOT_SIGNED_IN;
  if (!isBlobUrl(url)) return { ok: true };

  const content = await getContent();
  if (isInUse(content, url)) return { ok: true };

  try {
    const info = await head(url);
    if (info.pathname.startsWith(REELS_FOLDER) || info.pathname.startsWith(PHOTOS_FOLDER)) await deleteBlob(url);
  } catch {
    // Already gone.
  }
  return { ok: true };
}
