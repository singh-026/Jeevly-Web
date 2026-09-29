"use client";

import { useEffect, useRef, useState } from "react";
import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Container } from "@/components/ui/section";
import { ProjectIntakeButton } from "@/features/contact/components/project-intake";
import { cn } from "@/lib/cn";

/** Scroll depth, in viewport heights, before the pinned banner slides in. */
const REVEAL_AFTER = 0.75;

type Phase = "hidden" | "pinned" | "docked";

/**
 * Contact banner pinned to the bottom of the viewport on the lower part of the
 * page. It must stay a direct child of <body> so `sticky` spans the whole page;
 * once the footer (its next sibling) scrolls into view it settles into its
 * natural slot and docks on top of the footer.
 */
export function SiteCta() {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("hidden");
  // No slide animation until the first measurement, so a banner that is
  // already docked on load (short pages) never animates in.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const footer = ref.current?.nextElementSibling;
    if (!footer) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const vh = window.innerHeight;
      if (footer.getBoundingClientRect().top <= vh) setPhase("docked");
      else setPhase(window.scrollY > vh * REVEAL_AFTER ? "pinned" : "hidden");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    setReady(true);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const hidden = phase === "hidden";

  return (
    <div
      ref={ref}
      inert={hidden}
      className={cn(
        "sticky bottom-0 z-30 bg-navy text-white",
        ready && "motion-safe:transition-[translate,opacity,box-shadow] motion-safe:duration-300 motion-safe:ease-out",
        hidden && "pointer-events-none translate-y-full opacity-0",
        phase === "pinned" && "shadow-[0_-12px_32px_-12px_rgb(26_31_60/0.35)]",
      )}
    >
      <Container className="flex flex-col items-start gap-4 py-5 sm:py-6 md:flex-row md:items-center md:justify-between lg:py-8">
        <h2 className="text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
          Have an idea? Let&apos;s build it.
        </h2>
        <ProjectIntakeButton
          className={cn(buttonStyles({ variant: "accent" }), "shrink-0 cursor-pointer transition-all duration-200")}
        >
          Start a Conversation
          <Icon name="arrow-right" className="size-4" />
        </ProjectIntakeButton>
      </Container>
    </div>
  );
}
