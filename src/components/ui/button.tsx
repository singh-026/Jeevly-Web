import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "accent" | "primary" | "outline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  accent: "bg-cta text-on-cta hover:bg-cta-hover",
  primary: "bg-navy text-white hover:bg-navy-700",
  outline: "border border-navy/20 bg-surface text-navy hover:border-navy/40 hover:bg-navy-50",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

type StyleProps = { variant?: Variant; size?: Size };

export function buttonStyles({ variant = "primary", size = "md" }: StyleProps = {}) {
  return cn(base, variants[variant], sizes[size]);
}

type ButtonLinkProps = Omit<ComponentProps<"a">, "href"> & StyleProps & { href: string };

/**
 * A link styled as a button. Internal routes ("/…") use next/link for
 * client-side navigation; anchors, mailto: and external URLs use a plain <a>.
 */
export function ButtonLink({ variant, size, className, href, ...props }: ButtonLinkProps) {
  const classes = cn(buttonStyles({ variant, size }), className);
  if (href.startsWith("/")) {
    return <Link href={href} className={classes} {...props} />;
  }
  return <a href={href} className={classes} {...props} />;
}
