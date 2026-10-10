import Link from "next/link";
import { Artwork } from "@/components/ui/artwork";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { productHref } from "@/features/products/routes";
import type { Product, ProductSummary } from "@/features/products/types";
import { formatCompact } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { FrameworkStage } from "../types";
import { EnquiryButton } from "@/features/contact/components/enquiry-context";

/** The idea-to-market stages; the first is the entry offer and is highlighted. */
export function FrameworkStages({ stages }: { stages: FrameworkStage[] }) {
  return (
    <div>
      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, index) => {
          const entry = index === 0;
          return (
            <li
              key={stage.name}
              className={cn(
                "flex flex-col rounded-card border bg-surface p-6 shadow-card",
                entry ? "border-accent ring-1 ring-accent" : "border-line",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="grid size-9 place-items-center rounded-full bg-navy text-sm font-bold text-white">
                  {index + 1}
                </span>
                {entry && <Badge tone="accent">Start here</Badge>}
              </div>
              <h3 className="mt-4 text-xl font-bold text-navy">{stage.name}</h3>
              <p className="text-sm text-muted">{stage.duration}</p>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-ink">
                {stage.activities.map((activity) => (
                  <li key={activity} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-navy/40" />
                    {activity}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-semibold text-navy">
                <span className="font-normal text-muted">Output: </span>
                {stage.output}
              </p>
              {stage.gate && (
                <div className="mt-auto pt-5">
                  <p className="flex items-center gap-2 border-t border-dashed border-line pt-4 text-sm text-navy">
                    <span aria-hidden="true" className="size-3 shrink-0 rotate-45 border border-navy/50 bg-navy-50" />
                    <span>
                      <span className="font-semibold">Gate:</span> {stage.gate}
                    </span>
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-sm text-muted">
        Every stage ends at a decision gate, so you only fund what users have proven.
      </p>
    </div>
  );
}

type IncubationSpotlightProps = {
  product: Product;
  others: ProductSummary[];
  reasons: { title: string; description: string }[];
};

/** Jeevly's own product, shown as proof the framework works. */
export function IncubationSpotlight({ product, others, reasons }: IncubationSpotlightProps) {
  const platforms = product.specs.find((spec) => spec.label === "Platforms")?.value;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <article
        aria-labelledby="spotlight-title"
        className="grid overflow-hidden rounded-card border border-line bg-surface shadow-card md:grid-cols-[1fr_1.2fr]"
      >
        <div className="grid place-items-center bg-navy-50 p-6">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl shadow-card">
            <Artwork media={product.media} seed={product.slug} variant="screen" sizes="(min-width: 1024px) 25vw, 100vw" />
          </div>
        </div>
        <div className="flex flex-col p-6 sm:p-8">
          <Badge tone="navy" className="self-start">
            <Icon name="sparkles" className="size-3.5 text-accent" />
            Built in-house
          </Badge>
          <h3 id="spotlight-title" className="mt-4 text-2xl font-bold tracking-tight text-balance text-navy">
            We build our own products the same way we&apos;d build yours.
          </h3>
          <p className="mt-3 text-muted text-pretty">
            <span className="font-semibold text-navy">{product.name}</span> went through the same four stages.{" "}
            {product.purpose.problem} {product.purpose.solution}
          </p>
          <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-line py-4 text-center">
            <Metric value={`${formatCompact(product.stat.value)}+`} label={product.stat.label} />
            <Metric value={`${product.rating.value}★`} label={`${formatCompact(product.rating.count)} ratings`} />
            {platforms && <Metric value={String(platforms.split(",").length)} label="platforms" />}
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={productHref(product.slug)} className={buttonStyles({ variant: "primary" })}>
              See how {product.name} works
            </Link>
            <EnquiryButton service="build" className={cn(buttonStyles({ variant: "outline" }), "cursor-pointer")}>
              Build something like this
            </EnquiryButton>
          </div>
        </div>
      </article>

      <div className="flex flex-col gap-6 rounded-card bg-navy p-6 text-white sm:p-8">
        <h3 className="text-xl font-bold">Why we incubate our own products</h3>
        <ul className="flex flex-col gap-5">
          {reasons.map((reason) => (
            <li key={reason.title}>
              <p className="font-semibold">{reason.title}</p>
              <p className="mt-1 text-sm text-white/75">{reason.description}</p>
            </li>
          ))}
        </ul>
        <div className="mt-auto border-t border-white/15 pt-5">
          <p className="text-sm font-semibold text-white/75">More from the Jeevly lab</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={productHref(other.slug)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/20"
                >
                  <Icon name={other.icon} className="size-3.5" />
                  {other.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <dt className="order-2 text-xs text-muted">{label}</dt>
      <dd className="order-1 text-xl font-extrabold text-navy tabular-nums">{value}</dd>
    </div>
  );
}
