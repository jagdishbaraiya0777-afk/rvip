"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = index === openIndex;

        return (
          <article
            key={item.question}
            className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-white">{item.question}</span>
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full border border-amber-300/40 text-amber-300 transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {isOpen ? (
              <div className="px-5 pb-5 text-sm leading-7 text-slate-200">{item.answer}</div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
