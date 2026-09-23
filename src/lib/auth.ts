import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const SESSION_SECONDS = 60 * 60 * 24 * 7;

function secret() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD is not set");
  return password;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export function passwordMatches(input: string) {
  // Compare HMACs so the check takes the same time whatever the input length.
  return safeEqual(sign(`pw:${input}`), sign(`pw:${secret()}`));
}

export async function startSession() {
  const expires = Date.now() + SESSION_SECONDS * 1000;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, `${expires}.${sign(`session:${expires}`)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
}

export async function endSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdmin() {
  // Read cookies first so callers are always rendered per request.
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  if (!value || !process.env.ADMIN_PASSWORD) return false;

  const [expires, signature] = value.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;

  return safeEqual(signature, sign(`session:${expires}`));
}
