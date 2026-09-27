import Link from "next/link";
import { artworkTones } from "@/components/ui/artwork";
import { Icon } from "@/components/ui/icon";
import { Container } from "@/components/ui/section";
import { productHref, productsPath } from "@/features/products/routes";
import type { ProductSummary } from "@/features/products/types";

export function FeaturedProducts({ products }: { products: ProductSummary[] }) {
  return (
    <section aria-labelledby="featured-title" className="pb-16 sm:pb-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="featured-title" className="text-3xl font-bold tracking-tight text-navy">
              Featured Products
            </h2>
            <p className="mt-2 text-muted">Tools we&apos;ve built to make everyday life simpler.</p>
          </div>
          <Link href={productsPath} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
            View all products
            <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.slug}>
              <Link
                href={productHref(product.slug)}
                className="group flex h-full gap-4 rounded-2xl border border-line/60 bg-surface p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <span
                  className="grid size-12 shrink-0 place-items-center rounded-xl text-white"
                  style={{ background: artworkTones[product.media.tone].to }}
                >
                  <Icon name={product.icon} className="size-6" />
                </span>
                <span className="flex flex-col">
                  <span className="text-lg font-bold text-navy">{product.name}</span>
                  <span className="mt-1 text-sm text-muted">{product.tagline}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-navy">
                    Learn more
                    <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
