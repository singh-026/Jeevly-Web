import Link from "next/link";
import { Artwork } from "@/components/ui/artwork";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Container } from "@/components/ui/section";
import { StarRating } from "@/components/ui/star-rating";
import { StatBadge } from "@/components/ui/stat-badge";
import { productsPath } from "../routes";
import type { Product } from "../types";
import { AudienceBadge } from "./audience-badge";

export function ProductHero({ product }: { product: Product }) {
  return (
    <section aria-labelledby="product-title" className="border-b border-line bg-surface pt-8 pb-16 sm:pb-20">
      <Container>
        <Link
          href={productsPath}
          className="inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-navy hover:underline"
        >
          <Icon name="arrow-left" className="size-4" />
          All products
        </Link>
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 id="product-title" className="text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <AudienceBadge audience={product.audience} />
              <p className="text-lg text-ink sm:text-xl">{product.tagline}</p>
            </div>
            <p className="mt-6 max-w-xl text-muted">{product.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={product.cta.href} variant="accent" size="lg">
                <Icon name={product.cta.href.startsWith("mailto:") ? "mail" : "download"} />
                {product.cta.label}
              </ButtonLink>
              {(product.video.youtubeId || product.video.src) && (
                <ButtonLink href="#demo" variant="outline" size="lg">
                  <Icon name="play" className="size-4" />
                  Watch the demo
                </ButtonLink>
              )}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <StatBadge
                value={product.stat.value}
                label={product.stat.label}
                icon={product.stat.label === "downloads" ? "download" : "users"}
              />
              <StarRating value={product.rating.value} count={product.rating.count} />
              <span className="text-sm text-muted">{product.rating.count.toLocaleString("en")} reviews</span>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-card shadow-card-hover">
            <Artwork media={product.media} seed={product.slug} variant="screen" priority sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>
      </Container>
    </section>
  );
}
