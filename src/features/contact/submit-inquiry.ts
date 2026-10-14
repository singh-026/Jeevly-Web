import { mailtoHref, whatsappHref } from "@/config/site";
import { postJson } from "@/lib/api-client";
import type { LeadServiceId, PersonaId } from "@/features/services/types";
import { budgetTiers, personaOptions, serviceOptions } from "./data/enquiry";
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

/**
 * The brief as plain text, for handing over by email or WhatsApp when the
 * API call fails, so the visitor never has to retype it.
 */
function formatBrief(payload: EnquiryPayload) {
  const persona = personaOptions.find((p) => p.id === payload.persona)?.label;
  const services = serviceOptions.filter((o) => payload.services.includes(o.id)).map((o) => o.label);

  return [
    `Email: ${payload.contact.email}`,
    ...(persona ? [`I am a: ${persona}`] : []),
    ...(services.length ? [`Needs: ${services.join(", ")}`] : []),
    ...(payload.budget ? [`Budget: ${payload.budget.label} (${payload.budget.currency})`] : []),
    "",
    "Project description:",
    payload.description ?? "-",
  ].join("\n");
}

/** Fallback links that carry the brief, offered when the API call fails. */
export function enquiryFallbackHrefs(payload: EnquiryPayload) {
  const brief = formatBrief(payload);
  return {
    email: mailtoHref("New project inquiry", `Hi Jeevly,\n\nHere's my project brief.\n\n${brief}`),
    whatsapp: whatsappHref(`Hi Jeevly! 👋 I tried to send my brief on your website, but it didn't go through. Here it is:\n\n${brief}`),
  };
}
