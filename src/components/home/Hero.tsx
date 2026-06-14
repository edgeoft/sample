import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { heroSlides } from "@/config/hero-slides";
import { ArrowRight } from "lucide-react";

function HeroImageSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroSlides.length;

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => clearInterval(id);
  }, [paused, count]);

  if (count === 0) return null;

  return (
    <div
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden outline outline-1 -outline-offset-1 outline-black/5 shadow-2xl bg-brand-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured work gallery"
    >
      {heroSlides.map((slide, i) => (
        <div
          key={`${slide.alt}-${i}`}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="h-full w-full min-h-full min-w-full max-w-none object-cover object-center"
            style={{ objectPosition: slide.objectPosition ?? "center" }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Subtle bottom gradient for dots */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-brand-navy/60 to-transparent pointer-events-none" />

      {count > 1 && (
        <div
          className="absolute bottom-4 left-0 right-0 flex justify-center gap-2"
          role="tablist"
          aria-label="Hero slide indicators"
        >
          {heroSlides.map((slide, i) => (
            <button
              key={`dot-${i}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show slide ${i + 1}: ${slide.alt}`}
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all ${
                i === index
                  ? "w-6 h-2 bg-brand-amber"
                  : "size-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Hero() {
  const { yearsExperience } = siteConfig;

  return (
    <section className="relative bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-20 px-6">
        <div className="z-10">
          <div className="inline-block px-3 py-1 bg-brand-amber/10 border border-brand-amber/30 text-brand-amber text-xs font-bold uppercase tracking-widest mb-6 rounded-full">
            Professional Pest Technicians
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-6 tracking-tight text-balance">
            Protect Your Home <br />
            <span className="text-brand-slate">From The Inside Out.</span>
          </h1>
          <p className="text-base md:text-lg text-brand-slate mb-8 max-w-lg text-pretty">
            Specialized pest eradication for Leppington homes and businesses. From residential
            infestations to professional bird mesh netting and humane possum removal.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#book"
              className="bg-brand-navy text-white px-6 md:px-8 py-4 font-bold rounded-sm text-sm uppercase tracking-widest hover:bg-brand-navy-soft transition-colors inline-flex items-center gap-2"
            >
              Get Instant Quote <ArrowRight className="size-4" />
            </a>
            <a
              href="#services"
              className="border-2 border-brand-navy text-brand-navy px-6 md:px-8 py-4 font-bold rounded-sm text-sm uppercase tracking-widest hover:bg-brand-navy hover:text-white transition-all"
            >
              Our Services
            </a>
          </div>
        </div>

        <div className="relative">
          <HeroImageSlider />
          <div className="absolute -bottom-6 -left-6 bg-white p-5 md:p-6 shadow-xl border border-slate-100 rounded-lg max-w-[240px] z-10">
            <div className="text-2xl md:text-3xl font-extrabold text-brand-navy mb-1">{yearsExperience}</div>
            <div className="text-[10px] md:text-xs text-brand-slate uppercase font-bold tracking-wider">
              Experience in Local Pest Control
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
