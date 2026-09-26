import type { Product } from "../types";

/**
 * Monogram tiles stand in for partner logos. To use real logos, add a
 * `logo` path to each integration and render it with next/image here.
 */
export function IntegrationsList({ integrations }: { integrations: Product["integrations"] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {integrations.map((integration) => (
        <li
          key={integration.name}
          className="flex flex-col items-center gap-3 rounded-card border border-line bg-surface p-5 text-center"
        >
          <span
            aria-hidden="true"
            className="grid size-12 place-items-center rounded-xl bg-navy-50 text-lg font-bold text-navy"
          >
            {integration.name.slice(0, 1)}
          </span>
          <span>
            <span className="block text-sm font-semibold text-navy">{integration.name}</span>
            <span className="block text-xs text-muted">{integration.category}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
