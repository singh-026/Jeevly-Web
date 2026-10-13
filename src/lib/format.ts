const compact = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

/** 12500 -> "12.5K" */
export function formatCompact(value: number): string {
  return compact.format(value);
}
