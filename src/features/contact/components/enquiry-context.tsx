"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ComponentProps, type ReactNode } from "react";
import type { LeadServiceId, PersonaId } from "@/features/services/types";
import { enquirySectionId } from "../constants";
import { EnquiryModal } from "./enquiry-modal";

type Prefill = { persona?: PersonaId; service?: LeadServiceId };

type EnquiryState = {
  persona: PersonaId;
  services: LeadServiceId[];
  setPersona: (persona: PersonaId) => void;
  toggleService: (service: LeadServiceId) => void;
  /**
   * Brings up the enquiry form, pre-filling whatever the CTA knows: scrolls to
   * the page's inline form when there is one, and opens the modal otherwise.
   */
  startEnquiry: (prefill?: Prefill) => void;
};

const EnquiryContext = createContext<EnquiryState | null>(null);

/**
 * Shares the visitor's persona and chosen services across the site, so the
 * persona tabs, "Discuss This Service" buttons and the enquiry form stay in
 * sync, and hosts the single enquiry modal. Mount once in the root layout.
 */
export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<PersonaId>("business");
  const [services, setServices] = useState<LeadServiceId[]>([]);
  // A new session remounts the modal's form, so every open starts unsent.
  const [session, setSession] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleService = useCallback((service: LeadServiceId) => {
    setServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]));
  }, []);

  const startEnquiry = useCallback(({ persona, service }: Prefill = {}) => {
    if (persona) setPersona(persona);
    if (service) setServices((prev) => (prev.includes(service) ? prev : [...prev, service]));

    const section = document.getElementById(enquirySectionId);
    if (!section) {
      setSession((id) => id + 1);
      setModalOpen(true);
      return;
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    section.querySelector<HTMLElement>("textarea")?.focus({ preventScroll: true });
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const value = useMemo(
    () => ({ persona, services, setPersona, toggleService, startEnquiry }),
    [persona, services, toggleService, startEnquiry],
  );

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <EnquiryModal open={modalOpen} session={session} onClose={closeModal} />
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const enquiry = useContext(EnquiryContext);
  if (!enquiry) throw new Error("useEnquiry must be used inside EnquiryProvider.");
  return enquiry;
}

type EnquiryButtonProps = Omit<ComponentProps<"button">, "type"> & Prefill;

/**
 * A button that brings up the enquiry form with the given persona and service
 * pre-selected. Style it via `className` (e.g. `buttonStyles()`).
 */
export function EnquiryButton({ persona, service, onClick, ...props }: EnquiryButtonProps) {
  const { startEnquiry } = useEnquiry();
  return (
    <button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        startEnquiry({ persona, service });
      }}
      {...props}
    />
  );
}
