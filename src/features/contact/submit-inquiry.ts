import { siteConfig } from "@/config/site";
import type { LeadServiceId, PersonaId } from "@/features/services/types";
import { budgetTiers, personaOptions, serviceOptions } from "./data/enquiry";
import type { BudgetCurrency, BudgetTierId, EnquiryPayload } from "./types";

type EnquiryFormState = {
  email: string;
  description: string;
  persona: PersonaId;
  services: LeadServiceId[];
  currency: BudgetCurrency;
  budgetTier: BudgetTierId | null;
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
  };
}

/**
 * The site is a static export (GitHub Pages), so there is no server to post
 * to. Until a form endpoint exists, the payload is handed to the visitor's
 * mail client as a prefilled email. When it does, replace the body with:
 *
 *   await fetch(`${API_URL}/enquiries`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
 *
 * Runs in the browser; not an `api.ts` because those are server-only data
 * access in every other feature.
 */
export function submitProjectInquiry(payload: EnquiryPayload) {
  const persona = personaOptions.find((p) => p.id === payload.persona)?.label;
  const services = serviceOptions.filter((o) => payload.services.includes(o.id)).map((o) => o.label);

  const lines = [
    `Email: ${payload.contact.email}`,
    ...(persona ? [`I am a: ${persona}`] : []),
    ...(services.length ? [`Needs: ${services.join(", ")}`] : []),
    ...(payload.budget ? [`Budget: ${payload.budget.label} (${payload.budget.currency})`] : []),
    "",
    "Project description:",
    payload.description ?? "-",
  ];
  const params = `subject=${encodeURIComponent("New project inquiry")}&body=${encodeURIComponent(lines.join("\n"))}`;
  window.location.href = `mailto:${siteConfig.contact.email}?${params}`;
}
