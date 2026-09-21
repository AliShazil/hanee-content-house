import Image from "next/image";
import { DiscordIcon } from "./DiscordIcon";

const STATS = [
  { label: "Same-Day Footage" },
  { label: "Raw Files Included" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black">
      <Image
        src="/hero.png"
        alt="Videographer filming on set at ContentHouse"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Vignette / legibility gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,0,0,0.75),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      {/* Copy */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-end px-6 pb-8 text-center">
        <h1 className="font-inter text-[32px] leading-[34px] font-bold text-white sm:text-[46px] sm:leading-[47px]">
          On Demand
          <br />
          Videographer
          <br />
          in Miami
        </h1>

        <p className="mt-4 font-inter text-base leading-6 font-normal text-white/[0.78] sm:text-[18px] sm:leading-[24px]">
          Book when the moment happens
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-sm">
          {STATS.map((stat, i) => (
            <span
              key={stat.label}
              className={`font-inter text-[15px] leading-[24px] font-semibold text-white/[0.92] ${
                i > 0 ? "border-l border-white/20 pl-4" : ""
              }`}
            >
              {stat.label}
            </span>
          ))}
          <span className="flex items-center gap-1.5 border-l border-white/20 pl-4 font-inter text-[15px] leading-[24px] font-semibold text-white/[0.92]">
            Rated 5.0
            <span className="flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 20 20"
                  className="h-3.5 w-3.5 fill-current"
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
      <div className="relative z-10 flex justify-center pb-10 pt-8">
        <a
          href="#contact"
          className="flex items-center gap-2.5 rounded-full bg-white px-8 py-4 font-montserrat text-[15px] leading-[24px] font-bold text-[#0a0a0a] transition-colors hover:bg-white/90"
        >
          <DiscordIcon className="h-5 w-5" />
          Contact Now
        </a>
      </div>
    </section>
  );
}
