import { whyUsPoints } from "@/config/site";
import { CheckCircle2 } from "lucide-react";

export function WhyUs() {
  return (
    <section id="why" className="bg-slate-50 py-20 md:py-24 px-6 border-y border-slate-100">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="inline-block px-3 py-1 bg-brand-amber/10 border border-brand-amber/30 text-brand-amber text-xs font-bold uppercase tracking-widest mb-6 rounded-full">
            Why Us
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight mb-6 text-balance">
            Trusted by Sydney Families Since Day One.
          </h2>
          <p className="text-brand-slate text-pretty">
            We don't just spray and leave. Every job includes a full property inspection, a clear plan, and follow-up advice to keep pests away for good.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {whyUsPoints.map((p) => (
            <div key={p.title} className="bg-white p-6 border border-slate-100 rounded-sm">
              <CheckCircle2 className="size-6 text-brand-red mb-3" />
              <h4 className="font-extrabold uppercase tracking-tight text-sm mb-2">{p.title}</h4>
              <p className="text-brand-slate text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
