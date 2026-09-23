"use client";

import { useState } from "react";

type Step = {
  number: string;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "The Plan",
    body: "Tell me about the footage and where it's going: Instagram, YouTube, wherever you post. Send over the raw files and a quick brief, and we get started.",
  },
  {
    number: "02",
    title: "We Edit",
    body: "I get to work on your footage right away, cutting to the brief we agreed on plus a few creative touches along the way. No crew, no back-and-forth, just the edit.",
  },
  {
    number: "03",
    title: "Preview Deliverables",
    body: "A preview lands in your inbox the same day. Flag any changes, I finish the polish, and the final files are yours to post.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 shrink-0 stroke-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        open ? "rotate-180" : "rotate-0"
      }`}
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function OurProcess() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <span className="font-montserrat text-[12px] leading-[18px] font-semibold tracking-[0.15em] text-[rgb(107,107,102)] uppercase">
          Our Process
        </span>
        <h2 className="mt-4 font-montserrat text-[40px] leading-[42px] font-semibold text-[rgb(244,244,242)] sm:text-[54px] sm:leading-[55px]">
          From plan to final files.
        </h2>
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-6">
        <div className="border-t border-white/10">
          {STEPS.map((step, index) => {
            const open = index === openIndex;
            const panelId = `process-panel-${step.number}`;

            return (
              <div key={step.number} className="border-b border-white/10">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="group flex w-full items-start justify-between gap-6 py-8 text-left focus-visible:outline-none"
                >
                  <div className="flex items-start gap-6 sm:gap-10">
                    <span className="pt-2 font-montserrat text-[13px] leading-[16px] font-medium tabular-nums text-[rgb(107,107,102)] sm:pt-3">
                      {step.number}
                    </span>
                    <span
                      className={`font-inter text-[26px] leading-[30px] font-medium uppercase transition-colors duration-300 sm:text-[33px] sm:leading-[34px] ${
                        open
                          ? "text-[rgb(244,244,242)]"
                          : "text-white/55 group-hover:text-white/80"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>

                  <span
                    className={`mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 sm:mt-3 ${
                      open ? "text-white/90" : "text-white/30 group-hover:text-white/60"
                    }`}
                  >
                    <ChevronIcon open={open} />
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-8 pl-[52px] font-montserrat text-[16px] leading-[26px] font-normal text-[rgb(155,155,150)] sm:pl-[64px]">
                      {step.body}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
