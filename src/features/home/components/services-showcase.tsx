"use client";

import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Tabs } from "@/components/ui/tabs";
import { EnquiryButton } from "@/features/contact/components/enquiry-context";
import type { ServiceOffering } from "@/features/services/types";
import { cn } from "@/lib/cn";

/**
 * "What we do" as one interactive showcase: tabs on large screens, an
 * accordion below that, where three long tab labels won't fit side by side.
 * Both render on the server; CSS shows the one that fits.
 */
export function ServicesShowcase({
  offerings,
}: {
  offerings: ServiceOffering[];
}) {
  return (
    <>
      <Tabs
        label="Our services"
        className="hidden lg:block"
        items={offerings.map((offering) => ({
          id: offering.id,
          label: (
            <span className="flex items-center gap-2">{offering.tabLabel}</span>
          ),
          panel: (
            <div className="rounded-card border border-line bg-surface p-10 shadow-card">
              <ServiceDetail offering={offering} />
            </div>
          ),
        }))}
      />

      <div className="flex flex-col gap-3 lg:hidden">
        {offerings.map((offering, index) => (
          // A shared `name` makes the group exclusive: opening one closes the rest.
          <details
            key={offering.id}
            name="services-showcase"
            open={index === 0}
            className="group rounded-card border border-line bg-surface shadow-card open:border-cta/40"
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 rounded-card p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-navy text-white transition-colors group-open:bg-cta">
                <Icon name={offering.icon} className="size-5" />
              </span>
              <span className="flex-1 text-lg font-bold text-navy">
                {offering.tabLabel}
              </span>
              <Icon
                name="chevron-right"
                className="size-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-90"
              />
            </summary>
            <div className="border-t border-line p-5 sm:p-6">
              <ServiceDetail offering={offering} compact />
            </div>
          </details>
        ))}
      </div>
    </>
  );
}

/** One service's deep dive. `compact` drops the title, which the accordion row already shows. */
function ServiceDetail({
  offering,
  compact = false,
}: {
  offering: ServiceOffering;
  compact?: boolean;
}) {
  return (
    <div className="grid gap-8 motion-safe:animate-fade-up lg:grid-cols-[1.2fr_1fr] lg:gap-12">
      <div className="flex flex-col">
        {!compact && (
          <>
            <span className="grid size-12 place-items-center rounded-2xl bg-navy text-white">
              <Icon name={offering.icon} className="size-6" />
            </span>
            <h3 className="mt-5 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              {offering.title}
            </h3>
          </>
        )}
        <p className={cn("text-lg text-pretty text-muted", !compact && "mt-3")}>
          {offering.promise}
        </p>
        <p className="mt-6 flex items-start gap-2 font-semibold text-navy">
          <Icon
            name="trending-up"
            className="mt-0.5 size-5 shrink-0 text-accent-hover"
          />
          {offering.outcome}
        </p>
        <div className="mt-auto pt-8">
          <EnquiryButton
            service={offering.leadService}
            aria-label={`Discuss ${offering.title}`}
            className={cn(
              buttonStyles({ variant: "accent", size: "lg" }),
              "cursor-pointer",
            )}
          >
            Discuss This Service
            <Icon name="arrow-right" className="size-4" />
          </EnquiryButton>
        </div>
      </div>

      <div className="flex flex-col gap-6 rounded-2xl bg-navy-50 p-6">
        <div>
          <p className="text-sm font-semibold tracking-wide text-navy uppercase">
            What&apos;s included
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {offering.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-ink">
                <Icon
                  name="check"
                  className="mt-1 size-4 shrink-0 text-accent-hover"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {offering.channels && (
          <div>
            <p className="text-sm font-semibold tracking-wide text-navy uppercase">
              Channels we activate
            </p>
            <ul className="mt-3 grid grid-cols-1 gap-2 min-[400px]:grid-cols-2">
              {offering.channels.map((channel) => (
                <li
                  key={channel.label}
                  className="flex items-center gap-3 rounded-xl border border-line bg-surface p-2 pr-3 transition duration-200 hover:-translate-y-0.5 hover:border-cta/40 hover:shadow-card"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-hover">
                    <Icon name={channel.icon} className="size-4.5" />
                  </span>
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="font-semibold text-navy">
                      {channel.label}
                    </span>
                    <span className="text-xs text-muted">{channel.hint}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
