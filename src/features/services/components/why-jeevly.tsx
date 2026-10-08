import { Icon } from "@/components/ui/icon";
import type { Differentiator } from "../types";

export function Differentiators({ items }: { items: Differentiator[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.title} className="flex flex-col rounded-card border border-line bg-surface p-6 shadow-card">
          <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent-hover">
            <Icon name={item.icon} className="size-5" />
          </span>
          <p className="mt-5 text-sm font-semibold tracking-wide text-muted uppercase">{item.title}</p>
          <h3 className="mt-1 text-lg font-bold text-navy">{item.headline}</h3>
          <p className="mt-2 text-sm text-ink text-pretty">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
