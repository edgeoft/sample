import { siteConfig } from "@/config/site";
import { Phone } from "lucide-react";

export function MobileCallButton() {
  const { phoneTel, phoneDisplay } = siteConfig;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:hidden z-50">
      <a
        href={`tel:${phoneTel}`}
        className="w-full bg-brand-amber text-brand-navy flex items-center justify-center gap-2 py-4 rounded-sm font-extrabold shadow-2xl uppercase tracking-widest text-sm"
      >
        <Phone className="size-4" /> Call {phoneDisplay}
      </a>
    </div>
  );
}
