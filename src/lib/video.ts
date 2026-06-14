export type VideoSource =
  | { type: "youtube" | "vimeo"; embedUrl: string }
  | { type: "file"; src: string };

/** Converts YouTube/Vimeo watch links or local paths into a playable source. */
export function parseVideoUrl(url: string): VideoSource | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const youtubeMatch = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  if (youtubeMatch) {
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&rel=0`,
    };
  }

  const vimeoMatch = trimmed.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
  if (vimeoMatch) {
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
    };
  }

  if (trimmed.includes("youtube.com/embed")) {
    const embedUrl = trimmed.includes("autoplay")
      ? trimmed
      : `${trimmed}${trimmed.includes("?") ? "&" : "?"}autoplay=1&rel=0`;
    return { type: "youtube", embedUrl };
  }

  if (trimmed.includes("player.vimeo.com/video")) {
    const embedUrl = trimmed.includes("autoplay")
      ? trimmed
      : `${trimmed}${trimmed.includes("?") ? "&" : "?"}autoplay=1`;
    return { type: "vimeo", embedUrl };
  }

  if (
    trimmed.startsWith("/") ||
    /\.(mp4|webm|ogg)(\?|$)/i.test(trimmed)
  ) {
    return { type: "file", src: trimmed };
  }

  return null;
}
