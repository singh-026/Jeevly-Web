"use client";

import { useId, useState, type FormEvent } from "react";
import { buttonStyles } from "@/components/ui/button";
import { checkableToggleStyles } from "@/components/ui/toggle";
import { Icon } from "@/components/ui/icon";
import { ApiError } from "@/lib/api-client";
import { cn } from "@/lib/cn";
import { buildEnquiryPayload, enquiryFallbackHrefs, submitEnquiry } from "../submit-inquiry";
import { budgetCurrencies, budgetTiers, personaOptions, serviceOptions } from "../data/enquiry";
import type { BudgetCurrency, BudgetTierId } from "../types";
import { useEnquiry } from "./enquiry-context";

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-3.5 text-ink transition-colors placeholder:text-muted hover:border-navy/30 user-invalid:border-rose-500 disabled:opacity-60";

const labelClass = "text-sm font-semibold text-navy";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; email: string; reference: string }
  /** `fallback` links carry the brief, so it isn't lost when the API is down. */
  | { state: "error"; message: string; fallback: { gmail: string; whatsapp: string } };

/** Visitor-facing wording for a failed send; the raw error goes to the console. */
function failureMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.field === "contact.email") return "That email address doesn't look right. Please check it and try again.";
    if (error.code === "validation_failed") return `Something in the form needs a second look: ${error.message}`;
    if (error.status === 429) return "You've sent a few briefs in a short time. Please wait a little, or reach us directly below.";
  }
  return "We couldn't send your brief just now. Please try again, or reach us directly below.";
}

/**
 * The one enquiry form, used inline on the home and services pages and in the
 * enquiry modal everywhere else. Persona and services live in the enquiry
 * context, so any CTA on the page can pre-fill them.
 */
export function EnquiryForm() {
  const { persona, services, setPersona, toggleService } = useEnquiry();
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [currency, setCurrency] = useState<BudgetCurrency>("INR");
  /** Shared across currencies, so switching keeps the pick; null until one is made. */
  const [budgetTier, setBudgetTier] = useState<BudgetTierId | null>(null);
  const id = useId();
  const submitting = status.state === "submitting";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "");

    const payload = buildEnquiryPayload({
      email: field("email"),
      description: field("description"),
      persona,
      services,
      currency,
      budgetTier,
      website: field("website"),
    });

    setStatus({ state: "submitting" });
    try {
      const created = await submitEnquiry(payload);
      setStatus({ state: "success", email: payload.contact.email, reference: created.id });
    } catch (error) {
      console.error("Enquiry submission failed", error);
      setStatus({ state: "error", message: failureMessage(error), fallback: enquiryFallbackHrefs(payload) });
    }
  }

  if (status.state === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-card border border-line bg-surface p-6 shadow-card sm:p-8">
        <span className="grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <Icon name="check-circle" className="size-6" />
        </span>
        <h3 className="text-2xl font-bold tracking-tight text-navy">Brief received. Thank you!</h3>
        <p className="max-w-md text-muted text-pretty">
          A senior engineer will read it and reply to <span className="font-semibold text-navy">{status.email}</span>{" "}
          within one business day.
        </p>
        <p className="text-sm text-muted">
          Reference: <span className="font-mono text-navy">{status.reference}</span>
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className={cn(buttonStyles({ variant: "outline" }), "cursor-pointer")}
        >
          Send another brief
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={submitting}
      className="flex flex-col gap-6 rounded-card border border-line bg-surface p-6 shadow-card sm:p-8"
    >
      {/* `contents` keeps the form's flex layout; `disabled` locks every field while sending. */}
      <fieldset disabled={submitting} className="contents">
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

      {/* Honeypot: hidden from people and assistive tech, so only bots fill it in. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      </fieldset>

      {status.state === "error" && (
        <div role="alert" className="flex gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
          <Icon name="alert-circle" className="mt-0.5 size-5 shrink-0 text-rose-600" />
          <div className="flex flex-col gap-2">
            <p>{status.message}</p>
            <p className="flex flex-wrap gap-x-4 gap-y-1 font-semibold">
              <a
                href={status.fallback.gmail}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                Send via Gmail
              </a>
              <a
                href={status.fallback.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                Chat on WhatsApp
              </a>
            </p>
          </div>
        </div>
      )}

      <div className="border-t border-line pt-6">
        <button
          type="submit"
          disabled={submitting}
          className={cn(buttonStyles({ variant: "accent", size: "lg" }), "w-full cursor-pointer sm:w-auto")}
        >
          {submitting ? (
            <>
              <Icon name="loader" className="size-4 motion-safe:animate-spin" />
              Sending your brief…
            </>
          ) : (
            <>
              {status.state === "error" ? "Try Again" : "Book My Free Strategy Call"}
              <Icon name="arrow-right" className="size-4" />
            </>
          )}
        </button>
        <p className="mt-3 text-sm text-muted">
          Reply within 1 business day <span aria-hidden="true">·</span> NDA on request{" "}
          <span aria-hidden="true">·</span> Your details are never shared
        </p>
      </div>
    </form>
  );
}
