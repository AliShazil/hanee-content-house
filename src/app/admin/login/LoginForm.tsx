"use client";

import { useActionState } from "react";
import { login } from "../actions";

export function LoginForm() {
  const [error, formAction, pending] = useActionState(login, null);

  return (
    <form
      action={formAction}
      className="w-full max-w-sm rounded-2xl border border-white/10 bg-neutral-900 p-8"
    >
      <h1 className="font-montserrat text-[24px] leading-[32px] font-semibold text-[rgb(244,244,242)]">
        Admin sign in
      </h1>
      <p className="mt-2 font-montserrat text-[14px] leading-[22px] text-[rgb(155,155,150)]">
        Manage the videos and testimonials on the site.
      </p>

      <label htmlFor="password" className="mt-8 block font-montserrat text-[13px] font-semibold text-[rgb(200,200,196)]">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        autoFocus
        autoComplete="current-password"
        className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-montserrat text-[15px] text-white outline-none focus:border-violet-500"
      />

      {error && (
        <p role="alert" className="mt-3 font-montserrat text-[13px] text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-full bg-violet-600 px-6 py-3 font-montserrat text-[15px] font-semibold text-white transition-colors hover:bg-violet-500 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
