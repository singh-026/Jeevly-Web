"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Artwork } from "@/components/ui/artwork";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { Screenshot } from "../types";

type ScreenshotGalleryProps = {
  screenshots: Screenshot[];
  productName: string;
  seed: string;
};

/**
 * Scroll-snap carousel: swipe on touch, buttons or arrow keys elsewhere.
 * Native scrolling does the animation, React only tracks the index.
 */
export function ScreenshotGallery({ screenshots, productName, seed }: ScreenshotGalleryProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const last = screenshots.length - 1;

  function goTo(next: number) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(last, next));
    track.scrollTo({ left: clamped * track.clientWidth });
    setIndex(clamped);
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") goTo(index + 1);
    else if (event.key === "ArrowLeft") goTo(index - 1);
    else return;
    event.preventDefault();
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${productName} screenshots`}
      onKeyDown={onKeyDown}
    >
      <div className="relative">
        <ul
          ref={trackRef}
          onScroll={onScroll}
          tabIndex={0}
          aria-label="Screenshots, use left and right arrow keys to browse"
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-card motion-safe:scroll-smooth"
        >
          {screenshots.map((shot, i) => (
            <li
              key={shot.caption}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${screenshots.length}: ${shot.caption}`}
              className="w-full shrink-0 snap-center"
            >
              <figure>
                <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-navy-50">
                  <Artwork media={shot} seed={`${seed}-${i}`} variant="screen" sizes="(min-width: 1152px) 1152px, 100vw" />
                </div>
                <figcaption className="mt-3 text-center text-sm text-muted">{shot.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <GalleryButton direction="prev" disabled={index === 0} onClick={() => goTo(index - 1)} />
        <GalleryButton direction="next" disabled={index === last} onClick={() => goTo(index + 1)} />
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {screenshots.map((shot, i) => (
          <button
            key={shot.caption}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show screenshot ${i + 1}: ${shot.caption}`}
            aria-current={i === index ? "true" : undefined}
            className="grid size-6 place-items-center rounded-full"
          >
            <span
              className={cn("block h-2 rounded-full transition-all", i === index ? "w-6 bg-accent" : "w-2 bg-navy/25")}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function GalleryButton({ direction, disabled, onClick }: { direction: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous screenshot" : "Next screenshot"}
      className={cn(
        // Sits over the image area (not the caption); hidden on touch-size screens where swipe is natural.
        "absolute top-[calc(50%-1rem)] hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-surface/95 text-navy shadow-card transition hover:bg-surface disabled:opacity-0 sm:grid",
        direction === "prev" ? "left-3" : "right-3",
      )}
    >
      <Icon name={direction === "prev" ? "chevron-left" : "chevron-right"} />
    </button>
  );
}
