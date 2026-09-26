"use client";

import { cn } from "@/lib/cn";

export type FilterOption<T extends string> = { value: T; label: string; count?: number };

type FilterChipsProps<T extends string> = {
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name for the group, e.g. "Filter case studies". */
  label: string;
  className?: string;
};

/** Single-select chip group built from native toggle buttons (aria-pressed). */
export function FilterChips<T extends string>({ options, value, onChange, label, className }: FilterChipsProps<T>) {
  return (
    <div role="group" aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              active
                ? "border-accent bg-accent text-on-accent"
                : "border-line bg-surface text-navy hover:border-navy/30 hover:bg-navy-50",
            )}
          >
            {option.label}
            {option.count !== undefined && (
              <span
                aria-hidden="true"
                className={cn("rounded-full px-1.5 text-xs", active ? "bg-navy/10" : "bg-navy-50 text-navy-700")}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
