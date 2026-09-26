"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { isActivePath } from "@/lib/format";

/** Plain text nav link that reflects the current route. */
export function NavLink({ href, className, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const active = isActivePath(usePathname(), href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-md px-1.5 py-1.5 text-sm font-semibold whitespace-nowrap underline-offset-8 sm:px-2 transition-colors",
        active ? "text-navy underline decoration-accent decoration-2" : "text-navy/80 hover:text-navy",
        className,
      )}
      {...props}
    />
  );
}
