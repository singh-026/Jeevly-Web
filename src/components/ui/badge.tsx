import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "navy" | "accent" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-navy-50 text-navy",
  navy: "bg-navy text-white",
  accent: "bg-accent-soft text-navy ring-1 ring-accent/40",
  outline: "border border-line bg-surface text-ink",
};

type BadgeProps = {
  children: ReactNode;
  tone?: Tone;
  className?: string;
};

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
