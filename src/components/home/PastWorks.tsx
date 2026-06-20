import { useCallback, useEffect, useRef, useState } from "react";
import { portfolioImages, portfolioVideos, type PortfolioImage, type PortfolioVideo } from "@/config/past-works";
import { parseVideoUrl, type VideoSource } from "@/lib/video";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Pause, Play, Volume2, VolumeX } from "lucide-react";

type Tab = "images" | "videos";

function ImageCard({ work }: { work: PortfolioImage }) {
  return (
    <article className="group relative overflow-hidden rounded-sm bg-brand-navy shadow-md hover:shadow-xl transition-shadow aspect-square">
      <img
        src={work.image}
        alt={work.title}
        className="absolute inset-0 h-full w-full min-h-full min-w-full max-w-none object-cover object-center transition-transform duration-500 group-hover:scale-105"
        style={{ objectPosition: work.imagePosition ?? "center" }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent opacity-90" />
      <span className="absolute top-3 left-3 bg-brand-amber text-brand-navy text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-sm">
        {work.service}
      </span>
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <h3 className="font-extrabold uppercase tracking-tight text-white text-sm md:text-base mb-1.5 line-clamp-2">
          {work.title}
        </h3>
        <p className="flex items-center gap-1 text-white/70 text-[10px] font-semibold uppercase tracking-wider">
          <MapPin className="size-3 text-brand-red shrink-0" aria-hidden />
          {work.location}
        </p>
      </div>
    </article>
  );
}

function ReelPlayer({
  video,
  parsed,
  isActive,
  muted,
  onToggleMute,
}: {
  video: PortfolioVideo;
  parsed: VideoSource;
  isActive: boolean;
  muted: boolean;
  onToggleMute: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || parsed.type !== "file") return;
    if (isActive) {
      el.play().catch(() => undefined);
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [isActive, parsed.type]);

  if (parsed.type === "file") {
    return (
      <>
        <video
          ref={videoRef}
          src={parsed.src}
          poster={video.thumbnail}
          className="absolute inset-0 h-full w-full min-h-full min-w-full max-w-none object-cover object-center"
          playsInline
          loop
          muted={muted}
        />
        {isActive && (
          <button
            type="button"
            onClick={onToggleMute}
            className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
        )}
      </>
    );
  }

  return (
    <iframe
      src={isActive ? parsed.embedUrl : undefined}
      title={video.title}
      className="absolute inset-0 size-full border-0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

function useReelsPerView() {
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const md = window.matchMedia("(min-width: 768px)");

    const update = () => {
      if (lg.matches) setSlidesPerView(3);
      else if (md.matches) setSlidesPerView(2);
      else setSlidesPerView(1);
    };

    update();
    lg.addEventListener("change", update);
    md.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      md.removeEventListener("change", update);
    };
  }, []);

  return slidesPerView;
}

