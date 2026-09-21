import { InstagramIcon } from "./InstagramIcon";

const REELS = [
  { id: 1, gradient: "from-slate-800 via-slate-900 to-black" },
  { id: 2, gradient: "from-zinc-700 via-neutral-900 to-black" },
  { id: 3, gradient: "from-stone-700 via-stone-900 to-black" },
  { id: 4, gradient: "from-emerald-900 via-neutral-900 to-black" },
  { id: 5, gradient: "from-amber-900 via-neutral-900 to-black" },
  { id: 6, gradient: "from-sky-900 via-neutral-900 to-black" },
];

export function RecentWork() {
  return (
    <section className="relative bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="font-montserrat text-[28px] leading-[34px] font-semibold text-[rgb(244,244,242)] sm:text-[34px] sm:leading-[44px]">
          We build relationships.
        </p>
        <p className="mx-auto mt-1 max-w-[560px] font-montserrat text-[28px] leading-[34px] font-semibold text-[rgb(107,107,102)] sm:text-[34px] sm:leading-[44px]">
          A videographer you can count on, on time, every time.
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
          Creators, brands, and moments worth keeping.
        </p>
      </div>

      <div className="mt-16 flex gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-10">
        {REELS.map((reel) => (
          <div
            key={reel.id}
            className={`relative aspect-9/16 w-[220px] flex-none overflow-hidden rounded-2xl bg-gradient-to-b ${reel.gradient} sm:w-[280px]`}
          >
            <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
              <InstagramIcon className="h-4 w-4 text-white" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
