import type { ReactNode } from "react";
import { artworkTones } from "@/components/ui/artwork";
import { ButtonLink } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { Container } from "@/components/ui/section";
import { productsPath } from "@/features/products/routes";
import type { ProductSummary } from "@/features/products/types";
import { cn } from "@/lib/cn";
import { serviceHighlights } from "../data/home";

/** The two ways in: hire us (Services) or use what we make (Products). */
export function DoorCards({ products }: { products: ProductSummary[] }) {
  return (
    <section aria-label="Services and products">
      <Container className="grid gap-6 lg:grid-cols-2">
        <DoorCard
          id="door-services"
          title="Services"
          description="End-to-end product development and marketing support for businesses of all sizes."
          items={serviceHighlights}
          href="/services"
          className="bg-gradient-to-br from-navy-700 to-navy text-white"
          art={<CodeArt />}
        />
        <DoorCard
          id="door-products"
          title="Products"
          description="Apps and tools built by Jeevly to solve real problems for everyone."
          href={productsPath}
          className="bg-[linear-gradient(135deg,#FF5C28_0%,#FF9B6D_45%,#FFF0E6_100%)] text-white"
          art={<PhoneArt products={products} />}
        />
      </Container>
    </section>
  );
}

type DoorCardProps = {
  id: string;
  title: string;
  description: string;
  items?: { icon: IconName; label: string }[];
  href: string;
  className: string;
  art: ReactNode;
};

function DoorCard({ id, title, description, items, href, className, art }: DoorCardProps) {
  return (
    <article aria-labelledby={id} className={cn("relative overflow-hidden rounded-3xl p-8 shadow-card sm:p-10", className)}>
      <div className="relative z-10 sm:max-w-[55%]">
        <h2 id={id} className="text-3xl font-bold tracking-tight">
          {title}
        </h2>
        <p className="mt-3 text-white/85 text-pretty">{description}</p>
        {items && (
          <ul className="mt-6 flex flex-col gap-3.5 text-sm">
            {items.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <Icon name={item.icon} className="size-4.5 text-white/90" />
                {item.label}
              </li>
            ))}
          </ul>
        )}
        <ButtonLink href={href} variant="outline" className="mt-8 border-transparent">
          Explore {title}
          <Icon name="arrow-right" className="size-4" />
        </ButtonLink>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] sm:block">
        {art}
      </div>
    </article>
  );
}

const codeLines = [
  [30, 45],
  [45, 25, 20],
  [20, 50],
  [55, 20],
  [35, 30, 15],
  [25, 40],
  [50, 25],
  [30, 20, 25],
];
const codeColors = ["bg-sky-400", "bg-accent", "bg-emerald-400", "bg-violet-400", "bg-white/40"];

function CodeArt() {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-[12%] -right-[8%] w-[88%] -rotate-3 rounded-xl border border-white/10 bg-[#12162e] p-4 shadow-2xl">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-rose-400" />
          <span className="size-2 rounded-full bg-amber-400" />
          <span className="size-2 rounded-full bg-emerald-400" />
        </div>
        <div className="mt-4 flex flex-col gap-2.5">
          {codeLines.map((line, i) => (
            <div key={i} className="flex gap-1.5" style={{ paddingLeft: `${(i % 3) * 10}%` }}>
              {line.map((w, j) => (
                <span key={j} className={cn("h-1.5 rounded-full", codeColors[(i + j) % codeColors.length])} style={{ width: `${w}%` }} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-[40%] left-[4%] grid size-20 -rotate-6 place-items-center rounded-2xl bg-white text-navy shadow-2xl">
        <Icon name="pen" className="size-9" />
      </div>
      <div className="absolute bottom-[14%] left-[26%] grid size-24 rotate-6 place-items-center rounded-3xl bg-gradient-to-br from-white to-violet-200 text-violet-600 shadow-2xl">
        <Icon name="code" className="size-11" strokeWidth={2.25} />
      </div>
    </div>
  );
}

function PhoneArt({ products }: { products: ProductSummary[] }) {
  return (
    <div className="absolute top-[8%] -right-[6%] w-[80%] rotate-6 rounded-[2.5rem] bg-navy p-2 shadow-2xl">
      <div className="flex min-h-[26rem] flex-col gap-3 rounded-[2rem] bg-white px-4 pt-12 pb-6">
        {products.map((product) => (
          <div key={product.slug} className="flex items-center gap-3 rounded-xl bg-navy-50/60 p-2.5">
            <span
              className="grid size-10 shrink-0 place-items-center rounded-xl text-white"
              style={{ background: artworkTones[product.media.tone].to }}
            >
              <Icon name={product.icon} className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-navy">{product.name}</span>
              <span className="block truncate text-xs text-muted">{product.tagline}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
