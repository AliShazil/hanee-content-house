"use client";

import { upload } from "@vercel/blob/client";
import { useRef, useState, useTransition } from "react";
import {
  addReel,
  deleteReel,
  deleteTestimonial,
  discardUpload,
  replaceReel,
  saveTestimonial,
  type ActionResult,
} from "@/app/admin/actions";
import { Avatar } from "@/components/Avatar";
import type { Reel, SiteContent, Testimonial } from "@/lib/content";
import {
  formatMB,
  MAX_NAME_LENGTH,
  MAX_PHOTO_BYTES,
  MAX_QUOTE_LENGTH,
  MAX_REELS,
  MAX_TESTIMONIALS,
  MAX_VIDEO_BYTES,
  MIN_REELS,
} from "@/lib/limits";

async function uploadFile(
  folder: "reels" | "testimonials",
  file: File,
  onProgress: (percent: number) => void,
  clientPayload?: string,
) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const blob = await upload(`${folder}/${safeName}`, file, {
    access: "public",
    handleUploadUrl: "/api/blob-upload",
    clientPayload,
    onUploadProgress: ({ percentage }) => onProgress(Math.round(percentage)),
  });
  return blob.url;
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

const primaryButton =
  "rounded-full bg-violet-600 px-5 py-2.5 font-montserrat text-[14px] font-semibold text-white transition-colors hover:bg-violet-500 disabled:opacity-60";
const secondaryButton =
  "rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-montserrat text-[14px] font-semibold text-white transition-colors hover:bg-white/10 disabled:opacity-60";
const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-montserrat text-[15px] text-white outline-none focus:border-violet-500";

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="font-montserrat text-[22px] leading-[30px] font-semibold text-[rgb(244,244,242)]">{title}</h2>
      <p className="mt-1 font-montserrat text-[14px] leading-[22px] text-[rgb(155,155,150)]">{description}</p>
    </div>
  );
}

// Picks a video, checks it locally, uploads it, then hands the URL to a server
// action. The server re-checks everything; the local check just saves a wasted upload.
function useVideoUpload(
  save: (url: string) => Promise<ActionResult>,
  onSaved: (url: string, id?: string) => void,
  isAdd = false,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (inputRef.current) inputRef.current.value = "";
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setError("Please choose a video file.");
      return;
    }
    if (file.size > MAX_VIDEO_BYTES) {
      setError(`This video is ${formatMB(file.size)}. Videos must be ${formatMB(MAX_VIDEO_BYTES)} or smaller.`);
      return;
    }

    setError(null);
    setProgress(0);
    let url: string | null = null;
    try {
      url = await uploadFile("reels", file, setProgress, isAdd ? "add" : undefined);
      const result = await save(url);
      if (!result.ok) {
        // The server has already removed a rejected file.
        url = null;
        throw new Error(result.error);
      }
      onSaved(url, result.id);
    } catch (e) {
      setError(errorMessage(e));
      if (url) void discardUpload(url);
    } finally {
      setProgress(null);
    }
  };

  const fileInput = (
    <input
      ref={inputRef}
      type="file"
      accept="video/*"
      className="hidden"
      onChange={(e) => handleFile(e.target.files?.[0])}
    />
  );

  return { fileInput, pick: () => inputRef.current?.click(), progress, error };
}

function UploadOverlay({ progress }: { progress: number }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 px-6">
      <span className="font-montserrat text-[14px] font-semibold text-white">Uploading… {progress}%</span>
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/15">
        <div className="h-full bg-violet-500 transition-[width]" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="font-montserrat text-[13px] leading-[20px] text-red-400">
      {children}
    </p>
  );
}

