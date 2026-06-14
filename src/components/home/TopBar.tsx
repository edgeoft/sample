import { siteConfig } from "@/config/site";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function TopBar() {
  const { location, phone, phoneTel, email, hoursShort } = siteConfig;

  return (
    <div className="bg-brand-navy text-white py-2.5 px-6 hidden md:flex justify-between items-center text-xs font-medium">
      <div className="max-w-7xl mx-auto w-full flex justify-between">
        <div className="flex gap-6">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-brand-red" /> {location.split(",")[0]}
          </span>
          <a href={`tel:${phoneTel}`} className="flex items-center gap-1.5 hover:text-brand-red transition-colors">
            <Phone className="size-3.5 text-brand-red" /> {phone}
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-brand-red transition-colors">
            <Mail className="size-3.5 text-brand-red" /> {email}
          </a>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="size-3.5 text-brand-red" /> {hoursShort}
        </div>
      </div>
    </div>
  );
}
