import { faqs } from "@/config/site";

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight mb-4">
          Frequently Asked
        </h2>
        <div className="h-1 w-20 bg-brand-amber mx-auto" />
      </div>
      <div className="divide-y divide-slate-100 border-y border-slate-100">
        {faqs.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="flex justify-between items-center cursor-pointer list-none">
              <h3 className="font-bold text-brand-navy pr-6">{f.q}</h3>
              <span className="text-brand-red text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-brand-slate text-sm mt-3 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
