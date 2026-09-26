"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type TabItem = {
  id: string;
  label: ReactNode;
  panel: ReactNode;
};

type TabsProps = {
  items: TabItem[];
  /** Accessible name for the tab list. */
  label: string;
  defaultId?: string;
  className?: string;
  listClassName?: string;
};

/**
 * WAI-ARIA tabs with automatic activation: arrow keys move and select,
 * Home/End jump to the ends. Inactive panels stay in the DOM (hidden) so
 * their content is still server-rendered and indexable.
 */
export function Tabs({ items, label, defaultId, className, listClassName }: TabsProps) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(defaultId ?? items[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = items.length - 1;
    const next = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActiveId(items[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        className={cn("inline-flex w-full rounded-full border border-line bg-surface p-1 sm:w-auto", listClassName)}
      >
        {items.map((item, index) => {
          const selected = item.id === activeId;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "flex-1 rounded-full px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors sm:flex-none sm:px-7 sm:text-base",
                selected ? "bg-accent text-on-accent shadow-sm" : "text-navy hover:bg-navy-50",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== activeId}
          tabIndex={0}
          className="mt-8 rounded-card"
        >
          {item.panel}
        </div>
      ))}
    </div>
  );
}
