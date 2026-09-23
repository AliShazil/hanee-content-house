import { TELEGRAM_URL } from "@/lib/links";

export function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

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
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-4 font-montserrat text-[15px] leading-[24px] font-semibold text-white transition-colors duration-300 hover:bg-white/10"
            >
              <TelegramIcon />
              Contact Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
