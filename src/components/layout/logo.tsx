import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn("flex items-center gap-2 rounded-md", className)}
    >
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill={inverted ? "#ffffff" : "#1a1f3c"} />
        <path d="M19 8v11a5 5 0 0 1-10 0" fill="none" stroke="#f97316" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
      <span className={cn("hidden text-lg font-bold tracking-tight sm:inline", inverted ? "text-white" : "text-navy")}>
        {siteConfig.name}
      </span>
    </Link>
  );
}
