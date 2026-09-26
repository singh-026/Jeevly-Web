import { cn } from "@/lib/cn";
import { Icon } from "./icon";

type StarRatingProps = {
  value: number;
  max?: number;
  count?: number;
  className?: string;
};

/** Read-only star rating. Partial stars are drawn with a clipped overlay. */
export function StarRating({ value, max = 5, count, className }: StarRatingProps) {
  const label = `Rated ${value.toFixed(1)} out of ${max}${count ? ` from ${count.toLocaleString("en")} reviews` : ""}`;

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span role="img" aria-label={label} className="relative inline-flex">
        <span className="flex text-navy-100">
          {Array.from({ length: max }, (_, i) => (
            <Icon key={i} name="star" className="size-4 fill-current" />
          ))}
        </span>
        <span className="absolute inset-0 flex overflow-hidden text-accent" style={{ width: `${(value / max) * 100}%` }}>
          {Array.from({ length: max }, (_, i) => (
            <Icon key={i} name="star" className="size-4 shrink-0 fill-current" />
          ))}
        </span>
      </span>
      <span aria-hidden="true" className="text-sm font-semibold text-ink">
        {value.toFixed(1)}
      </span>
    </span>
  );
}
