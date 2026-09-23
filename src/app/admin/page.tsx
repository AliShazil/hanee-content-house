import { redirect } from "next/navigation";
import { Dashboard } from "@/components/admin/Dashboard";
import { isAdmin } from "@/lib/auth";
import { getContent } from "@/lib/content";
import { logout } from "./actions";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const content = await getContent();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-24">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-montserrat text-[32px] leading-[40px] font-semibold text-[rgb(244,244,242)]">
            Dashboard
          </h1>
          <p className="mt-1 font-montserrat text-[14px] leading-[22px] text-[rgb(155,155,150)]">
            Changes go live on the website as soon as they&apos;re saved.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-montserrat text-[14px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            View site
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full px-5 py-2.5 font-montserrat text-[14px] font-semibold text-[rgb(155,155,150)] transition-colors hover:text-white"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      {!process.env.BLOB_READ_WRITE_TOKEN && (
        <p className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 font-montserrat text-[14px] text-amber-200">
          BLOB_READ_WRITE_TOKEN is not set, so uploads and saving won&apos;t work yet.
        </p>
      )}

      <Dashboard initialContent={content} />
    </main>
  );
}
