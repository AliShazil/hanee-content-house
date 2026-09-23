import { GoogleDriveIcon } from "@/components/GoogleDriveIcon";
import type { Reel } from "@/lib/content";
import { DRIVE_URL } from "@/lib/links";

export function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" fill="none" aria-hidden="true">
      <path d="M7 17L17 7M17 7H8M17 7V16" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RecentWork({ reels }: { reels: Reel[] }) {
  return (
    <section className="relative bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="font-montserrat text-[28px] leading-[34px] font-semibold text-[rgb(244,244,242)] sm:text-[34px] sm:leading-[44px]">
          We build relationships.
        </p>
        <p className="mx-auto mt-1 max-w-[560px] font-montserrat text-[28px] leading-[34px] font-semibold text-[rgb(107,107,102)] sm:text-[34px] sm:leading-[44px]">
          A video editor you can count on, on time, every time.
        </p>
      </div>

      <div className="mx-auto mt-28 max-w-2xl px-6 text-center sm:mt-36">
        <span className="font-montserrat text-[16px] leading-[26px] font-normal tracking-[0.2em] text-[rgb(155,155,150)] uppercase">
          Recent Work
        </span>
        <h2 className="mt-4 font-montserrat text-[40px] leading-[42px] font-semibold text-[rgb(244,244,242)] sm:text-[54px] sm:leading-[55px]">
          Made to rewatch.
        </h2>
        <p className="mt-4 font-montserrat text-[16px] leading-[26px] font-normal text-[rgb(155,155,150)]">
          Creators and footage turned into content worth keeping.
        </p>
      </div>

      <div className="mt-16 flex gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-10">
        {reels.map((reel) => (
          <div
            key={reel.id}
            className="relative aspect-9/16 w-[220px] flex-none overflow-hidden rounded-2xl bg-black sm:w-[280px]"
          >
            <video
              src={reel.src}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
        ))}
        <a
          href={DRIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex aspect-9/16 w-[220px] flex-none flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-[rgb(24,24,24)] px-6 text-center transition-colors hover:bg-[rgb(32,32,32)] sm:w-[280px]"
        >
          <span className="font-montserrat text-[20px] leading-[30px] font-semibold text-[rgb(244,244,242)]">
            See more on
            <br />
            Google Drive
          </span>
          <span className="transition-transform duration-300 group-hover:scale-110">
            <GoogleDriveIcon />
          </span>
        </a>
      </div>
    </section>
  );
}
