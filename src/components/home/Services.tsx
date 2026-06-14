import { services } from "@/config/site";
import { ArrowRight } from "lucide-react";

export function Services() {
  return (
    <section id="services" className="py-20 md:py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-14 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight mb-4">
          Specialized Solutions
        </h2>
        <div className="h-1 w-20 bg-brand-amber mx-auto" />
        <p className="mt-6 text-brand-slate max-w-xl mx-auto text-pretty">
          End-to-end pest management by certified local technicians. One call, one team, one trusted result.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {services.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group border border-slate-200 p-8 hover:border-brand-amber hover:shadow-lg transition-all bg-white"
          >
            <div className="size-12 bg-slate-100 mb-6 flex items-center justify-center group-hover:bg-brand-amber/10 transition-colors">
              <Icon className="size-6 text-brand-red" strokeWidth={1.75} />
            </div>
            <h3 className="text-xl font-extrabold mb-3 uppercase tracking-tight">{title}</h3>
            <p className="text-brand-slate text-sm leading-relaxed mb-6">{description}</p>
            <a
              href="#book"
              className="text-brand-red text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 hover:gap-3 hover:text-brand-navy transition-all"
            >
              Book This Service <ArrowRight className="size-3.5" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
