import { gmailHref, whatsappHref } from "@/config/site";
import { postJson } from "@/lib/api-client";
import type { LeadServiceId, PersonaId } from "@/features/services/types";
import { budgetTiers, serviceOptions } from "./data/enquiry";
import type { BudgetCurrency, BudgetTierId, EnquiryCreatedResponse, EnquiryPayload } from "./types";

export const enquiriesPath = "/api/v1/enquiries";

type EnquiryFormState = {
  email: string;
  description: string;
  persona: PersonaId;
  services: LeadServiceId[];
  currency: BudgetCurrency;
  budgetTier: BudgetTierId | null;
  /** The hidden honeypot input's value. */
  website: string;
};

/** Turns the form's state into the payload the backend expects. */
export function buildEnquiryPayload(form: EnquiryFormState): EnquiryPayload {
  const tier = budgetTiers[form.currency].find((t) => t.id === form.budgetTier);
  const description = form.description.trim();

  return {
    schemaVersion: 1,
    contact: { email: form.email.trim() },
    persona: form.persona,
    // Offer order, not click order, so stored enquiries are consistent.
    services: serviceOptions.map((o) => o.id).filter((id) => form.services.includes(id)),
    budget: tier ? { ...tier, currency: form.currency } : null,
    description: description || null,
    meta: {
      submittedAt: new Date().toISOString(),
      sourcePath: window.location.pathname,
      referrer: document.referrer || null,
      locale: navigator.language,
    },
    website: form.website,
  };
}

/** Sends the enquiry to the backend. Throws an `ApiError` when it doesn't go through. */
export function submitEnquiry(payload: EnquiryPayload) {
  return postJson<EnquiryCreatedResponse>(enquiriesPath, payload);
}

/** How each persona reads in a sentence; the form's labels are plural headings. */
const personaPhrases: Record<PersonaId, string> = {
  business: "a business",
  founder: "a founder / creator",
};

/** The brief's details as display text; `budget` is null when none was picked. */
function briefFields(payload: EnquiryPayload) {
  const services = serviceOptions.filter((o) => payload.services.includes(o.id)).map((o) => o.label);
  return {
    services,
    budget: payload.budget ? `${payload.budget.label} (${payload.budget.currency})` : null,
    description: payload.description ?? "Not provided",
  };
}

/**
 * The brief as a plain-text message, shared by the Gmail and WhatsApp
 * fallbacks. Neither link can carry HTML, so structure comes from section
 * headings and bullets.
 */
function formatBriefMessage(payload: EnquiryPayload) {
  const { services, budget, description } = briefFields(payload);
  const rule = "────────────────────";
  return [
    "Hi Jeevly team,",
    "",
    `I'm ${personaPhrases[payload.persona]} looking to discuss a new project. My brief is below.`,
    "",
    "PROJECT OVERVIEW",
    rule,
    `• Services needed: ${services.length ? services.join(", ") : "Not sure yet"}`,
    `• Budget range: ${budget ?? "To be discussed"}`,
    "",
    "PROJECT DETAILS",
    rule,
    description,
    "",
    "CONTACT",
    rule,
    `• Email: ${payload.contact.email}`,
    "",
    "Looking forward to hearing from you.",
    "",
    "Best regards,",
  ].join("\n");
}

/** Fallback links that carry the brief, offered when the API call fails. */
export function enquiryFallbackHrefs(payload: EnquiryPayload) {
  const { services } = briefFields(payload);
  const subject = services.length ? `New project enquiry: ${services.join(", ")}` : "New project enquiry";
  const message = formatBriefMessage(payload);
  return {
    gmail: gmailHref(subject, message),
    whatsapp: whatsappHref(message),
  };
}
