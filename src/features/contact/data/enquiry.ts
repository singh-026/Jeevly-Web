import type { LeadServiceId, PersonaId } from "@/features/services/types";
import type { BudgetCurrency, BudgetTier, BudgetTierId } from "../types";

export const personaOptions: { id: PersonaId; label: string }[] = [
  { id: "business", label: "Businesses" },
  { id: "founder", label: "Founders & Creators" },
];

/** Options in the form's "What do you need?" group. */
export const serviceOptions: { id: LeadServiceId; label: string }[] = [
  { id: "plan", label: "Project planning & PRD" },
  { id: "design", label: "UI/UX design" },
  { id: "build", label: "Web or mobile app" },
  { id: "modernize", label: "Modernize a system" },
  { id: "marketing", label: "Launch marketing" },
];

export const budgetCurrencies: BudgetCurrency[] = ["INR", "USD"];

const tier = (id: BudgetTierId, label: string, min: number | null, max: number | null): BudgetTier => ({
  id,
  label,
  min,
  max,
});

/**
 * Budget tiers per currency. Ids are shared across currencies, so the
 * selected tier survives a currency switch. Amounts are whole units (rupees,
 * dollars); `null` means open-ended.
 */
export const budgetTiers: Record<BudgetCurrency, BudgetTier[]> = {
  INR: [
    tier("tier-1", "Under ₹50,000", 0, 50_000),
    tier("tier-2", "₹50,000 - ₹1,00,000", 50_000, 100_000),
    tier("tier-3", "₹1,00,000 - ₹2,50,000", 100_000, 250_000),
    tier("tier-4", "₹2,50,000 - ₹5,00,000", 250_000, 500_000),
    tier("tier-5", "₹5,00,000+", 500_000, null),
    tier("unsure", "Not sure yet", null, null),
  ],
  USD: [
    tier("tier-1", "Under $5,000", 0, 5_000),
    tier("tier-2", "$5,000 - $10,000", 5_000, 10_000),
    tier("tier-3", "$10,000 - $15,000", 10_000, 15_000),
    tier("tier-4", "$15,000 - $20,000", 15_000, 20_000),
    tier("tier-5", "$20,000+", 20_000, null),
    tier("unsure", "Not sure yet", null, null),
  ],
};

export const nextSteps = [
  "We read your brief and reply within one business day.",
  "A 30-minute call with a senior engineer to understand your goals.",
  "A written proposal with scope, timeline and fixed price within 5 business days.",
];
