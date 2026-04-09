"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Slide = {
  src: string;
  alt: string;
};

type ScreenshotsCarouselProps = {
  slides: Slide[];
  autoPlayMs?: number;
};

export function ScreenshotsCarousel({ slides, autoPlayMs = 3200 }: ScreenshotsCarouselProps) {
  const normalizedSlides = useMemo(() => slides.filter((slide) => Boolean(slide.src)), [slides]);
  const loopSlides = useMemo(() => {
    if (normalizedSlides.length <= 1) return normalizedSlides;
    return [
      normalizedSlides[normalizedSlides.length - 1],
      ...normalizedSlides,
      normalizedSlides[0],
    ];
  }, [normalizedSlides]);

  const [index, setIndex] = useState(normalizedSlides.length > 1 ? 1 : 0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  useEffect(() => {
    if (normalizedSlides.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((current) => current + 1);
    }, autoPlayMs);

    return () => clearInterval(timer);
  }, [autoPlayMs, normalizedSlides.length]);

  function goToNext() {
    if (normalizedSlides.length <= 1) return;
    setIndex((current) => current + 1);
  }

  function goToPrev() {
    if (normalizedSlides.length <= 1) return;
    setIndex((current) => current - 1);
  }

  function handleTransitionEnd() {
    if (normalizedSlides.length <= 1) return;

    if (index === normalizedSlides.length + 1) {
      setTransitionEnabled(false);
      setIndex(1);
      requestAnimationFrame(() => setTransitionEnabled(true));
    } else if (index === 0) {
      setTransitionEnabled(false);
      setIndex(normalizedSlides.length);
      requestAnimationFrame(() => setTransitionEnabled(true));
    }
  }

  if (normalizedSlides.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0f1423]/70 p-2">
      <div
        className={`flex ${transitionEnabled ? "transition-transform duration-700 ease-out" : ""}`}
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {loopSlides.map((slide, slideIndex) => (
          <div key={`${slide.src}-${slideIndex}`} className="min-w-full">
            <div className="soft-card overflow-hidden rounded-2xl p-2">
              <Image
                src={slide.src}
                alt={slide.alt}
                width={1300}
                height={820}
                className="h-auto w-full rounded-xl object-cover"
                priority={slideIndex === 1}
              />
            </div>
          </div>
        ))}
      </div>

      {normalizedSlides.length > 1 ? (
        <>
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous screenshot"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-black/45 px-3 py-2 text-white backdrop-blur hover:border-amber-300/60"
          >
            ←
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next screenshot"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-black/45 px-3 py-2 text-white backdrop-blur hover:border-amber-300/60"
          >
            →
          </button>
        </>
      ) : null}
    </div>
  );
}
