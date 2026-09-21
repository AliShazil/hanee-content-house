"use client";

import { useState } from "react";

type QA = {
  question: string;
  answer: string;
};

const QUESTIONS: QA[] = [
  {
    question: "What are your packages?",
    answer:
      "Priced by filming time: two hours is $329, six hours is $629, raw media included. Two hours is the minimum. Extra cameras or bigger projects are quoted on top, so reach out with the idea and we point you to the right service.",
  },
  {
    question: "What do you film?",
    answer:
      "Content for social: reels, TikToks, YouTube, brand day-in-the-life, events, product shoots. If it needs a camera and someone who knows how to use it, it's in scope.",
  },
  {
    question: "Do you travel?",
    answer:
      "Yes. Miami is home base, but flights are welcome. Send the location and dates and we'll quote travel on top.",
  },
  {
    question: "How fast do I get my footage?",
    answer:
      "Raw selects land in your inbox within 48 hours of the shoot. Rush turnaround is available if you need it sooner.",
  },
  {
    question: "Do I get the raw files?",
    answer: "Yes, raw media is included in every package. Nothing sits behind an extra fee.",
  },
  {
    question: "How does the deposit work?",
    answer:
      "A deposit locks your date on the calendar. It's applied toward the final invoice, not an add-on cost.",
  },
  {
    question: "How far in advance do I need to book?",
    answer:
      "A few days is usually enough, and last-minute requests are welcome when the calendar allows. Booking earlier just guarantees the date.",
  },
  {
    question: "What if I need to reschedule?",
    answer:
      "Just send a message. Weather and schedule changes happen, one reschedule is free with a heads up.",
  },
];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
      <span className="absolute h-[1.5px] w-4 bg-current" />
      <span
        className={`absolute h-4 w-[1.5px] bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "scale-y-0" : "scale-y-100"
        }`}
      />
    </span>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <span className="font-montserrat text-[12px] leading-[18px] font-semibold tracking-[0.15em] text-[rgb(107,107,102)] uppercase">
          Questions
        </span>
        <h2 className="mt-4 font-montserrat text-[40px] leading-[42px] font-semibold text-[rgb(244,244,242)] sm:text-[54px] sm:leading-[55px]">
          Straight answers.
        </h2>
      </div>

      <div className="mx-auto mt-16 max-w-3xl px-6">
        <div className="border-t border-white/10">
          {QUESTIONS.map((qa, index) => {
            const open = index === openIndex;
            const panelId = `faq-panel-${index}`;

            return (
              <div key={qa.question} className="border-b border-white/10">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-none"
                >
                  <span className="font-montserrat text-base leading-normal font-medium text-[rgb(244,244,242)]">
                    {qa.question}
                  </span>
                  <span
                    className={`transition-colors duration-300 ${
                      open ? "text-white/90" : "text-white/40 group-hover:text-white/70"
                    }`}
                  >
                    <PlusIcon open={open} />
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
                    <p className="max-w-xl pb-6 font-montserrat text-[15px] leading-[24px] font-normal text-[rgb(155,155,150)]">
                      {qa.answer}
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
