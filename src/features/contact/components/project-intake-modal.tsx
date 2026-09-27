"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { submitProjectInquiry } from "../api";
import { countryCodes, intakeCopy, trustedBrands } from "../data/intake";

export type Captcha = [number, number];

type ProjectIntakeModalProps = {
  open: boolean;
  /** A new session id remounts the form, so every open starts clean. */
  session: { id: number; captcha: Captcha } | null;
  onClose: () => void;
};

/**
 * Built on the native <dialog>: showModal() gives us the focus trap, ESC to
 * close, an inert page behind and the ::backdrop for free.
 */
export function ProjectIntakeModal({ open, session, onClose }: ProjectIntakeModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  // Only a press that starts *and* ends on the backdrop closes the dialog, so
  // selecting text in a field and releasing outside it doesn't.
  const pressStartedOnBackdrop = useRef(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby="intake-title"
      onClose={onClose}
      onPointerDown={(e) => (pressStartedOnBackdrop.current = e.target === e.currentTarget)}
      onClick={(e) => {
        if (pressStartedOnBackdrop.current && e.target === e.currentTarget) close();
      }}
      className={cn(
        "m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto overscroll-contain rounded-3xl bg-surface p-0 text-ink shadow-2xl",
        "backdrop:bg-navy/60 backdrop:backdrop-blur-sm",
        // Fade and scale in/out; `transition-discrete` keeps it visible while closing.
        "scale-95 opacity-0 transition-[opacity,scale,display,overlay] transition-discrete duration-200 ease-out",
        "open:scale-100 open:opacity-100 starting:open:scale-95 starting:open:opacity-0 motion-reduce:transition-none",
      )}
    >
      {session && <IntakePanel key={session.id} captcha={session.captcha} onDismiss={close} />}
    </dialog>
  );
}

function IntakePanel({ captcha, onDismiss }: { captcha: Captcha; onDismiss: () => void }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="relative">
      <div className="grid md:grid-cols-[2fr_3fr]">
        <aside className="relative overflow-hidden bg-navy px-6 pt-10 pb-8 text-white sm:px-10 md:py-12">
          <div aria-hidden="true" className="absolute -right-24 -bottom-24 size-72 rounded-full bg-white/[0.04]" />
          <div aria-hidden="true" className="absolute -top-20 -left-16 size-56 rounded-full bg-accent/10" />
          <div className="relative">
            <h2 id="intake-title" className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
              {intakeCopy.title}
            </h2>
            <p className="mt-4 text-lg font-medium text-white/90 text-pretty">{intakeCopy.subtitle}</p>
            <p className="mt-3 text-white/70 text-pretty">{intakeCopy.description}</p>
            <p className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
              <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-emerald-400" />
              {intakeCopy.trustBadge}
            </p>
          </div>
        </aside>

        <div className="px-6 py-8 sm:px-10 md:py-12">
          {sent ? <SentMessage onDismiss={onDismiss} /> : <IntakeForm captcha={captcha} onSent={() => setSent(true)} />}
        </div>
      </div>

      <TrustedBrands />

      {/* Last in DOM order so showModal() focuses the first field, not this. */}
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Close"
        className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-surface/90 text-navy shadow-card transition-colors hover:bg-navy-50"
      >
        <Icon name="close" className="size-5" />
      </button>
    </div>
  );
}

const inputClass =
  "rounded-xl border border-line bg-surface px-3.5 text-sm text-ink transition-colors placeholder:text-muted/70 hover:border-navy/30 user-invalid:border-rose-500";

