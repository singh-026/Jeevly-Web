"use client";

import { useId, useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site";
import { buttonStyles } from "@/components/ui/button";
import { checkableToggleStyles } from "@/components/ui/toggle";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { buildEnquiryPayload, submitProjectInquiry } from "../submit-inquiry";
import { budgetCurrencies, budgetTiers, personaOptions, serviceOptions } from "../data/enquiry";
import type { BudgetCurrency, BudgetTierId } from "../types";
import { useEnquiry } from "./enquiry-context";

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-3.5 text-ink transition-colors placeholder:text-muted hover:border-navy/30 user-invalid:border-rose-500";

const labelClass = "text-sm font-semibold text-navy";

/**
 * The one enquiry form, used inline on the home and services pages and in the
 * enquiry modal everywhere else. Persona and services live in the enquiry
 * context, so any CTA on the page can pre-fill them.
 */
export function EnquiryForm() {
  const { persona, services, setPersona, toggleService } = useEnquiry();
  const [sent, setSent] = useState(false);
  const [currency, setCurrency] = useState<BudgetCurrency>("INR");
  /** Shared across currencies, so switching keeps the pick; null until one is made. */
  const [budgetTier, setBudgetTier] = useState<BudgetTierId | null>(null);
  const id = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();

    submitProjectInquiry(
      buildEnquiryPayload({
        email: field("email"),
        description: field("description"),
        persona,
        services,
        currency,
        budgetTier,
      }),
    );
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-card border border-line bg-surface p-6 shadow-card sm:p-8">
        <span className="grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <Icon name="check-circle" className="size-6" />
        </span>
        <h3 className="text-2xl font-bold tracking-tight text-navy">Almost there.</h3>
        <p className="max-w-md text-muted text-pretty">
          Your email app should now be open with your brief filled in. Hit send and we&apos;ll take it from there. If it
          didn&apos;t open, write to us at{" "}
          <a href={siteConfig.contact.href} className="font-semibold text-navy underline underline-offset-4">
            {siteConfig.contact.email}
          </a>
          .
        </p>
        <button type="button" onClick={() => setSent(false)} className={buttonStyles({ variant: "outline" })}>
          Edit my brief
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-card border border-line bg-surface p-6 shadow-card sm:p-8"
    >
      <fieldset>
        <legend className={labelClass}>I am a…</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {personaOptions.map((p) => (
            <label
              key={p.id}
              className={cn(
                "cursor-pointer rounded-xl border border-line px-3 py-2.5 text-center text-sm font-semibold transition-colors has-checked:border-cta",
                checkableToggleStyles,
              )}
            >
              <input
                type="radio"
                name="persona"
                value={p.id}
                checked={persona === p.id}
                onChange={() => setPersona(p.id)}
                className="sr-only"
              />
              {p.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelClass}>What do you need?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {serviceOptions.map((option) => (
            <label
              key={option.id}
              className={cn(
                "inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-sm font-semibold transition-colors has-checked:border-cta",
                checkableToggleStyles,
              )}
            >
              <input
                type="checkbox"
                name="services"
                value={option.id}
                checked={services.includes(option.id)}
                onChange={() => toggleService(option.id)}
                className="sr-only"
              />
              {services.includes(option.id) && <Icon name="check" className="size-3.5" />}
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor={`${id}-budget`} className={labelClass}>
            Budget range
          </label>
          <div
            role="radiogroup"
            aria-label="Budget currency"
            className="inline-flex rounded-full border border-line bg-surface p-0.5"
          >
            {budgetCurrencies.map((c) => (
              <label
                key={c}
                className={cn(
                  "cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-200",
                  checkableToggleStyles,
                )}
              >
                <input
                  type="radio"
                  name="currency"
                  value={c}
                  checked={currency === c}
                  onChange={() => setCurrency(c)}
                  className="sr-only"
                />
                {c}
              </label>
            ))}
          </div>
        </div>
        <select
          id={`${id}-budget`}
          name="budget"
          value={budgetTier ?? ""}
          onChange={(event) => setBudgetTier(event.target.value as BudgetTierId)}
          className={cn(inputClass, "h-11")}
        >
          <option value="" disabled>
            Select a range
          </option>
          {budgetTiers[currency].map((tier) => (
            <option key={tier.id} value={tier.id}>
              {tier.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-description`} className={labelClass}>
          Tell us about your project
        </label>
        <textarea
          id={`${id}-description`}
          name="description"
          rows={4}
          placeholder="What problem are you solving, and for whom?"
          className={cn(inputClass, "resize-y py-3")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-email`} className={labelClass}>
          Work email
          <span aria-hidden="true" className="ml-0.5 text-accent-hover">
            *
          </span>
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          className={cn(inputClass, "h-11")}
        />
      </div>

      <div className="border-t border-line pt-6">
        <button type="submit" className={cn(buttonStyles({ variant: "accent", size: "lg" }), "w-full cursor-pointer sm:w-auto")}>
          Book My Free Strategy Call
          <Icon name="arrow-right" className="size-4" />
        </button>
        <p className="mt-3 text-sm text-muted">
          Reply within 1 business day <span aria-hidden="true">·</span> NDA on request{" "}
          <span aria-hidden="true">·</span> Your details are never shared
        </p>
      </div>
    </form>
  );
}
