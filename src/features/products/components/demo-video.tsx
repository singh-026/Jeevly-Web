"use client";

import { useState } from "react";
import { Artwork, type Media } from "@/components/ui/artwork";
import { Icon } from "@/components/ui/icon";
import type { Product } from "../types";

type DemoVideoProps = {
  video: Product["video"];
  poster: Media;
  seed: string;
};

/**
 * Click-to-load player: shows a poster until the visitor presses play, so
 * third-party embeds cost nothing on page load.
 */
export function DemoVideo({ video, poster, seed }: DemoVideoProps) {
  const [playing, setPlaying] = useState(false);
  const available = Boolean(video.youtubeId || video.src);

  return (
    <div className="relative aspect-video overflow-hidden rounded-card bg-navy shadow-card-hover">
      {playing && video.youtubeId ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : playing && video.src ? (
        <video src={video.src} controls autoPlay className="absolute inset-0 size-full" aria-label={video.title} />
      ) : (
        <>
          <Artwork media={poster} seed={`${seed}-video`} className="opacity-60" />
          <div className="absolute inset-0 grid place-items-center bg-navy/30">
            {available ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play video: ${video.title}`}
                className="grid size-20 place-items-center rounded-full bg-accent text-on-accent shadow-float transition motion-safe:hover:scale-105"
              >
                <Icon name="play" className="size-8 translate-x-0.5 fill-current" />
              </button>
            ) : (
              <p className="rounded-full bg-navy/80 px-5 py-2.5 text-sm font-semibold text-white">
                Demo video coming soon
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
