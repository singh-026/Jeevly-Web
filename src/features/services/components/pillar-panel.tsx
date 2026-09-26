import { Icon } from "@/components/ui/icon";
import type { ServicePillar } from "../types";

export function PillarPanel({ pillar }: { pillar: ServicePillar }) {
  const headingId = `pillar-${pillar.id}`;

  return (
    <article
      aria-labelledby={headingId}
      className="flex h-full flex-col rounded-card border border-line bg-surface p-6 shadow-card sm:p-8 lg:p-10"
    >
      <span className="grid size-14 place-items-center rounded-2xl bg-navy text-white">
        <Icon name={pillar.icon} className="size-7" />
      </span>
      <h3 id={headingId} className="mt-6 text-2xl font-bold text-navy sm:text-3xl">
        {pillar.title}
      </h3>
      <p className="mt-3 text-base text-muted sm:text-lg">{pillar.description}</p>
      <ul aria-label={`${pillar.title} capabilities`} className="mt-8 flex flex-wrap gap-2">
        {pillar.capabilities.map((capability) => (
          <li
            key={capability.label}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-navy-50 px-3.5 py-2 text-sm font-medium text-navy"
          >
            <Icon name={capability.icon} className="size-4" />
            {capability.label}
          </li>
        ))}
      </ul>
    </article>
  );
}
