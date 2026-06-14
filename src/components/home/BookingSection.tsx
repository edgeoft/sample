import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { extraServiceOptions, services, siteConfig } from "@/config/site";
import { CheckCircle2 } from "lucide-react";

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-[10px] uppercase font-bold tracking-wider text-brand-slate">{label}</span>
      {children}
    </label>
  );
}

function BookingForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service_type: services[0].value,
    preferred_date: "",
    notes: "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = form.name.trim();
    const phone = form.phone.trim();
    if (name.length < 1 || name.length > 120) return toast.error("Please enter your name.");
    if (phone.length < 5 || phone.length > 32) return toast.error("Please enter a valid phone number.");
    if (form.email && form.email.length > 254) return toast.error("Email is too long.");
    if (form.notes && form.notes.length > 1000) return toast.error("Notes are too long.");

    setSubmitting(true);
    const { error } = await supabase.from("bookings").insert({
      name,
      phone,
      email: form.email.trim() || null,
      address: form.address.trim() || null,
      service_type: form.service_type,
      preferred_date: form.preferred_date || null,
      notes: form.notes.trim() || null,
      status: "new",
    });
    setSubmitting(false);
    if (error) {
      console.error(error);
      toast.error(`Couldn't submit your request. Please call us on ${siteConfig.phoneDisplay}.`);
      return;
    }
    setSubmitted(true);
    toast.success("Booking received! We'll be in touch shortly.");
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle2 className="size-14 text-brand-red mx-auto mb-4" />
        <h3 className="text-xl font-extrabold uppercase tracking-tight mb-2">Request Received</h3>
        <p className="text-brand-slate max-w-md mx-auto">
          Thanks {form.name.split(" ")[0]}! A technician will call you on {form.phone} within 2 working hours. For urgent jobs, call{" "}
          <a href={`tel:${siteConfig.phoneTel}`} className="text-brand-red font-bold underline hover:text-brand-navy transition-colors">{siteConfig.phoneDisplay}</a>.
        </p>
      </div>
    );
  }

  const inputClass = "border-b-2 border-slate-200 py-2 bg-transparent focus:border-brand-amber outline-none transition-colors";

  return (
    <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-6">
      <Field label="Your Name *">
        <input required maxLength={120} type="text" value={form.name} onChange={update("name")} placeholder="John Doe" className={inputClass} />
      </Field>
      <Field label="Phone Number *">
        <input required maxLength={32} type="tel" value={form.phone} onChange={update("phone")} placeholder="+61 4XX XXX XXX" className={inputClass} />
      </Field>
      <Field label="Email">
        <input maxLength={254} type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" className={inputClass} />
      </Field>
      <Field label="Preferred Date">
        <input type="date" value={form.preferred_date} onChange={update("preferred_date")} className={inputClass} />
      </Field>
      <Field label="Property Address" className="md:col-span-2">
        <input maxLength={300} type="text" value={form.address} onChange={update("address")} placeholder="Street, suburb" className={inputClass} />
      </Field>
      <Field label="Service Required *" className="md:col-span-2">
        <select required value={form.service_type} onChange={update("service_type")} className={inputClass}>
          {services.map((s) => (
            <option key={s.value} value={s.value}>{s.value}</option>
          ))}
          {extraServiceOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </Field>
      <Field label="Notes (Optional)" className="md:col-span-2">
        <textarea maxLength={1000} rows={3} value={form.notes} onChange={update("notes")} placeholder="Tell us about the problem..." className={`${inputClass} resize-none`} />
      </Field>
      <button
        type="submit"
        disabled={submitting}
        className="md:col-span-2 bg-brand-amber text-brand-navy font-extrabold py-5 rounded-sm uppercase tracking-[0.2em] mt-2 hover:bg-brand-amber-bright disabled:opacity-60 disabled:cursor-wait transition-colors"
      >
        {submitting ? "Submitting..." : "Submit Request"}
      </button>
      <p className="md:col-span-2 text-xs text-brand-slate -mt-2">
        By submitting you agree to be contacted about your enquiry. We never share your details.
      </p>
    </form>
  );
}

export function BookingSection() {
  return (
    <section id="book" className="bg-brand-navy py-20 md:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 md:p-12 shadow-2xl relative">
          <div className="absolute top-0 right-0 p-8 hidden md:block pointer-events-none">
            <div className="text-5xl lg:text-6xl font-black text-slate-50 select-none uppercase tracking-tighter">
              QUOTE
            </div>
          </div>
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 uppercase tracking-tight">
              Request a Free Inspection
            </h2>
            <p className="text-brand-slate mb-8">
              Get a response within 2 working hours. No obligation.
            </p>
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
