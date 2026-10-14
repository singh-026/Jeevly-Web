import type { ApiErrorBody } from "@/lib/api-client";
import type { LeadServiceId, PersonaId } from "@/features/services/types";

export type BudgetCurrency = "INR" | "USD";

/** Same ids in every currency; "unsure" is "Not sure yet". */
export type BudgetTierId = "tier-1" | "tier-2" | "tier-3" | "tier-4" | "tier-5" | "unsure";

export type BudgetTier = {
  id: BudgetTierId;
  /** Display text, e.g. "₹50,000 - ₹1,00,000". */
  label: string;
  /** Whole currency units (rupees, dollars). `null` = open-ended or unknown. */
  min: number | null;
  max: number | null;
};

/** Budget as sent: the tier id to store and filter on, plus its range and label. */
export type EnquiryBudget = BudgetTier & { currency: BudgetCurrency };

/**
 * Body of `POST /api/v1/enquiries`: what the enquiry form sends to the backend.
 * Ids, not labels, so copy changes on the site never break stored data.
 */
export type EnquiryPayload = {
  /** Bumped when this shape changes, so the backend can accept old and new clients. */
  schemaVersion: 1;
  contact: {
    /** Required. Work email; validated as an email by the browser. */
    email: string;
    /** Accepted by the backend; the form doesn't ask for it yet. */
    name?: string;
    /** International format, e.g. "+91 98765 43210". Accepted by the backend; the form doesn't ask for it yet. */
    phone?: string;
  };
  persona: PersonaId;
  /** "What do you need?" picks, in the order offered; may be empty. */
  services: LeadServiceId[];
  /** `null` when no range was picked. */
  budget: EnquiryBudget | null;
  /** "Tell us about your project", trimmed; `null` when left blank. */
  description: string | null;
  meta: {
    /** ISO 8601, from the visitor's clock. */
    submittedAt: string;
    /** Page the form was sent from, e.g. "/services". */
    sourcePath: string;
    /** `document.referrer`; `null` when empty. */
    referrer: string | null;
    /** `navigator.language`, e.g. "en-IN". */
    locale: string;
  };
  /**
   * Honeypot: a field hidden from people, so only bots fill it in. Always ""
   * from a real visitor; the backend drops enquiries where it isn't.
   */
  website: string;
};

/** 201 Created. */
export type EnquiryCreatedResponse = {
  id: string;
  /** ISO 8601, server clock. */
  receivedAt: string;
};

/** 4xx / 5xx. `field` points at the offending payload path on a 422, e.g. "contact.email". */
export type EnquiryErrorResponse = ApiErrorBody;
