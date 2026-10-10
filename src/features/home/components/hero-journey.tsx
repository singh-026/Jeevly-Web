import { cn } from "@/lib/cn";
import { Swoosh } from "./swoosh";

const signups = [12, 16, 14, 22, 20, 28, 34];

const recentSignups = ["Priya joined", "Marco joined", "Aisha joined"];

/**
 * "Idea to launch" illustration for the hero: a paper sketch, the polished
 * design it became, and the live app on a phone. Drawn in markup so it stays
 * crisp and needs no image assets. Everything is sized in `em` off a
 * container-relative font size, so the whole scene scales as one piece.
 */
export function HeroJourney() {
  return (
    <div aria-hidden="true" className="@container relative mx-auto w-full max-w-2xl select-none">
      <div className="relative aspect-[5/4] text-[2.2cqw]">
        <svg viewBox="0 0 60 60" className="absolute top-[1%] right-[3%] w-[3.6em] text-accent" fill="none">
          <path d="M28 30 44 6M30 44l26-8" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        </svg>

        {/* 1. The idea: a paper sketch */}
        <div className="absolute top-[3%] left-[1%] w-[42%] -rotate-[6deg] drop-shadow-[0_1em_1.5em_rgb(26_31_60/0.18)]">
          <Stage step={1} label="Idea" />
          <div className="aspect-[4/3] rounded-[0.6em] bg-[#fffdf6] bg-[linear-gradient(#e8ecf5_1px,transparent_1px)] bg-[length:100%_1.2em] p-[1em]">
            <div className="flex h-full flex-col gap-[0.5em] text-navy/70">
              <SketchBox className="h-[1.1em] w-[60%]" />
              <SketchBox className="flex-1" />
              <div className="flex gap-[0.5em]">
                <SketchBox className="h-[2.2em] flex-1" />
                <SketchBox className="h-[2.2em] flex-1" />
              </div>
              <p className="font-hand text-[1.2em] leading-none text-navy">big button here!</p>
            </div>
          </div>
        </div>

        {/* 2. The design: a polished screen, mid-review */}
        <div className="absolute top-[24%] left-[22%] z-10 w-[52%] rotate-[2deg] drop-shadow-[0_1.5em_2em_rgb(26_31_60/0.22)]">
          <Stage step={2} label="Design" />
          <div className="overflow-hidden rounded-[0.7em] bg-white ring-1 ring-navy/10">
            <div className="flex items-center gap-[0.3em] border-b border-line bg-navy-50 px-[0.7em] py-[0.45em]">
              <span className="size-[0.45em] rounded-full bg-rose-300" />
              <span className="size-[0.45em] rounded-full bg-amber-300" />
              <span className="size-[0.45em] rounded-full bg-emerald-300" />
            </div>
            <div className="flex flex-col gap-[0.6em] p-[0.9em]">
              <div className="flex items-center justify-between">
                <span className="h-[0.5em] w-[3.5em] rounded-full bg-navy" />
                <span className="flex gap-[0.4em]">
                  <span className="h-[0.35em] w-[1.6em] rounded-full bg-navy/20" />
                  <span className="h-[0.35em] w-[1.6em] rounded-full bg-navy/20" />
                </span>
              </div>
              <div className="rounded-[0.5em] bg-accent-soft p-[0.8em]">
                <span className="block h-[0.6em] w-[70%] rounded-full bg-navy" />
                <span className="mt-[0.4em] block h-[0.35em] w-[50%] rounded-full bg-navy/30" />
                {/* The button from the sketch, selected as if in a design tool */}
                <span className="relative mt-[0.8em] inline-block rounded-full bg-cta px-[1em] py-[0.3em] text-[0.55em] font-semibold text-white outline outline-[0.15em] outline-offset-[0.35em] outline-sky-500">
                  Get started
                  {["-top-[0.75em] -left-[0.75em]", "-top-[0.75em] -right-[0.75em]", "-bottom-[0.75em] -left-[0.75em]", "-bottom-[0.75em] -right-[0.75em]"].map((pos) => (
                    <span key={pos} className={cn("absolute size-[0.55em] border border-sky-500 bg-white", pos)} />
                  ))}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-[0.5em]">
                {[0, 1].map((i) => (
                  <div key={i} className="rounded-[0.45em] border border-line p-[0.5em]">
                    <span className="block size-[0.9em] rounded-[0.25em] bg-navy-100" />
                    <span className="mt-[0.4em] block h-[0.3em] w-[80%] rounded-full bg-navy/25" />
                    <span className="mt-[0.25em] block h-[0.3em] w-[55%] rounded-full bg-navy/15" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Launch: the live app */}
        <div className="absolute right-[3%] bottom-[3%] z-20 w-[25%] rotate-[4deg] drop-shadow-[0_1.5em_1.5em_rgb(26_31_60/0.3)]">
          <Stage step={3} label="Launch" />
          <div className="aspect-[9/17] rounded-[1.6em] bg-navy p-[0.3em]">
            <div className="relative flex h-full flex-col gap-[0.6em] rounded-[1.35em] bg-white px-[0.7em] pt-[1.6em] pb-[0.8em]">
              <span className="absolute top-[0.5em] left-1/2 h-[0.4em] w-[2.4em] -translate-x-1/2 rounded-full bg-navy" />
              <span className="inline-flex items-center gap-[0.3em] self-start rounded-full bg-emerald-50 px-[0.5em] py-[0.2em] text-[0.5em] font-semibold text-emerald-700">
                <span className="size-[0.6em] rounded-full bg-emerald-500" />
                Live
              </span>
              <div>
                <p className="text-[0.5em] text-muted">Sign-ups this week</p>
                <p className="text-[1.15em] leading-tight font-extrabold text-navy">1,240</p>
              </div>
              <svg viewBox="0 0 60 36" className="w-full" fill="none">
                <polyline
                  points={signups.map((v, i) => `${i * 10},${36 - v}`).join(" ")}
                  stroke="#ff632b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <ul className="flex flex-col gap-[0.4em] border-t border-line pt-[0.5em]">
                {recentSignups.map((name, i) => (
                  <li key={name} className="flex items-center gap-[0.35em]">
                    <span className={cn("size-[0.9em] shrink-0 rounded-full", ["bg-sky-200", "bg-amber-200", "bg-violet-200"][i])} />
                    <span className="truncate text-[0.45em] text-navy/80">{name}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-auto rounded-full bg-cta py-[0.35em] text-center text-[0.55em] font-semibold text-white">
                Get started
              </span>
            </div>
          </div>
        </div>

        {/* Handwritten caption */}
        <div className="absolute bottom-[4%] left-[4%] -rotate-[6deg] font-hand text-[1.6em] leading-[1] text-navy">
          <p>idea to launch,</p>
          <p className="pl-[0.6em]">one team</p>
          <Swoosh className="mt-[0.15em] ml-[0.8em] w-[3em] -rotate-6" />
        </div>
      </div>
    </div>
  );
}

/** Numbered tag pinned above each stage of the journey. */
function Stage({ step, label }: { step: number; label: string }) {
  return (
    <span className="absolute -top-[1em] left-[0.8em] z-10 inline-flex items-center gap-[0.35em] rounded-full bg-navy py-[0.25em] pr-[0.7em] pl-[0.25em] text-[0.75em] font-semibold text-white shadow-md">
      <span className="grid size-[1.4em] place-items-center rounded-full bg-cta text-[0.85em]">{step}</span>
      {label}
    </span>
  );
}

/** A hand-drawn-looking wireframe block. */
function SketchBox({ className }: { className?: string }) {
  return <div className={cn("rounded-[0.3em] border-[0.12em] border-dashed border-current", className)} />;
}
