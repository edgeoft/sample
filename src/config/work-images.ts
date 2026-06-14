import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";

/** Shared work photos — used in hero slider and portfolio gallery. */
export const workPhotos = [
  {
    image: work1,
    alt: "Bird mesh netting installed under solar panels in Gregory Hills",
    objectPosition: "center",
    title: "Solar Panel Bird Netting",
    service: "Bird Mesh Netting",
    location: "Gregory Hills, NSW",
    description: "Heavy-duty mesh installed under solar arrays.",
  },
  {
    image: work2,
    alt: "Residential pest treatment at a home in Leppington",
    objectPosition: "center",
    title: "Residential Pest Treatment",
    service: "General Pest Control",
    location: "Leppington, NSW",
    description: "Full interior and exterior cockroach and spider treatment.",
  },
  {
    image: work3,
    alt: "Possum removal and roof void inspection in Oran Park",
    objectPosition: "center",
    title: "Roof Void Possum Removal",
    service: "Possum Removal",
    location: "Oran Park, NSW",
    description: "Humane relocation with entry points sealed.",
  },
  {
    image: work4,
    alt: "Termite barrier treatment at a property in Edmondson Park",
    objectPosition: "center",
    title: "Termite Barrier Install",
    service: "Termite Inspection",
    location: "Edmondson Park, NSW",
    description: "Perimeter chemical barrier treatment.",
  },
  {
    image: work5,
    alt: "Commercial rodent control program in Liverpool",
    objectPosition: "center",
    title: "Commercial Rodent Program",
    service: "Rodent Control",
    location: "Liverpool, NSW",
    description: "Warehouse baiting and exclusion program.",
  },
  {
    image: work6,
    alt: "Cockroach gel treatment in a kitchen in Austral",
    objectPosition: "center",
    title: "Cockroach Gel Treatment",
    service: "Cockroach Treatment",
    location: "Austral, NSW",
    description: "Targeted kitchen and wet-area gel baiting.",
  },
] as const;