function ReelCard({
  reel,
  index,
  canRemove,
  onReplaced,
  onRemoved,
}: {
  reel: Reel;
  index: number;
  canRemove: boolean;
  onReplaced: (src: string) => void;
  onRemoved: () => void;
}) {
  const { fileInput, pick, progress, error } = useVideoUpload((url) => replaceReel(reel.id, url), onReplaced);
  const [confirming, setConfirming] = useState(false);
  const [removeError, setRemoveError] = useState<string | null>(null);
  const [removing, startRemoving] = useTransition();
  const uploading = progress !== null;

  const remove = () => {
    setRemoveError(null);
    startRemoving(async () => {
      const result = await deleteReel(reel.id);
      if (result.ok) onRemoved();
      else {
        setRemoveError(result.error);
        setConfirming(false);
      }
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-9/16 overflow-hidden rounded-2xl bg-neutral-900">
        <video key={reel.src} src={reel.src} className="h-full w-full object-cover" muted loop playsInline autoPlay />
        <span className="absolute top-3 left-3 rounded-full bg-black/60 px-2.5 py-1 font-montserrat text-[12px] font-semibold text-white">
          Video {index + 1}
        </span>
        {uploading && <UploadOverlay progress={progress} />}
      </div>

      {fileInput}
      {confirming ? (
        <div className="flex flex-col gap-2">
          <p className="font-montserrat text-[13px] leading-[20px] text-[rgb(200,200,196)]">
            Remove this video from the site? It will be deleted for good.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={removing}
              onClick={remove}
              className="flex-1 rounded-full bg-red-600 px-4 py-2.5 font-montserrat text-[14px] font-semibold text-white transition-colors hover:bg-red-500 disabled:opacity-60"
            >
              {removing ? "Removing…" : "Remove"}
            </button>
            <button
              type="button"
              disabled={removing}
              onClick={() => setConfirming(false)}
              className={`flex-1 ${secondaryButton}`}
            >
              Keep
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <button type="button" disabled={uploading} onClick={pick} className={`flex-1 ${primaryButton}`}>
            {uploading ? "Uploading…" : "Replace"}
          </button>
          {canRemove && (
            <button
              type="button"
              disabled={uploading}
              onClick={() => setConfirming(true)}
              aria-label={`Remove video ${index + 1}`}
              title="Remove video"
              className="flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-3.5 text-[rgb(155,155,150)] transition-colors hover:border-red-500/50 hover:text-red-400 disabled:opacity-60"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" aria-hidden="true">
                <path
                  d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M9 7V4h6v3"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      )}
      {error && <ErrorText>{error}</ErrorText>}
      {removeError && <ErrorText>{removeError}</ErrorText>}
    </div>
  );
}

function AddReelCard({ onAdded }: { onAdded: (id: string, src: string) => void }) {
  const { fileInput, pick, progress, error } = useVideoUpload(
    addReel,
    (url, id) => {
      if (id) onAdded(id, url);
    },
    true,
  );
  const uploading = progress !== null;

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        disabled={uploading}
        onClick={pick}
        className="relative flex aspect-9/16 flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-dashed border-white/20 bg-neutral-950 px-4 text-center transition-colors hover:border-violet-500 hover:bg-neutral-900"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-[26px] leading-none text-white">
          +
        </span>
        <span className="font-montserrat text-[14px] font-semibold text-white">Add video</span>
        <span className="font-montserrat text-[12px] text-[rgb(155,155,150)]">Up to {formatMB(MAX_VIDEO_BYTES)}</span>
        {uploading && <UploadOverlay progress={progress} />}
      </button>
      {fileInput}
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

type Draft = { id?: string; name: string; quote: string; image: string };

function TestimonialForm({
  initial,
  onSaved,
  onCancel,
}: {
  initial: Draft;
  onSaved: (draft: Draft) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(initial);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, startSaving] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  // A photo uploaded in this form but never saved would otherwise sit in storage forever.
  const discardUnsavedPhoto = (url: string) => {
    if (url && url !== initial.image) void discardUpload(url);
  };

  const handlePhoto = async (file: File | undefined) => {
    if (fileRef.current) fileRef.current.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setError(`Photos must be ${formatMB(MAX_PHOTO_BYTES)} or smaller.`);
      return;
    }

    setError(null);
    setProgress(0);
    try {
      const url = await uploadFile("testimonials", file, setProgress);
      discardUnsavedPhoto(draft.image);
      setDraft((d) => ({ ...d, image: url }));
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setProgress(null);
    }
  };

  const removePhoto = () => {
    discardUnsavedPhoto(draft.image);
    setDraft((d) => ({ ...d, image: "" }));
  };

  const cancel = () => {
    discardUnsavedPhoto(draft.image);
    onCancel();
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startSaving(async () => {
      const result = await saveTestimonial(draft);
      if (result.ok) {
        onSaved({ ...draft, id: result.id, name: draft.name.trim(), quote: draft.quote.trim() });
      } else {
        setError(result.error);
      }
    });
  };

  const busy = saving || progress !== null;

  return (
    <form onSubmit={submit} className="rounded-2xl border border-violet-500/40 bg-neutral-900 p-6">
      <div className="flex items-center gap-4">
        <Avatar name={draft.name} image={draft.image} size={56} />
        <div className="flex flex-wrap gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handlePhoto(e.target.files?.[0])}
          />
          <button type="button" disabled={busy} onClick={() => fileRef.current?.click()} className={secondaryButton}>
            {progress !== null ? `Uploading… ${progress}%` : draft.image ? "Change photo" : "Upload photo"}
          </button>
          {draft.image && (
            <button
              type="button"
              disabled={busy}
              onClick={removePhoto}
              className="px-3 font-montserrat text-[14px] font-semibold text-[rgb(155,155,150)] hover:text-white"
            >
              Remove photo
            </button>
          )}
        </div>
      </div>

      <label className="mt-6 block font-montserrat text-[13px] font-semibold text-[rgb(200,200,196)]">
        Name
        <input
          value={draft.name}
          onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
          maxLength={MAX_NAME_LENGTH}
          required
          className={inputClass}
        />
      </label>

      <label className="mt-4 block font-montserrat text-[13px] font-semibold text-[rgb(200,200,196)]">
        Testimonial
        <textarea
          value={draft.quote}
          onChange={(e) => setDraft((d) => ({ ...d, quote: e.target.value }))}
          maxLength={MAX_QUOTE_LENGTH}
          rows={5}
          required
          className={`${inputClass} resize-y leading-[24px]`}
        />
        <span className="mt-1 block text-right font-normal text-[rgb(107,107,102)]">
          {draft.quote.length} / {MAX_QUOTE_LENGTH}
        </span>
      </label>

      {error && (
        <div className="mt-3">
          <ErrorText>{error}</ErrorText>
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <button type="submit" disabled={busy} className={primaryButton}>
          {saving ? "Saving…" : "Save"}
        </button>
        <button type="button" disabled={busy} onClick={cancel} className={secondaryButton}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function TestimonialRow({
  testimonial,
  onEdit,
  onDeleted,
}: {
  testimonial: Testimonial;
  onEdit: () => void;
  onDeleted: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, startDeleting] = useTransition();

  const remove = () => {
    startDeleting(async () => {
      const result = await deleteTestimonial(testimonial.id);
      if (result.ok) onDeleted();
      else setError(result.error);
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-neutral-900 p-6 sm:flex-row sm:items-start">
      <Avatar name={testimonial.name} image={testimonial.image} size={48} />
      <div className="min-w-0 flex-1">
        <p className="font-montserrat text-[16px] font-semibold text-[rgb(244,244,242)]">{testimonial.name}</p>
        <p className="mt-2 font-montserrat text-[14px] leading-[22px] text-[rgb(200,200,196)]">{testimonial.quote}</p>
        {error && (
          <p role="alert" className="mt-2 font-montserrat text-[13px] text-red-400">
            {error}
          </p>
        )}
      </div>
      <div className="flex flex-none gap-2">
        {confirming ? (
          <>
            <button
              type="button"
              disabled={deleting}
              onClick={remove}
              className="rounded-full bg-red-600 px-5 py-2.5 font-montserrat text-[14px] font-semibold text-white transition-colors hover:bg-red-500 disabled:opacity-60"
            >
              {deleting ? "Deleting…" : "Confirm delete"}
            </button>
            <button type="button" disabled={deleting} onClick={() => setConfirming(false)} className={secondaryButton}>
              Keep
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={onEdit} className={secondaryButton}>
              Edit
            </button>
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="rounded-full px-4 py-2.5 font-montserrat text-[14px] font-semibold text-[rgb(155,155,150)] transition-colors hover:text-red-400"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function Dashboard({ initialContent }: { initialContent: SiteContent }) {
  const [reels, setReels] = useState(initialContent.reels);
  const [testimonials, setTestimonials] = useState(initialContent.testimonials);
  // "new" for the add form, a testimonial id for its edit form, null when no form is open.
  const [editing, setEditing] = useState<string | null>(null);
  const atTestimonialLimit = testimonials.length >= MAX_TESTIMONIALS;

  return (
    <div className="mt-10 flex flex-col gap-16">
      <section className="flex flex-col gap-6">
        <SectionHeading
          title={`Recent Work videos (${reels.length} of ${MAX_REELS})`}
          description={`Replace, remove, or add videos from your device. Each video must be ${formatMB(MAX_VIDEO_BYTES)} or smaller. Vertical (9:16) videos look best.`}
        />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {reels.map((reel, index) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              index={index}
              canRemove={reels.length > MIN_REELS}
              onReplaced={(src) => setReels((rs) => rs.map((r) => (r.id === reel.id ? { ...r, src } : r)))}
              onRemoved={() => setReels((rs) => rs.filter((r) => r.id !== reel.id))}
            />
          ))}
          {reels.length < MAX_REELS && (
            <AddReelCard onAdded={(id, src) => setReels((rs) => [...rs, { id, src }])} />
          )}
        </div>
        {reels.length >= MAX_REELS && (
          <p className="font-montserrat text-[14px] text-[rgb(155,155,150)]">
            You&apos;ve reached the {MAX_REELS}-video limit. Use Replace to swap one out.
          </p>
        )}
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            title={`Testimonials (${testimonials.length} of ${MAX_TESTIMONIALS})`}
            description="Shown in the order below on the website."
          />
          {editing !== "new" && (
            <button
              type="button"
              disabled={atTestimonialLimit}
              onClick={() => setEditing("new")}
              className={primaryButton}
            >
              Add testimonial
            </button>
          )}
        </div>
        {atTestimonialLimit && (
          <p className="font-montserrat text-[14px] text-[rgb(155,155,150)]">
            You&apos;ve reached the {MAX_TESTIMONIALS}-testimonial limit. Delete one to add another.
          </p>
        )}

        {editing === "new" && (
          <TestimonialForm
            initial={{ name: "", quote: "", image: "" }}
            onCancel={() => setEditing(null)}
            onSaved={(draft) => {
              if (draft.id) setTestimonials((ts) => [...ts, { ...draft, id: draft.id! }]);
              setEditing(null);
            }}
          />
        )}

        <div className="flex flex-col gap-4">
          {testimonials.map((t) =>
            editing === t.id ? (
              <TestimonialForm
                key={t.id}
                initial={t}
                onCancel={() => setEditing(null)}
                onSaved={(draft) => {
                  setTestimonials((ts) =>
                    ts.map((x) => (x.id === t.id ? { ...x, name: draft.name, quote: draft.quote, image: draft.image } : x)),
                  );
                  setEditing(null);
                }}
              />
            ) : (
              <TestimonialRow
                key={t.id}
                testimonial={t}
                onEdit={() => setEditing(t.id)}
                onDeleted={() => setTestimonials((ts) => ts.filter((x) => x.id !== t.id))}
              />
            ),
          )}
          {testimonials.length === 0 && (
            <p className="font-montserrat text-[14px] text-[rgb(155,155,150)]">
              No testimonials yet. The section is hidden on the website until you add one.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
