"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { enquirySectionId } from "@/features/contact/constants";
import { EnquiryButton } from "@/features/contact/components/enquiry-context";
import { cn } from "@/lib/cn";

/** Share of the viewport the inline enquiry section must fill before the CTA fades out. */
const HIDE_AT = 0.5;

/**
 * The header's "Start a Project" button. It fades out while the page's own
 * enquiry section fills at least half the screen, since the form is right there.
 */
export function HeaderCta() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  // Re-run per route: each page may or may not render the inline section.
  useEffect(() => {
    const section = document.getElementById(enquirySectionId);

    let frame = 0;
    const measure = () => {
      frame = 0;
      if (!section) return setHidden(false);
      const { top, bottom } = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const visible = Math.min(bottom, vh) - Math.max(top, 0);
      setHidden(visible >= vh * HIDE_AT);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    if (!section) return;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return (
    // Wrapped because the button's own inline-flex would override `hidden`; the
    // wrapper also carries the fade so it doesn't fight the button's colour transition.
    <div
      inert={hidden}
      className={cn(
        "hidden motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out sm:block",
        hidden && "pointer-events-none opacity-0",
      )}
    >
      <EnquiryButton className={cn(buttonStyles({ variant: "accent" }), "cursor-pointer")}>
        Start a Project
        <Icon name="arrow-right" className="size-4" />
      </EnquiryButton>
    </div>
  );
}
