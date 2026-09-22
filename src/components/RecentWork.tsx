const REELS = [
  {
    id: 1,
    src: "https://zdccaqftbogey5lb.public.blob.vercel-storage.com/HV1.mp4",
  },
  {
    id: 2,
    src: "https://zdccaqftbogey5lb.public.blob.vercel-storage.com/HV2.mp4",
  },
  {
    id: 3,
    src: "https://zdccaqftbogey5lb.public.blob.vercel-storage.com/HV3.mp4",
  },
  {
    id: 4,
    src: "https://zdccaqftbogey5lb.public.blob.vercel-storage.com/HV4.mp4",
  },
  {
    id: 5,
    src: "https://zdccaqftbogey5lb.public.blob.vercel-storage.com/HV5.mp4",
  },
];

export function RecentWork() {
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
          Creators, brands, and footage turned into content worth keeping.
        </p>
      </div>

      <div className="mt-16 flex gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-10">
        {REELS.map((reel) => (
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
      </div>
    </section>
  );
}