function ReelSlideCard({
  item,
  isInView,
  isPlaying,
  parsed,
  muted,
  onToggleMute,
  onPause,
  onPlay,
}: {
  item: PortfolioVideo;
  isInView: boolean;
  isPlaying: boolean;
  parsed: ReturnType<typeof parseVideoUrl>;
  muted: boolean;
  onToggleMute: () => void;
  onPause: () => void;
  onPlay: () => void;
}) {
  return (
    <article
      className={`w-full aspect-[9/16] rounded-2xl overflow-hidden relative bg-brand-navy shadow-xl ${
        isPlaying ? "ring-2 ring-brand-amber ring-offset-2" : ""
      }`}
    >
      {isPlaying && parsed ? (
        <ReelPlayer
          video={item}
          parsed={parsed}
          isActive={isInView}
          muted={muted}
          onToggleMute={onToggleMute}
        />
      ) : (
        <>
          <img
            src={item.thumbnail}
            alt={item.title}
            className="absolute inset-0 h-full w-full min-h-full min-w-full max-w-none object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-brand-navy/20" />
        </>
      )}

      {isInView && isPlaying && (
        <button
          type="button"
          onClick={onPause}
          className="absolute top-3 left-3 z-10 flex size-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
          aria-label="Pause video"
        >
          <Pause className="size-4" aria-hidden />
        </button>
      )}

      {isInView && !isPlaying && parsed && (
        <button
          type="button"
          onClick={onPlay}
          className="absolute inset-0 flex items-center justify-center z-10"
          aria-label={`Play ${item.title}`}
        >
          <span className="flex size-14 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-lg">
            <Play className="size-6 fill-current ml-0.5" aria-hidden />
          </span>
        </button>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
        <span className="inline-block bg-brand-amber text-brand-navy text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-sm mb-2">
          {item.service}
        </span>
        <h3 className="font-extrabold uppercase tracking-tight text-white text-sm leading-tight mb-1">
          {item.title}
        </h3>
        <p className="flex items-center gap-1 text-white/70 text-[10px] font-semibold uppercase tracking-wider">
          <MapPin className="size-3 text-brand-red shrink-0" aria-hidden />
          {item.location}
        </p>
      </div>
    </article>
  );
}

function ReelsCarousel({ videos }: { videos: PortfolioVideo[] }) {
  const count = videos.length;
  const slidesPerView = useReelsPerView();
  const maxIndex = Math.max(0, count - slidesPerView);
  const canSlide = maxIndex > 0;

  const [index, setIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [animating, setAnimating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const swipe = useRef({ startX: 0, dragging: false, pointerId: -1 });

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (next: number) => setIndex(Math.min(Math.max(0, next), maxIndex)),
    [maxIndex],
  );

  const prev = useCallback(() => goTo(index <= 0 ? maxIndex : index - 1), [goTo, index, maxIndex]);
  const next = useCallback(() => goTo(index >= maxIndex ? 0 : index + 1), [goTo, index, maxIndex]);

  const onSwipeStart = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest("button")) return;
    swipe.current = { startX: e.clientX, dragging: true, pointerId: e.pointerId };
    setAnimating(false);
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onSwipeMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!swipe.current.dragging || swipe.current.pointerId !== e.pointerId) return;
    setDragOffset(e.clientX - swipe.current.startX);
  }, []);

  const endSwipe = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!swipe.current.dragging || swipe.current.pointerId !== e.pointerId) return;

      const dx = e.clientX - swipe.current.startX;
      swipe.current.dragging = false;
      setAnimating(true);
      setDragOffset(0);
      setIsDragging(false);

      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }

      if (dx > 50) prev();
      else if (dx < -50) next();
    },
    [prev, next],
  );

  useEffect(() => {
    setPlayingIndex(null);
  }, [index]);

  useEffect(() => {
    if (paused || isDragging || !canSlide) return;
    const id = setInterval(() => next(), 5500);
    return () => clearInterval(id);
  }, [paused, isDragging, canSlide, next]);

  if (videos.length === 0) {
    return (
      <p className="text-center text-brand-slate text-sm py-12">
        No videos yet. Add Reels or TikTok clips in{" "}
        <code className="text-brand-navy text-xs">src/config/past-works.ts</code>.
      </p>
    );
  }

  return (
    <div
      className="relative px-2 md:px-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing select-none touch-pan-y"
        aria-live="polite"
        aria-atomic="true"
        onPointerDown={onSwipeStart}
        onPointerMove={onSwipeMove}
        onPointerUp={endSwipe}
        onPointerCancel={endSwipe}
      >
        <div
          className="flex"
          style={{
            width: `${(count / slidesPerView) * 100}%`,
            transform: `translateX(calc(-${(index / count) * 100}% + ${dragOffset}px))`,
            transition: animating ? "transform 500ms ease-out" : "none",
          }}
        >
          {videos.map((item, i) => {
            const parsed = parseVideoUrl(item.videoUrl);
            const isInView = i >= index && i < index + slidesPerView;
            const isPlaying = playingIndex === i && parsed !== null;

            return (
              <div
                key={`${item.title}-${i}`}
                className="px-2 md:px-3 box-border shrink-0"
                style={{ width: `${100 / count}%` }}
              >
                <ReelSlideCard
                  item={item}
                  isInView={isInView}
                  isPlaying={isPlaying}
                  parsed={parsed}
                  muted={muted}
                  onToggleMute={() => setMuted((m) => !m)}
                  onPause={() => setPlayingIndex(null)}
                  onPlay={() => setPlayingIndex(i)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {canSlide && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-navy shadow-md hover:border-brand-red hover:text-brand-red transition-colors"
            aria-label="Previous videos"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-navy shadow-md hover:border-brand-red hover:text-brand-red transition-colors"
            aria-label="Next videos"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>

          <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Reel slides">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === index}
                className={`rounded-full transition-all ${
                  i === index ? "w-6 h-2 bg-brand-red" : "size-2 bg-slate-300 hover:bg-brand-red/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function PastWorks() {
  const [tab, setTab] = useState<Tab>("images");

  return (
    <section id="past-work" className="bg-slate-50 py-20 md:py-24 px-6 border-y border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-3">Our Portfolio</p>
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight mb-4 text-brand-navy">
            Past Works
          </h2>
          <div className="h-1 w-20 bg-brand-amber mx-auto" />
          <p className="mt-6 text-brand-slate max-w-2xl mx-auto text-pretty leading-relaxed">
          Proof of the work we do, every day.
          </p>
        </div>

        <div
          className="flex justify-center gap-2 mb-10 md:mb-12 p-1 bg-white border border-slate-200 rounded-sm w-fit mx-auto"
          role="tablist"
          aria-label="Portfolio media type"
        >
          {(
            [
              { id: "images" as const, label: "Photos" },
              { id: "videos" as const, label: "Videos" },
            ] as const
          ).map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`px-6 py-2.5 text-xs font-extrabold uppercase tracking-widest rounded-sm transition-all ${
                tab === id
                  ? "bg-brand-navy text-white shadow-md"
                  : "text-brand-slate hover:text-brand-navy"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "images" ? (
          <div
            role="tabpanel"
            aria-label="Portfolio photos"
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
          >
            {portfolioImages.map((work) => (
              <ImageCard key={work.title} work={work} />
            ))}
          </div>
        ) : (
          <div role="tabpanel" aria-label="Portfolio videos">
            <ReelsCarousel videos={portfolioVideos} />
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href="#book"
            className="inline-flex items-center gap-2 text-brand-red font-bold text-sm uppercase tracking-widest hover:gap-3 hover:text-brand-navy transition-all"
          >
            Request a quote for your property <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
