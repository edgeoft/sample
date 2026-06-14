import { trustItems } from "@/config/site";
import { CheckCircle2 } from "lucide-react";

export function TrustBar() {
  return (
    <div className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap justify-center md:justify-between items-center gap-x-8 gap-y-3">
        {trustItems.map((item) => (
          <div key={item} className="flex items-center gap-2 text-brand-slate text-xs md:text-sm font-semibold uppercase tracking-wider">
            <CheckCircle2 className="size-4 text-brand-red" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
