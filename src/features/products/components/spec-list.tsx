import type { Product } from "../types";

export function SpecList({ specs }: { specs: Product["specs"] }) {
  return (
    <dl className="divide-y divide-line rounded-card border border-line bg-surface">
      {specs.map((spec) => (
        <div key={spec.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4 sm:px-6">
          <dt className="text-sm font-semibold text-muted">{spec.label}</dt>
          <dd className="text-ink">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
