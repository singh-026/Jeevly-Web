import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { ServiceOffering } from "../types";
import { EnquiryButton } from "@/features/contact/components/enquiry-context";

export function ServiceCard({ offering }: { offering: ServiceOffering }) {
  const headingId = `service-${offering.id}`;

  return (
    <article
      aria-labelledby={headingId}
      className="flex h-full flex-col rounded-card border border-line bg-surface p-6 shadow-card sm:p-8"
    >
      <span className="grid size-12 place-items-center rounded-2xl bg-navy text-white">
        <Icon name={offering.icon} className="size-6" />
      </span>
      <h3 id={headingId} className="mt-5 text-2xl font-bold tracking-tight text-navy">
        {offering.title}
      </h3>
      <p className="mt-2 text-lg text-pretty text-muted">{offering.promise}</p>

      <p className="mt-6 text-sm font-semibold tracking-wide text-navy uppercase">What&apos;s included</p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {offering.deliverables.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-ink">
            <Icon name="check" className="mt-1 size-4 shrink-0 text-accent-hover" />
            {item}
          </li>
        ))}
      </ul>

      <ul aria-label={`${offering.title} tools`} className="mt-6 flex flex-wrap gap-1.5">
        {offering.stack.map((tool) => (
          <li key={tool} className="rounded-md bg-navy-50 px-2 py-1 font-mono text-xs font-medium text-navy">
            {tool}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <p className="flex items-start gap-2 border-t border-line pt-5 font-semibold text-navy">
          <Icon name="trending-up" className="mt-0.5 size-5 shrink-0 text-accent-hover" />
          {offering.outcome}
        </p>
        <EnquiryButton
          service={offering.leadService}
          aria-label={`Discuss ${offering.title}`}
          className={cn(buttonStyles({ variant: "outline" }), "mt-5 cursor-pointer")}
        >
          Discuss This Service
          <Icon name="arrow-right" className="size-4" />
        </EnquiryButton>
      </div>
    </article>
  );
}
