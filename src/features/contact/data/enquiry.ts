import type { LeadServiceId, PersonaId } from "@/features/services/types";

export const personaOptions: { id: PersonaId; label: string }[] = [
  { id: "business", label: "Businesses" },
  { id: "founder", label: "Founders & Creators" },
];

/** Options in the form's "What do you need?" group. */
export const serviceOptions: { id: LeadServiceId; label: string }[] = [
  { id: "validate", label: "Validate an idea" },
  { id: "design", label: "UI/UX design" },
  { id: "build", label: "Web or mobile app" },
  { id: "modernize", label: "Modernize a system" },
  { id: "devops", label: "DevOps & support" },
  { id: "marketing", label: "Launch marketing" },
];

export const budgetOptions = ["Under $10K", "$10–25K", "$25–75K", "$75K+", "Not sure yet"];

export const nextSteps = [
  "We read your brief and reply within one business day.",
  "A 30-minute call with a senior engineer to understand your goals.",
  "A written proposal with scope, timeline and fixed price within 5 business days.",
];
