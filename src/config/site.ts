import {
  Bug,
  Bird,
  Rat,
  Leaf,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/** Edit this file to customize the entire site — business info, services, copy, and SEO. */

export const siteConfig = {
  name: "Sydney Best Pest Solutions",
  brand: {
    line1: "Sydney Best",
    line2: "Pest Solutions",
  },
  location: "Leppington, NSW 2179",
  phone: "+61 424 228 000",
  phoneTel: "+61424228000",
  phoneDisplay: "0424 228 000",
  email: "info@sydneybestpest.com.au",
  hours: "Mon – Sun · 07:00 – 20:00",
  hoursShort: "Open 7 Days · 07:00 – 20:00",
  serviceAreas:
    "Leppington, Gregory Hills, Oran Park, Edmondson Park, Austral, Liverpool, Campbelltown & all of South West Sydney.",
  social: {
    instagram: "https://www.instagram.com/sydneybestpest",
    facebook: "https://www.facebook.com/sydneybestpest",
    tiktok: "https://www.tiktok.com/@sydneybestpest",
  },
  yearsExperience: "15+ Years",
  baseUrl: "", // Set to your production URL for sitemap, e.g. "https://yoursite.com.au"
  seo: {
    title: "Sydney Best Pest Solutions | Pest Control Leppington NSW",
    description:
      "Professional pest control in Leppington & Sydney. Bird mesh netting, possum removal, termite & rodent treatment. Licensed technicians, 7 days a week. Free quote.",
    ogDescription:
      "Licensed pest technicians serving Leppington & Greater Sydney. Bird netting, possum removal, termite & rodent control. Book your free inspection.",
  },
  colors: {
    navy: "#0F172A",
    amber: "#F59E0B",
    red: "#A62121",
  },
} as const;

export type Service = {
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
};

export const services: Service[] = [
  {
    icon: Bug,
    title: "General Pest Control",
    value: "General Pest Control",
    description:
      "Complete eradication of cockroaches, spiders, ants, and rodents using family-safe, eco-friendly solutions.",
  },
  {
    icon: Bird,
    title: "Bird Mesh Netting",
    value: "Bird Mesh Netting",
    description:
      "Professional installation of heavy-duty bird mesh to prevent nesting under solar panels and roofing structures.",
  },
  {
    icon: Leaf,
    title: "Possum Removal",
    value: "Possum Removal",
    description:
      "Humane trapping and relocation by licensed technicians. We seal entry points so they don't return.",
  },
  {
    icon: ShieldCheck,
    title: "Termite Inspection",
    value: "Termite Inspection",
    description:
      "Thorough termite inspections and barrier treatments to protect your property's structural integrity.",
  },
  {
    icon: Rat,
    title: "Rodent Control",
    value: "Rodent Control",
    description:
      "Strategic baiting and exclusion to eliminate rats and mice from your home or business permanently.",
  },
  {
    icon: Bug,
    title: "Cockroach Treatment",
    value: "Cockroach Treatment",
    description:
      "Targeted gel and barrier treatments that break the cockroach lifecycle, indoors and out.",
  },
];

export const extraServiceOptions = ["Commercial Solutions", "Other"] as const;

export const trustItems = [
  "Fully Licensed NSW",
  "Fully Insured",
  "Same-Day Service",
  "Family & Pet Safe",
  "Open 7 Days",
] as const;

export const whyUsPoints = [
  {
    title: "Local Leppington Team",
    desc: "Based in Leppington, we know South West Sydney's pest seasons inside out.",
  },
  {
    title: "Licensed & Insured",
    desc: "Fully accredited technicians, public liability insurance, work guaranteed.",
  },
  {
    title: "Transparent Pricing",
    desc: "Upfront quotes with no hidden fees. You approve before we begin.",
  },
  {
    title: "Humane & Eco-Friendly",
    desc: "Possums relocated humanely. Treatments safe for kids, pets and pollinators.",
  },
] as const;

export const testimonials = [
  {
    name: "Sarah M.",
    suburb: "Leppington",
    text: "Booked online in the morning and they were here the same day. Sorted our cockroach problem and explained everything. Highly recommend.",
  },
  {
    name: "David R.",
    suburb: "Oran Park",
    text: "The bird netting under our solar panels has been a game-changer. Clean install, fair price, no more droppings or noise.",
  },
  {
    name: "Priya K.",
    suburb: "Gregory Hills",
    text: "Had a possum in the roof — they removed it humanely and sealed all the entry points. Six months on, no more night-time scratching.",
  },
  {
    name: "Michael B.",
    suburb: "Edmondson Park",
    text: "Termite inspection was thorough and the report was easy to understand. They treated the problem quickly and followed up a week later.",
  },
  {
    name: "Lisa W.",
    suburb: "Austral",
    text: "We had a bad ant problem in the kitchen. One treatment and they were gone within days. Very professional team from start to finish.",
  },
  {
    name: "Tom H.",
    suburb: "Liverpool",
    text: "Used them for our café's rodent issue. Discreet service after hours, no disruption to business, and the problem hasn't come back.",
  },
  {
    name: "Emma C.",
    suburb: "Campbelltown",
    text: "Spider treatment before summer — haven't seen a single redback since. Fair price and they explained every step to us.",
  },
  {
    name: "James L.",
    suburb: "Hoxton Park",
    text: "Called for an emergency wasp nest removal. They came out within two hours and made the area safe for our kids. Couldn't ask for more.",
  },
] as const;

export const faqs = [
  {
    q: "Are your treatments safe for kids and pets?",
    a: "Yes. We use family-safe, low-toxicity products and follow strict Australian standards. We'll advise on any short re-entry times before we start.",
  },
  {
    q: "Do you service my area?",
    a: "We cover Leppington, Gregory Hills, Oran Park, Edmondson Park, Austral, Liverpool, Campbelltown and the wider South West & Greater Sydney area.",
  },
  {
    q: "How quickly can you come out?",
    a: "Most bookings are attended same-day or next-day. We're open 7 days a week, 7am – 8pm, with emergency call-outs available.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Yes — most general pest treatments come with a service warranty. Specific terms are confirmed at the time of booking.",
  },
] as const;

export const bookingStatuses = [
  "new",
  "contacted",
  "scheduled",
  "completed",
  "cancelled",
] as const;
