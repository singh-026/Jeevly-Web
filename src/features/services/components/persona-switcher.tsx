"use client";

import { useEffect } from "react";
import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/cn";
import type { Persona, PersonaId } from "../types";
import { EnquiryButton, useEnquiry } from "@/features/contact/components/enquiry-context";

type PersonaSwitcherProps = {
  personas: Persona[];
  /** Case-study proof per persona, resolved on the server. */
  proof: Partial<Record<PersonaId, { client: string; outcome: string }>>;
};

/**
 * Two persona tabs. `/#for-founders` (or any persona's `hash`) opens
 * that tab, and switching tabs updates the hash so the view can be shared.
 */
export function PersonaSwitcher({ personas, proof }: PersonaSwitcherProps) {
  const { persona, setPersona } = useEnquiry();

  useEffect(() => {
    function openFromHash() {
      const match = personas.find((p) => `#${p.hash}` === window.location.hash);
      if (!match) return;
      setPersona(match.id);
      document.getElementById("who-we-help")?.scrollIntoView({ block: "start" });
    }
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [personas, setPersona]);

  return (
    <Tabs
      label="Who we help"
      activeId={persona}
      onActiveChange={(id) => {
        const next = personas.find((p) => p.id === id);
        if (!next) return;
        setPersona(next.id);
        history.replaceState(null, "", `#${next.hash}`);
      }}
      items={personas.map((p) => ({
        id: p.id,
        label: p.label,
        panel: <PersonaPanel persona={p} proof={proof[p.id]} />,
      }))}
    />
  );
}

function PersonaPanel({ persona, proof }: { persona: Persona; proof?: { client: string; outcome: string } }) {
  return (
    <div className="grid gap-8 rounded-card border border-line bg-surface p-6 shadow-card sm:p-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12 lg:p-10">
      <div>
        <h3 className="text-2xl font-bold tracking-tight text-balance text-navy sm:text-3xl">{persona.headline}</h3>
        <p className="mt-4 text-lg text-pretty text-muted">{persona.body}</p>

        <p className="mt-8 text-sm font-semibold tracking-wide text-navy uppercase">Sounds like you if</p>
        <ul className="mt-3 flex flex-col gap-3">
          {persona.fit.map((item) => (
            <li key={item} className="flex items-start gap-3 text-ink">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-navy text-white">
                <Icon name="check" className="size-3.5" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <EnquiryButton
          persona={persona.id}
          service={persona.cta.service}
          className={cn(buttonStyles({ variant: "accent", size: "lg" }), "mt-8 cursor-pointer")}
        >
          {persona.cta.label}
          <Icon name="arrow-right" className="size-4" />
        </EnquiryButton>
      </div>

      <div className="flex flex-col gap-6 rounded-2xl bg-navy-50 p-6">
        <div>
          <p className="text-sm font-semibold tracking-wide text-navy uppercase">What you get</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {persona.deliverables.map((item) => (
              <li key={item} className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-medium text-navy">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide text-navy uppercase">Typical engagement</p>
          <p className="mt-2 text-ink">{persona.engagement}</p>
        </div>
        {proof && (
          <div className="mt-auto border-t border-navy/10 pt-5">
            <p className="flex items-start gap-2 text-ink">
              <Icon name="target" className="mt-0.5 size-5 shrink-0 text-accent-hover" />
              <span>
                <span className="font-semibold text-navy">{proof.client}:</span> {proof.outcome}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
