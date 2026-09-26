import type { Product } from "../types";

export function HowToUse({ steps }: { steps: Product["steps"] }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.title} className="relative rounded-card border border-line bg-surface p-6">
          <span
            aria-hidden="true"
            className="grid size-10 place-items-center rounded-full bg-navy text-base font-bold text-white"
          >
            {i + 1}
          </span>
          <h3 className="mt-4 font-semibold text-navy">
            <span className="sr-only">Step {i + 1}: </span>
            {step.title}
          </h3>
          <p className="mt-2 text-sm text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
