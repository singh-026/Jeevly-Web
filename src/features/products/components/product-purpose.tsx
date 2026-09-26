import { Icon } from "@/components/ui/icon";
import { Section, SectionHeader } from "@/components/ui/section";
import type { Product } from "../types";

export function ProductPurpose({ product }: { product: Product }) {
  const { problem, solution, outcomes } = product.purpose;

  return (
    <Section aria-labelledby="purpose-title">
      <SectionHeader id="purpose-title" eyebrow="Why it exists" title="What this product is for" />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
          <p className="text-sm font-semibold tracking-wide text-muted uppercase">The problem</p>
          <p className="mt-3 text-lg text-ink">{problem}</p>
        </div>
        <div className="rounded-card bg-navy p-6 text-white sm:p-8">
          <p className="text-sm font-semibold tracking-wide text-white/80 uppercase">How {product.name} solves it</p>
          <p className="mt-3 text-lg">{solution}</p>
        </div>
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {outcomes.map((outcome) => (
          <li key={outcome} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-navy">
              <Icon name="check" className="size-4" />
            </span>
            <span className="font-medium text-ink">{outcome}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
