import { cn } from "@/lib/cn";

/** Hand-drawn orange underline used beside handwritten notes. */
export function Swoosh({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 16" fill="none" aria-hidden="true" className={cn("text-accent", className)}>
      <path d="M3 12C35 4 80 2 117 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
