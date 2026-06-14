import { workPhotos } from "@/config/work-images";

export type PortfolioImage = {
  title: string;
  service: string;
  location: string;
  description: string;
  image: string;
  imagePosition?: string;
};

/** Vertical Reels / TikTok-style clips — use MP4 in public/videos/ (9:16 works best). */
export type PortfolioVideo = {
  title: string;
  service: string;
  location: string;
  /** Thumbnail shown before play (portrait image recommended) */
  thumbnail: string;
  /**
   * Video source:
   * - Local MP4/WebM: /videos/your-reel.mp4  (best for TikTok / Insta Reels exports)
   * - YouTube Shorts: https://youtube.com/shorts/VIDEO_ID
   * - YouTube: https://www.youtube.com/watch?v=VIDEO_ID
   */
  videoUrl: string;
};

/** Job photos from src/assets/work-*.jpg */
export const portfolioImages: PortfolioImage[] = workPhotos.map(
  ({ title, service, location, description, image, objectPosition }) => ({
    title,
    service,
    location,
    description,
    image,
    imagePosition: objectPosition,
  }),
);

/** Reels / short-form videos — add MP4 files to public/videos/ */
export const portfolioVideos: PortfolioVideo[] = [
  {
    title: "Bird Netting Under Solar",
    service: "Bird Mesh Netting",
    location: "Gregory Hills, NSW",
    thumbnail: workPhotos[0]!.image,
    videoUrl: "/videos/bird-netting-reel.mp4",
  },
  {
    title: "Before & After Pest Spray",
    service: "General Pest Control",
    location: "Leppington, NSW",
    thumbnail: workPhotos[1]!.image,
    videoUrl: "/videos/pest-treatment-reel.mp4",
  },
  {
    title: "Possum Removal Walkthrough",
    service: "Possum Removal",
    location: "Oran Park, NSW",
    thumbnail: workPhotos[2]!.image,
    videoUrl: "/videos/possum-removal-reel.mp4",
  },
  {
    title: "Termite Inspection Clip",
    service: "Termite Inspection",
    location: "Campbelltown, NSW",
    thumbnail: workPhotos[3]!.image,
    videoUrl: "/videos/termite-reel.mp4",
  },
  {
    title: "Rodent Control Commercial",
    service: "Rodent Control",
    location: "Liverpool, NSW",
    thumbnail: workPhotos[4]!.image,
    videoUrl: "/videos/rodent-reel.mp4",
  },
];

/** @deprecated Use portfolioImages / portfolioVideos */
export type PastWork = PortfolioImage & { videoUrl?: string; featured?: boolean };
export const pastWorks = portfolioImages;
