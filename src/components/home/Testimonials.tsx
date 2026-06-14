import { useCallback, useEffect, useState } from "react";
import { testimonials } from "@/config/site";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

function useSlidesPerView() {
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const md = window.matchMedia("(min-width: 768px)");

    const update = () => {
      if (lg.matches) setSlidesPerView(3);
      else if (md.matches) setSlidesPerView(2);
      else setSlidesPerView(1);
    };

    update();
    lg.addEventListener("change", update);
    md.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      md.removeEventListener("change", update);
    };
  }, []);

  return slidesPerView;
}

function TestimonialCard({ name, suburb, text }: (typeof testimonials)[number]) {
  return (
    <blockquote className="bg-white border border-slate-200 p-6 md:p-8 h-full flex flex-col shadow-sm">
      <div className="flex gap-0.5 mb-4" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-4 fill-brand-red text-brand-red" aria-hidden />
        ))}
      </div>
      <p className="text-brand-slate text-sm leading-relaxed flex-1 italic">&ldquo;{text}&rdquo;</p>
      <footer className="mt-6 pt-4 border-t border-slate-100">
        <cite className="not-italic font-bold text-sm text-brand-navy">{name}</cite>
        <div className="text-xs text-brand-slate uppercase tracking-wider mt-1">{suburb}</div>
      </footer>
    </blockquote>
  );
}

export function Testimonials() {
  const count = testimonials.length;
  const slidesPerView = useSlidesPerView();
  const maxIndex = Math.max(0, count - slidesPerView);
  const canSlide = maxIndex > 0;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (next: number) => setIndex(Math.min(Math.max(0, next), maxIndex)),
    [maxIndex],
  );

  const prev = useCallback(() => goTo(index <= 0 ? maxIndex : index - 1), [goTo, index, maxIndex]);
  const next = useCallback(() => goTo(index >= maxIndex ? 0 : index + 1), [goTo, index, maxIndex]);

  useEffect(() => {
    if (paused || !canSlide) return;
    const id = setInterval(() => next(), 6000);
    return () => clearInterval(id);
  }, [paused, canSlide, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <section id="reviews" className="py-20 md:py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight mb-4 text-brand-navy">
          What Locals Say
        </h2>
        <div className="h-1 w-20 bg-brand-amber mx-auto" />
      </div>

      <div
        className="relative px-2 md:px-12"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="overflow-hidden" aria-live="polite" aria-atomic="true">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              width: `${(count / slidesPerView) * 100}%`,
              transform: `translateX(-${(index / count) * 100}%)`,
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={`${t.name}-${t.suburb}-${i}`}
                className="px-2 md:px-3 box-border"
                style={{ width: `${100 / count}%` }}
              >
                <TestimonialCard {...t} />
              </div>
            ))}
          </div>
        </div>

        {count > slidesPerView && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-navy shadow-md hover:border-brand-red hover:text-brand-red transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-navy shadow-md hover:border-brand-red hover:text-brand-red transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>

            <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Testimonial slides">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-brand-red" : "w-2 bg-slate-300 hover:bg-brand-red/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
