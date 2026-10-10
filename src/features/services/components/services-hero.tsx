import { Artwork } from "@/components/ui/artwork";
import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Container } from "@/components/ui/section";
import type { CaseStudy } from "@/features/portfolio/types";
import type { Product } from "@/features/products/types";
import { formatCompact } from "@/lib/format";
import { cn } from "@/lib/cn";
import { EnquiryButton } from "@/features/contact/components/enquiry-context";

type ServicesHeroProps = {
  /** Headline proof: one client outcome and, when there is one, an in-house product. */
  study: CaseStudy;
  metric: string;
  product?: Product;
};

export function ServicesHero({ study, metric, product }: ServicesHeroProps) {
  return (
    <section aria-labelledby="services-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute -top-48 -right-48 size-[40rem] rounded-full bg-accent-soft/70" />
      <Container className="relative grid items-center gap-12 pt-10 pb-16 lg:grid-cols-[7fr_5fr] lg:pt-16 lg:pb-20">
        <div>
          <p className="text-sm font-semibold tracking-wider text-navy uppercase">
            Services for growing businesses and first-time founders
          </p>
          <h1
            id="services-title"
            className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-navy sm:text-5xl lg:text-[3.5rem]"
          >
            Your product team, from first idea to <span className="text-accent-hover">scale.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-pretty text-muted sm:text-xl">
            Jeevly designs, builds and grows web and mobile products for small and medium businesses and solo
            founders. Senior engineers, fixed-scope pricing, and a launch plan built alongside the code.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <EnquiryButton className={cn(buttonStyles({ variant: "accent", size: "lg" }), "cursor-pointer shadow-float")}>
              Book a Free Strategy Call
              <Icon name="arrow-right" className="size-4" />
            </EnquiryButton>
            <a href="#services" className={buttonStyles({ variant: "outline", size: "lg" })}>
              Explore Our Services
            </a>
          </div>
          <p className="mt-4 text-sm text-muted">
            30-minute call <span aria-hidden="true">·</span> No sales pitch <span aria-hidden="true">·</span> NDA on
            request
          </p>
        </div>

        <aside aria-label="Proof of work" className="rounded-card border border-line bg-surface p-3 shadow-card-hover">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-navy-50">
            <Artwork media={study.media} seed={study.slug} variant="screen" priority />
          </div>
          <div className="px-3 pt-5 pb-3">
            <p className="text-sm font-semibold text-muted">{study.client}</p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight text-navy">{metric}</p>
            <p className="mt-1 text-sm text-ink">{study.project}</p>
            {product && (
              <p className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-sm text-ink">
                <Icon name={product.icon} className="size-4 shrink-0 text-accent-hover" />
                <span>
                  Also built in-house: <span className="font-semibold text-navy">{product.name}</span>,{" "}
                  {formatCompact(product.stat.value)}+ {product.stat.label}
                </span>
              </p>
            )}
          </div>
        </aside>
      </Container>
    </section>
  );
}
