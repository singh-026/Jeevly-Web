"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { EnquiryForm } from "./enquiry-form";
import { EnquiryIntro } from "./enquiry-intro";

type EnquiryModalProps = {
  open: boolean;
  /** A new session id remounts the form, so every open starts unsent; 0 means never opened. */
  session: number;
  onClose: () => void;
};

/**
 * The enquiry form for pages without an inline one. Built on the native
 * <dialog>: showModal() gives us the focus trap, ESC to close, an inert page
 * behind and the ::backdrop for free.
 */
export function EnquiryModal({ open, session, onClose }: EnquiryModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  // Only a press that starts *and* ends on the backdrop closes the dialog, so
  // selecting text in a field and releasing outside it doesn't.
  const pressStartedOnBackdrop = useRef(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // Start in the brief, as the inline form does, rather than on the intro's email link.
      dialog.querySelector("textarea")?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby="enquiry-modal-title"
      onClose={onClose}
      onPointerDown={(e) => (pressStartedOnBackdrop.current = e.target === e.currentTarget)}
      onClick={(e) => {
        if (pressStartedOnBackdrop.current && e.target === e.currentTarget) close();
      }}
      className={cn(
        "m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-6xl overflow-y-auto overscroll-contain rounded-3xl bg-surface p-0 text-ink shadow-2xl",
        "backdrop:bg-navy/60 backdrop:backdrop-blur-sm",
        // Fade and scale in/out; `transition-discrete` keeps it visible while closing.
        "scale-95 opacity-0 transition-[opacity,scale,display,overlay] transition-discrete duration-200 ease-out",
        "open:scale-100 open:opacity-100 starting:open:scale-95 starting:open:opacity-0 motion-reduce:transition-none",
      )}
    >
      {session > 0 && (
        <div key={session} className="relative grid gap-10 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <EnquiryIntro titleId="enquiry-modal-title" />
          <EnquiryForm />
          {/* Last in DOM order so it isn't the first thing focused. */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-3 right-3 grid size-10 cursor-pointer place-items-center rounded-full bg-surface/90 text-navy shadow-card transition-colors hover:bg-navy-50"
          >
            <Icon name="close" className="size-5" />
          </button>
        </div>
      )}
    </dialog>
  );
}