function IntakeForm({ captcha, onSent }: { captcha: Captcha; onSent: () => void }) {
  const [a, b] = captcha;

  // Native constraint validation handles required/email/pattern; this only
  // runs once those pass.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? "").trim();

    const captchaInput = form.elements.namedItem("captcha") as HTMLInputElement;
    if (Number(field("captcha")) !== a + b) {
      captchaInput.setCustomValidity("That's not quite right. Please try again.");
      captchaInput.reportValidity();
      return;
    }

    submitProjectInquiry({
      name: field("name"),
      email: field("email"),
      phone: `${field("countryCode")} ${field("phone")}`,
      company: field("company"),
      description: field("description"),
      wantsMarketing: data.has("wantsMarketing"),
      wantsNda: data.has("wantsNda"),
    });
    onSent();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="intake-name">
          <input id="intake-name" name="name" type="text" autoComplete="name" className={cn(inputClass, "h-11 w-full")} />
        </Field>
        <Field label="Email" htmlFor="intake-email" required>
          <input
            id="intake-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={cn(inputClass, "h-11 w-full")}
          />
        </Field>
        <Field label="Contact Number" htmlFor="intake-phone" required>
          <div className="flex gap-2">
            <select
              name="countryCode"
              aria-label="Country code"
              defaultValue={countryCodes[0].code}
              autoComplete="tel-country-code"
              className={cn(inputClass, "h-11 shrink-0 pr-2 pl-3")}
            >
              {countryCodes.map((c) => (
                <option key={c.code} value={c.code} title={c.country}>
                  {c.code}
                </option>
              ))}
            </select>
            <input
              id="intake-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              required
              pattern="[0-9][0-9 \-]{5,15}"
              title="Digits only, spaces and dashes allowed."
              className={cn(inputClass, "h-11 min-w-0 flex-1")}
            />
          </div>
        </Field>
        <Field label="Company Name" htmlFor="intake-company">
          <input
            id="intake-company"
            name="company"
            type="text"
            autoComplete="organization"
            className={cn(inputClass, "h-11 w-full")}
          />
        </Field>
      </div>

      <Field
        label={
          <>
            Describe your project <span className="font-normal text-muted">(Help us come back better prepared)</span>
          </>
        }
        htmlFor="intake-description"
      >
        <textarea id="intake-description" name="description" rows={4} className={cn(inputClass, "w-full resize-y py-3")} />
      </Field>

      <div className="flex flex-col gap-3 text-sm text-ink">
        <Checkbox name="wantsMarketing">
          Looking for a marketing partner? Let our experts at Jeevly Digital reach out to you.
        </Checkbox>
        <Checkbox name="wantsNda" defaultChecked>
          Request NDA Before Sharing Detailed Requirements
        </Checkbox>
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <label htmlFor="intake-captcha" className="text-sm font-semibold whitespace-nowrap text-navy">
            <span className="sr-only">Security check: what is </span>
            {a} + {b} =
          </label>
          <input
            id="intake-captcha"
            name="captcha"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            required
            maxLength={2}
            onInput={(e) => e.currentTarget.setCustomValidity("")}
            className={cn(inputClass, "h-11 w-16 text-center")}
          />
        </div>
        <button type="submit" className={buttonStyles({ variant: "accent", size: "lg" })}>
          Submit
          <Icon name="arrow-right" className="size-4" />
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required = false,
  children,
}: {
  label: ReactNode;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-navy">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-accent-hover">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function Checkbox({ name, defaultChecked, children }: { name: string; defaultChecked?: boolean; children: ReactNode }) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-0.5 size-4 shrink-0 cursor-pointer accent-accent-hover"
      />
      <span className="text-pretty">{children}</span>
    </label>
  );
}

function SentMessage({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div role="status" className="flex h-full flex-col items-start justify-center gap-4 py-6">
      <span className="grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-600">
        <Icon name="check-circle" className="size-6" />
      </span>
      <h3 className="text-2xl font-bold tracking-tight text-navy">Almost there.</h3>
      <p className="max-w-md text-muted text-pretty">
        Your email app should now be open with your details filled in. Hit send and we&apos;ll take it from there. If
        it didn&apos;t open, write to us at{" "}
        <a href={siteConfig.contact.href} className="font-semibold text-navy underline underline-offset-4">
          {siteConfig.contact.email}
        </a>
        .
      </p>
      <button type="button" onClick={onDismiss} autoFocus className={cn(buttonStyles({ variant: "outline" }), "mt-2")}>
        Close
      </button>
    </div>
  );
}

function TrustedBrands() {
  return (
    <div className="border-t border-line bg-navy-50 px-6 py-6 sm:px-10">
      <p className="text-center text-xs font-semibold tracking-[0.2em] text-muted uppercase">Trusted by global brands</p>
      <div className="mt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        {/* Listed twice so the loop is seamless; the copy is hidden from assistive tech. */}
        <ul className="flex w-max hover:[animation-play-state:paused] motion-safe:animate-marquee motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-2">
          {[...trustedBrands, ...trustedBrands].map((brand, i) => {
            const copy = i >= trustedBrands.length;
            return (
              <li
                key={i}
                aria-hidden={copy || undefined}
                className={cn(
                  "px-6 text-lg font-bold tracking-tight whitespace-nowrap text-navy/45",
                  copy && "motion-reduce:hidden",
                )}
              >
                {brand}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
