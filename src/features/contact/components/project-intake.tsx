"use client";

import { createContext, useCallback, useContext, useState, type ComponentProps, type ReactNode } from "react";
import { ProjectIntakeModal, type Captcha } from "./project-intake-modal";

const ProjectIntakeContext = createContext<(() => void) | null>(null);

function randomDigit() {
  return 1 + Math.floor(Math.random() * 9);
}

/** Hosts the single intake modal for the whole site; mount once in the root layout. */
export function ProjectIntakeProvider({ children }: { children: ReactNode }) {
  // Each open gets a fresh form and captcha. Generated on open, not during
  // render, so the server and client HTML always match.
  const [session, setSession] = useState<{ id: number; captcha: Captcha } | null>(null);
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => {
    const captcha: Captcha = [randomDigit(), randomDigit()];
    setSession((prev) => ({ id: (prev?.id ?? 0) + 1, captcha }));
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <ProjectIntakeContext.Provider value={openModal}>
      {children}
      <ProjectIntakeModal open={open} session={session} onClose={closeModal} />
    </ProjectIntakeContext.Provider>
  );
}

/** A button that opens the project intake modal. Style it via `className` (e.g. `buttonStyles()`). */
export function ProjectIntakeButton({ onClick, ...props }: Omit<ComponentProps<"button">, "type">) {
  const openModal = useContext(ProjectIntakeContext);
  if (!openModal) throw new Error("ProjectIntakeButton must be rendered inside ProjectIntakeProvider.");

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={(event) => {
        onClick?.(event);
        openModal();
      }}
      {...props}
    />
  );
}
