import "server-only";
import { products } from "./data/products";
import type { Product, ProductSummary } from "./types";

/**
 * Data access for products. Pages import from here, never from ./data
 * directly, so swapping the static file for a CMS or database only touches
 * this module.
 */

export async function getProducts(): Promise<ProductSummary[]> {
  // Only ship card fields to the grid, not every product's full detail.
  return products.map(({ slug, name, tagline, audience, summary, media, stat, rating }) => ({
    slug,
    name,
    tagline,
    audience,
    summary,
    media,
    stat,
    rating,
  }));
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((product) => product.slug === slug);
}

export async function getProductSlugs(): Promise<string[]> {
  return products.map((product) => product.slug);
}
