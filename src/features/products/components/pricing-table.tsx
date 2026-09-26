import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { PricingTier } from "../types";

export function PricingTable({ tiers }: { tiers: PricingTier[] }) {
  return (
    <ul className={cn("grid gap-6", tiers.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:max-w-4xl")}>
      {tiers.map((tier) => (
        <li
          key={tier.name}
          className={cn(
            "flex flex-col rounded-card border bg-surface p-6 sm:p-8",
            tier.highlighted ? "border-accent shadow-card-hover ring-1 ring-accent" : "border-line",
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-navy">{tier.name}</h3>
            {tier.highlighted && <Badge tone="accent">Most popular</Badge>}
          </div>
          <p className="mt-4">
            <span className="text-4xl font-bold text-navy">{tier.price}</span>
            {tier.period && <span className="text-sm text-muted"> / {tier.period}</span>}
          </p>
          <p className="mt-2 text-sm text-muted">{tier.description}</p>
          <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-ink">
                <Icon name="check" className="mt-0.5 size-4 shrink-0 text-navy" />
                {feature}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
