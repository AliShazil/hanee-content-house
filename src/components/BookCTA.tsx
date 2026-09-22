export function BookCTA() {
  return (
    <section className="relative bg-black px-6 py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-neutral-900">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_10%_0%,rgba(168,85,247,0.28),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_90%_100%,rgba(168,85,247,0.22),transparent_70%)]" />

        <div className="relative flex flex-col items-center px-6 py-20 text-center sm:py-24">
          <h2 className="font-montserrat text-[40px] leading-[42px] font-semibold text-[rgb(244,244,242)] sm:text-[54px] sm:leading-[55px]">
            Have footage ready to edit?
          </h2>
          <p className="mt-4 max-w-md font-montserrat text-[16px] leading-[26px] font-normal text-[rgb(155,155,150)]">
            Our timeline is open, send it over and let&apos;s make it happen.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              className="rounded-full bg-violet-600 px-8 py-4 font-montserrat text-[15px] leading-[24px] font-semibold text-white transition-colors duration-300 hover:bg-violet-500"
            >
              Send Your Footage
            </button>
            <button
              type="button"
              className="rounded-full border border-white/15 bg-white/5 px-8 py-4 font-montserrat text-[15px] leading-[24px] font-semibold text-white transition-colors duration-300 hover:bg-white/10"
            >
              Call Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
