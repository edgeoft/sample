import { workPhotos } from "@/config/work-images";

export type HeroSlide = {
  /** Import from src/assets/ or use a path in public/ */
  image: string;
  alt: string;
  objectPosition?: string;
};

/** Hero slider — cycles through work photos from src/assets/work-*.jpg */
export const heroSlides: HeroSlide[] = workPhotos.map(({ image, alt, objectPosition }) => ({
  image,
  alt,
  objectPosition,
}));
