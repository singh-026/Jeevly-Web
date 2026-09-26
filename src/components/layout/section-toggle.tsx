"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { isActivePath } from "@/lib/format";

/**
 * Segmented "Services | Products" switch. These are navigation links, not
 * tabs: the active option comes from the URL (so /products/foo keeps
 * "Products" lit) and is announced with aria-current.
 */
export function SectionToggle({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Site sections" className={className}>
      <ul className="flex items-center rounded-full border border-navy/15 bg-navy-50 p-1">
        {siteConfig.sections.map((section) => {
          const active = isActivePath(pathname, section.href);
          return (
            <li key={section.href}>
              <Link
                href={section.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block rounded-full px-2.5 py-1.5 text-sm font-semibold transition-colors sm:px-4",
                  active ? "bg-navy text-white shadow-sm" : "text-navy hover:bg-navy-100",
                )}
              >
                {section.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
