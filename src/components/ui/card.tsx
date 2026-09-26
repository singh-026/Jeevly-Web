import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Composable card used by every grid on the site (portfolio, products).
 *
 *   <Card interactive>
 *     <CardMedia>…</CardMedia>
 *     <CardBody>
 *       <CardTitle href="/x">Name</CardTitle>
 *       …
 *     </CardBody>
 *   </Card>
 *
 * When `CardTitle` has an `href`, its link is stretched over the whole card,
 * so the entire card is clickable while keyboard and screen-reader users get
 * a single, well-named link instead of a wall of link text.
 */
export function Card({
  interactive = false,
  className,
  ...props
}: ComponentProps<"article"> & { interactive?: boolean }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card",
        interactive &&
          "transition duration-200 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.01] hover:shadow-card-hover has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent",
        className,
      )}
      {...props}
    />
  );
}

export function CardMedia({ className, children, overlay }: { className?: string; children: ReactNode; overlay?: ReactNode }) {
  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden bg-navy-50", className)}>
      {children}
      {overlay && <div className="absolute inset-x-3 top-3 flex flex-wrap gap-2">{overlay}</div>}
    </div>
  );
}

export function CardBody({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-1 flex-col gap-3 p-5", className)} {...props} />;
}

type CardTitleProps = {
  children: ReactNode;
  href?: string;
  /** Accessible name for the link, e.g. "View Taskly details". */
  linkLabel?: string;
  className?: string;
};

export function CardTitle({ children, href, linkLabel, className }: CardTitleProps) {
  return (
    <h3 className={cn("text-lg font-semibold text-navy", className)}>
      {href ? (
        <Link href={href} aria-label={linkLabel} className="outline-none after:absolute after:inset-0 after:content-['']">
          {children}
        </Link>
      ) : (
        children
      )}
    </h3>
  );
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-sm text-muted", className)} {...props} />;
}
