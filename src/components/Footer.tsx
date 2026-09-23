import { TelegramIcon } from "@/components/BookCTA";
import { Logo } from "@/components/Logo";
import { ArrowUpRightIcon } from "@/components/RecentWork";
import { DRIVE_URL, TELEGRAM_URL } from "@/lib/links";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_100%,rgba(168,85,247,0.18),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-10 sm:pt-32">
        <h2 className="max-w-4xl font-montserrat text-[40px] leading-[42px] font-semibold tracking-[-0.02em] sm:text-[64px] sm:leading-[64px] lg:text-[88px] lg:leading-[84px]">
          <span className="text-[rgb(244,244,242)]">Let&apos;s create</span>{" "}
          <span className="text-[rgb(107,107,102)]">something worth replaying.</span>
        </h2>

        <div className="mt-12 flex flex-wrap items-center gap-4 sm:mt-16">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-full bg-violet-600 px-7 py-3.5 font-montserrat text-[15px] leading-[24px] font-semibold text-white transition-colors duration-300 hover:bg-violet-500"
          >
            <TelegramIcon />
            Contact Now
          </a>
          <a
            href={DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-montserrat text-[15px] leading-[24px] font-semibold text-white transition-colors duration-300 hover:bg-white/10"
          >
            See our work
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRightIcon />
            </span>
          </a>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-white/10 pt-8 sm:mt-28 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <p className="font-montserrat text-[13px] leading-[20px] text-[rgb(107,107,102)]">
            &copy; {new Date().getFullYear()} Hanee Content House. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
