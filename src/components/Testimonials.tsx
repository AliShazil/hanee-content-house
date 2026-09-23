"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/Avatar";
import type { Testimonial } from "@/lib/content";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 stroke-current ${direction === "left" ? "rotate-180" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 12h16M14 6l6 6-6 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState({ start: 0, size: 1 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = track;
      setScroll({ start: scrollLeft / scrollWidth, size: clientWidth / scrollWidth });
    };

    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    track.scrollBy({ left: direction * (card.offsetWidth + 24), behavior: "smooth" });
  };

  const atStart = scroll.start <= 0.001;
  const atEnd = scroll.start + scroll.size >= 0.999;

  if (testimonials.length === 0) return null;

  return (
    <section className="relative bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <span className="font-montserrat text-[12px] leading-[18px] font-semibold tracking-[0.15em] text-[rgb(107,107,102)] uppercase">
          Testimonials
        </span>
        <h2 className="mt-4 font-montserrat text-[40px] leading-[42px] font-semibold text-[rgb(244,244,242)] sm:text-[54px] sm:leading-[55px]">
          Reviews from real clients.
        </h2>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex-none lg:w-[240px]">
          <span
            aria-hidden="true"
            className="block font-montserrat text-[96px] leading-[0.8] font-bold text-violet-500"
          >
            &ldquo;
          </span>
          <p className="mt-4 font-montserrat text-[24px] leading-[32px] font-semibold text-[rgb(244,244,242)]">
            What our clients are saying
          </p>

          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => scrollByCard(-1)}
              disabled={atStart}
              className="text-white transition-colors hover:text-violet-400 disabled:text-white/30"
            >
              <ArrowIcon direction="left" />
            </button>
            <div className="relative h-px w-28 bg-white/15" aria-hidden="true">
              <div
                className="absolute inset-y-[-1px] rounded-full bg-white"
                style={{ left: `${scroll.start * 100}%`, width: `${scroll.size * 100}%` }}
              />
            </div>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => scrollByCard(1)}
              disabled={atEnd}
              className="text-white transition-colors hover:text-violet-400 disabled:text-white/30"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="-mx-6 flex min-w-0 flex-1 snap-x snap-mandatory gap-6 overflow-x-auto px-6 [scrollbar-width:none] lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t) => (
            <figure key={t.id}className="flex w-[290px] flex-none snap-start flex-col sm:w-[340px]">
              <div className="relative flex min-h-[260px] flex-1 flex-col rounded-2xl rounded-bl-none bg-neutral-900 p-8">
                <blockquote className="font-montserrat text-[15px] leading-[24px] font-normal text-[rgb(200,200,196)]">
                  {t.quote}
                </blockquote>
                <span
                  aria-hidden="true"
                  className="absolute top-[calc(100%-1px)] left-0 h-6 w-8 bg-neutral-900 [clip-path:polygon(0_0,100%_0,0_100%)]"
                />
              </div>
              <figcaption className="mt-3 flex items-center gap-3 pl-11">
                <Avatar name={t.name} image={t.image} />
                <span className="font-montserrat text-[15px] leading-[22px] font-semibold text-[rgb(244,244,242)]">
                  {t.name}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
