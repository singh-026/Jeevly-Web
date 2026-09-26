import Image from "next/image";
import { cn } from "@/lib/cn";

export const artworkTones = {
  indigo: { from: "#4b5394", to: "#1a1f3c", ink: "#c7cbf0" },
  amber: { from: "#fdba74", to: "#f97316", ink: "#fff7ed" },
  teal: { from: "#5eead4", to: "#0f766e", ink: "#f0fdfa" },
  rose: { from: "#fda4af", to: "#be123c", ink: "#fff1f2" },
  violet: { from: "#c4b5fd", to: "#6d28d9", ink: "#f5f3ff" },
  sky: { from: "#7dd3fc", to: "#0369a1", ink: "#f0f9ff" },
  emerald: { from: "#6ee7b7", to: "#047857", ink: "#ecfdf5" },
} as const;

export type ArtworkTone = keyof typeof artworkTones;

/** Media for a card or gallery: a real image when available, else generated art. */
export type Media = {
  tone: ArtworkTone;
  /** Path under /public or an allowed remote URL. Overrides the generated art. */
  src?: string;
  alt: string;
};

type ArtworkProps = {
  media: Media;
  /** Stable string that drives the generated layout (e.g. a slug). */
  seed: string;
  variant?: "cover" | "screen";
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Renders `media.src` if set, otherwise a deterministic SVG illustration so
 * every card has a thumbnail before real assets exist. Fills its parent;
 * the parent sets the aspect ratio.
 */
export function Artwork({ media, seed, variant = "cover", className, sizes, priority }: ArtworkProps) {
  if (media.src) {
    return (
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes ?? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  const palette = artworkTones[media.tone];
  const rand = seededRandom(`${seed}:${variant}`);
  const gradientId = `art-${media.tone}-${variant}-${hash(seed)}`;

  return (
    <svg
      viewBox="0 0 400 250"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={media.alt}
      className={cn("absolute inset-0 size-full", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={palette.from} />
          <stop offset="1" stopColor={palette.to} />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill={`url(#${gradientId})`} />
      {variant === "cover" ? <CoverShapes rand={rand} ink={palette.ink} /> : <ScreenShapes rand={rand} palette={palette} />}
    </svg>
  );
}

type Palette = (typeof artworkTones)[ArtworkTone];

function CoverShapes({ rand, ink }: { rand: () => number; ink: string }) {
  const circles = Array.from({ length: 3 }, () => ({
    cx: 40 + rand() * 320,
    cy: 20 + rand() * 210,
    r: 30 + rand() * 70,
  }));
  return (
    <g>
      {circles.map((c, i) => (
        <circle key={i} {...c} fill={ink} opacity={0.08 + i * 0.04} />
      ))}
      {/* A floating "app window" gives every cover a product feel. */}
      <g transform={`translate(${90 + rand() * 40} ${55 + rand() * 20})`}>
        <rect width="190" height="130" rx="12" fill={ink} opacity="0.95" />
        <rect x="14" y="14" width="60" height="8" rx="4" fill="#1a1f3c" opacity="0.25" />
        <rect x="14" y="34" width={100 + rand() * 50} height="6" rx="3" fill="#1a1f3c" opacity="0.15" />
        <rect x="14" y="48" width={80 + rand() * 60} height="6" rx="3" fill="#1a1f3c" opacity="0.15" />
        {[0, 1, 2, 3, 4].map((i) => {
          const h = 20 + rand() * 40;
          return <rect key={i} x={14 + i * 34} y={116 - h} width="22" height={h} rx="4" fill="#1a1f3c" opacity={0.2 + i * 0.08} />;
        })}
      </g>
    </g>
  );
}

function ScreenShapes({ rand, palette }: { rand: () => number; palette: Palette }) {
  return (
    <g>
      <rect x="16" y="16" width="368" height="218" rx="10" fill="#ffffff" />
      <rect x="16" y="16" width="368" height="26" rx="10" fill="#f1f2f8" />
      <circle cx="32" cy="29" r="4" fill={palette.to} opacity="0.5" />
      <rect x="28" y="54" width="70" height="168" rx="6" fill="#f1f2f8" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="38" y={66 + i * 20} width={40 + rand() * 12} height="6" rx="3" fill="#1a1f3c" opacity={i === 0 ? 0.5 : 0.15} />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${110 + i * 90} 54)`}>
          <rect width="80" height="46" rx="6" fill={i === 0 ? palette.to : "#f1f2f8"} opacity={i === 0 ? 0.9 : 1} />
          <rect x="10" y="12" width="30" height="5" rx="2.5" fill={i === 0 ? "#ffffff" : "#1a1f3c"} opacity="0.5" />
          <rect x="10" y="24" width={30 + rand() * 30} height="9" rx="3" fill={i === 0 ? "#ffffff" : "#1a1f3c"} opacity={i === 0 ? 0.9 : 0.3} />
        </g>
      ))}
      <rect x="110" y="110" width="260" height="112" rx="6" fill="#f8fafc" />
      <polyline
        points={Array.from({ length: 9 }, (_, i) => `${122 + i * 30},${200 - rand() * 70}`).join(" ")}
        fill="none"
        stroke={palette.to}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </g>
  );
}

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic PRNG (mulberry32) so server and client render identically. */
function seededRandom(seed: string) {
  let a = hash(seed);
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
