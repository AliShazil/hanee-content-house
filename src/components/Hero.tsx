import { getImageProps } from "next/image";
import { DiscordIcon } from "./DiscordIcon";

// `short` is shown on phones so the whole pill fits on one line.
const STATS = [
  { label: "Same-Day Turnaround", short: "Same-Day" },
  { label: "Unlimited Revisions", short: "Unlimited Revisions" },
];

function ResponsiveLabel({ label, short }: { label: string; short: string }) {
  if (label === short) return <>{label}</>;
  return (
    <>
      <span className="sm:hidden">{short}</span>
      <span className="hidden sm:inline">{label}</span>
    </>
  );
}

// Phones get a portrait version of the hero image; each device downloads only
// the one it shows. Matches Tailwind's `sm` breakpoint (640px).
const common = {
  alt: "Video editor working on footage at ContentHouse",
  fill: true,
  sizes: "100vw",
  loading: "eager",
  fetchPriority: "high",
} as const;

const {
  props: { srcSet: mobileSrcSet },
} = getImageProps({ ...common, src: "/mobile-hero.png" });
const { props: desktopProps } = getImageProps({ ...common, src: "/hero.png" });

export function Hero() {
  return (
    // svh = the height left over when the mobile browser's address bar is showing,
    // so the whole hero (including the button) fits on screen.
    <section className="relative flex min-h-svh w-full flex-col overflow-hidden bg-black">
      <picture>
        <source media="(max-width: 639px)" srcSet={mobileSrcSet} sizes="100vw" />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- src and alt come from getImageProps */}
        <img {...desktopProps} className="object-cover object-center" />
      </picture>

      {/* Vignette / legibility gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,0,0,0.75),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      {/* Copy */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-end px-4 pb-8 sm:px-6 text-center">
        <h1 className="font-inter text-[32px] leading-[34px] font-bold text-white sm:text-[46px] sm:leading-[47px]">
          On Demand
          <br />
          Video Editing
        </h1>

        <p className="mt-4 font-inter text-base leading-6 font-normal text-white/[0.78] sm:text-[18px] sm:leading-[24px]">
          Send your footage, get it back the same day
        </p>

        <div className="mt-6 flex items-center justify-center gap-x-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-2.5 whitespace-nowrap backdrop-blur-sm sm:gap-x-4 sm:px-6 sm:py-3">
          {STATS.map((stat, i) => (
            <span
              key={stat.label}
              className={`font-inter text-[11px] leading-[18px] font-semibold text-white/[0.92] sm:text-[15px] sm:leading-[24px] ${
                i > 0 ? "border-l border-white/20 pl-2.5 sm:pl-4" : ""
              }`}
            >
              <ResponsiveLabel label={stat.label} short={stat.short} />
            </span>
          ))}
          <span className="flex items-center gap-1.5 border-l border-white/20 pl-2.5 font-inter text-[11px] leading-[18px] font-semibold text-white/[0.92] sm:pl-4 sm:text-[15px] sm:leading-[24px]">
            <ResponsiveLabel label="Rated 5.0" short="5.0" />
            <span className="flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 20 20"
                  className="h-2.5 w-2.5 fill-current sm:h-3.5 sm:w-3.5"
                  aria-hidden="true"
                >
                  <path d="M10 1.5l2.63 5.33 5.87.85-4.25 4.14 1 5.85L10 14.9l-5.25 2.77 1-5.85L1.5 7.68l5.87-.85L10 1.5z" />
                </svg>
              ))}
            </span>
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 flex justify-center pt-6 pb-8 sm:pt-8 sm:pb-10">
        <a
          href="https://discord.com/users/956930765613039616"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 rounded-full bg-white px-8 py-4 font-montserrat text-[15px] leading-[24px] font-bold text-[#0a0a0a] transition-colors hover:bg-white/90"
        >
          <DiscordIcon className="h-5 w-5" />
          Contact Now
        </a>
      </div>
    </section>
  );
}
