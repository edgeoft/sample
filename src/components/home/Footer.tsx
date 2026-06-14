import { siteConfig } from "@/config/site";
import logoImg from "@/assets/logo.png";
import { Mail, MapPin, Phone, ArrowRight, Instagram, Facebook } from "lucide-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const socialLinks = [
  { key: "instagram" as const, label: "Instagram", Icon: Instagram },
  { key: "facebook" as const, label: "Facebook", Icon: Facebook },
  { key: "tiktok" as const, label: "TikTok", Icon: TikTokIcon },
] as const;

const quickLinks = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why Us" },
  { href: "#past-work", label: "Past Work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#book", label: "Book Online" },
] as const;

export function Footer() {
  const { brand, name, location, phone, phoneTel, phoneDisplay, email, serviceAreas, hoursShort, social } =
    siteConfig;

  return (
    <footer className="relative bg-brand-navy text-white overflow-hidden">
      {/* Accent top edge */}
      <div className="h-1 bg-gradient-to-r from-brand-red via-brand-amber to-brand-red" aria-hidden />

      {/* CTA strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-brand-amber text-xs font-bold uppercase tracking-widest mb-2">Need help today?</p>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-balance">
              Free inspection · Same-day service available
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={`tel:${phoneTel}`}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 px-6 py-3.5 rounded-sm font-bold text-sm transition-colors"
            >
              <Phone className="size-4 text-brand-red" aria-hidden />
              {phoneDisplay}
            </a>
            <a
              href="#book"
              className="inline-flex items-center justify-center gap-2 bg-brand-amber text-brand-navy px-6 py-3.5 rounded-sm font-bold text-sm uppercase tracking-wider hover:bg-brand-amber-bright transition-colors shadow-lg shadow-brand-amber/20"
            >
              Book Inspection <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <a href="#" className="inline-flex items-center gap-3 mb-6 group">
              <img
                src={logoImg}
                alt={`${name} logo`}
                className="h-12 w-12 object-contain shrink-0"
              />
              <div className="flex flex-col leading-none">
                <span className="text-xl font-extrabold tracking-tighter uppercase group-hover:text-white/90 transition-colors">
                  {brand.line1}
                </span>
                <span className="text-brand-red font-bold tracking-[0.18em] text-[10px] uppercase mt-1">
                  {brand.line2}
                </span>
              </div>
            </a>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Trusted local experts providing comprehensive pest management across Leppington and Greater Sydney.
            </p>
            <h4 className="text-brand-amber text-xs font-extrabold uppercase tracking-widest mt-6 mb-4">Follow Us</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ key, label, Icon }) => (
                <a
                  key={key}
                  href={social[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${label}`}
                  className="flex size-10 items-center justify-center rounded-sm bg-white/5 border border-white/10 text-white/75 hover:text-brand-red hover:border-brand-red/40 transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="text-brand-amber text-xs font-extrabold uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-white/75 hover:text-brand-red transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="size-1 rounded-full bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-brand-amber text-xs font-extrabold uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/75">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-white/5 border border-white/10">
                  <MapPin className="size-4 text-brand-red" aria-hidden />
                </span>
                <span className="pt-1.5 leading-relaxed">{location}</span>
              </li>
              <li>
                <a
                  href={`tel:${phoneTel}`}
                  className="flex items-center gap-3 text-sm group"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-white/5 border border-white/10 group-hover:border-brand-red/40 transition-colors">
                    <Phone className="size-4 text-brand-red" aria-hidden />
                  </span>
                  <span className="font-bold text-white group-hover:text-brand-red transition-colors">{phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-sm group"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-white/5 border border-white/10 group-hover:border-brand-red/40 transition-colors">
                    <Mail className="size-4 text-brand-red" aria-hidden />
                  </span>
                  <span className="text-white/75 group-hover:text-brand-red transition-colors break-all">{email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & areas */}
          <div className="lg:col-span-3">
            <h4 className="text-brand-amber text-xs font-extrabold uppercase tracking-widest mb-5">Opening Hours</h4>
            <div className="rounded-sm bg-white/5 border border-white/10 p-4 mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/60">Mon – Sun</span>
                <span className="font-bold">07:00 – 20:00</span>
              </div>
              <p className="text-[11px] text-white/50 mt-2">{hoursShort}</p>
            </div>
            <h4 className="text-brand-amber text-xs font-extrabold uppercase tracking-widest mb-3">Service Areas</h4>
            <p className="text-sm text-white/70 leading-relaxed">{serviceAreas}</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] text-white/50 uppercase tracking-widest">
          <span>© {new Date().getFullYear()} {name}. All rights reserved.</span>
          <span className="flex flex-wrap gap-x-6 gap-y-2 items-center normal-case tracking-normal text-sm text-white/60">
            <span className="uppercase tracking-widest text-[11px]">Licensed & Insured</span>
            <a href="/auth" className="text-white/50 hover:text-brand-red transition-colors uppercase tracking-widest text-[11px]">
              Staff Login
            </a>
          </span>
        </div>
      </div>

      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-brand-red/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-20 -left-20 size-64 rounded-full bg-brand-amber/5 blur-3xl"
        aria-hidden
      />
    </footer>
  );
}
