import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import logoImg from "@/assets/logo.png";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "#services", label: "Our Services" },
  { href: "#why", label: "Why Us" },
  { href: "#past-work", label: "Our Works" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
] as const;

export function Header() {
  const { brand, name, phoneTel, phoneDisplay } = siteConfig;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const close = () => setMenuOpen(false);
    lg.addEventListener("change", close);
    return () => lg.removeEventListener("change", close);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="py-4 px-6 border-b border-slate-100 bg-white/95 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <a href="#" className="flex items-center gap-3 leading-none shrink-0 min-w-0">
            <img
              src={logoImg}
              alt={`${name} logo`}
              className="h-10 w-10 md:h-12 md:w-12 object-contain shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tighter uppercase truncate">
                {brand.line1}
              </span>
              <span className="text-brand-red font-bold tracking-[0.18em] text-[10px] uppercase mt-0.5">
                {brand.line2}
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex gap-8 items-center" aria-label="Main navigation">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="font-medium text-brand-slate hover:text-brand-red transition-colors text-sm"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={`tel:${phoneTel}`}
              className="hidden sm:flex flex-col items-end leading-tight"
            >
              <span className="text-[10px] uppercase tracking-wider text-brand-slate">Call now</span>
              <span className="text-sm font-bold text-brand-navy">{phoneDisplay}</span>
            </a>
            <a
              href="#book"
              className="hidden lg:inline-flex bg-brand-amber text-brand-navy px-4 sm:px-6 py-2.5 sm:py-3 font-bold rounded-sm hover:brightness-110 transition-all uppercase text-[11px] sm:text-xs tracking-wider shadow-lg shadow-brand-amber/20"
            >
              Book Inspection
            </a>

            <button
              type="button"
              className="lg:hidden flex size-10 items-center justify-center rounded-sm border border-slate-200 text-brand-navy hover:border-brand-red hover:text-brand-red transition-colors"
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-brand-navy/50 backdrop-blur-[2px]"
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
        />

        <nav
          id="mobile-drawer"
          className={`absolute top-0 right-0 h-full w-[min(100vw,20rem)] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <img src={logoImg} alt="" className="h-9 w-9 object-contain" aria-hidden />
              <span className="text-sm font-extrabold uppercase tracking-tight text-brand-navy">Menu</span>
            </div>
            <button
              type="button"
              onClick={closeMenu}
              className="flex size-10 items-center justify-center rounded-sm text-brand-navy hover:bg-slate-100 hover:text-brand-red transition-colors"
              aria-label="Close menu"
              tabIndex={menuOpen ? 0 : -1}
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
                className="block py-3.5 font-semibold text-brand-navy hover:text-brand-red border-b border-slate-100 transition-colors text-sm uppercase tracking-wide"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="px-5 py-5 border-t border-slate-100 space-y-3 bg-slate-50">
            <a
              href={`tel:${phoneTel}`}
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
              className="flex items-center justify-center gap-2 py-3.5 border border-slate-200 bg-white rounded-sm font-bold text-sm text-brand-navy hover:border-brand-red hover:text-brand-red transition-colors"
            >
              <Phone className="size-4 text-brand-red" aria-hidden />
              Call {phoneDisplay}
            </a>
            <a
              href="#book"
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
              className="flex items-center justify-center bg-brand-amber text-brand-navy py-3.5 rounded-sm font-bold uppercase text-xs tracking-wider shadow-lg shadow-brand-amber/20 hover:brightness-110 transition-all"
            >
              Book Inspection
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
