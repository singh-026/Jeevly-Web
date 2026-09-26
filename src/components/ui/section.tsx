import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Horizontal page gutter + max width. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

type SectionProps = ComponentProps<"section"> & { tone?: "canvas" | "surface" | "navy" };

const tones = {
  canvas: "bg-canvas",
  surface: "bg-surface",
  navy: "bg-navy text-white",
};

/** A full-width page band with consistent vertical rhythm. */
export function Section({ tone = "canvas", className, children, ...props }: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-24", tones[tone], className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}

type SectionHeaderProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Heading level; pages own their single h1. */
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold tracking-wide text-muted uppercase">{eyebrow}</p>
      )}
      <Heading
        id={id}
        className={cn(
          "font-bold tracking-tight text-navy text-balance",
          Heading === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl",
        )}
      >
        {title}
      </Heading>
      {description && <p className="mt-4 text-lg text-muted text-pretty">{description}</p>}
    </header>
  );
}
