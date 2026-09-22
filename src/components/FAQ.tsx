"use client";

import { useState } from "react";

type QA = {
  question: string;
  answer: string;
};

const QUESTIONS: QA[] = [
  {
    question: "What do you need from me to get started?",
    answer:
      "Just your raw footage and a quick brief on the vibe or platform you're posting to. Send it over and we get started the same day.",
  },
  {
    question: "What do you edit?",
    answer:
      "Content for social: reels, TikToks, YouTube, brand day-in-the-life, events, product videos. If it needs cutting, color, and sound, it's in scope.",
  },
  {
    question: "Do I need to be local to work with you?",
    answer:
      "No, everything is done remotely. Send your footage from anywhere and get it back the same day.",
  },
  {
    question: "How fast do I get my edited video?",
    answer:
      "Same-day turnaround as standard. Send your footage and get the edit back before the day is done.",
  },
  {
    question: "Can I ask for revisions?",
    answer: "Yes, revisions are part of the process. Flag what you want changed and it's handled quickly.",
  },
  {
    question: "What file formats do you accept?",
    answer:
      "Send footage in whatever format you shot it in, phone, camera, drone. We handle the conversion and edit from there.",
  },
  {
    question: "How far in advance do I need to send my footage?",
    answer:
      "No advance notice needed. Send it whenever it's ready and we start the same day.",
  },
  {
    question: "What if I need to send more footage midway?",
    answer:
      "Just send it over. We'll fold it into the edit as long as it arrives before the final cut is locked.",
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
