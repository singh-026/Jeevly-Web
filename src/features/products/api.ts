import "server-only";
import { products as allProducts } from "./data/products";
import type { Product, ProductSummary } from "./types";

/**
 * Products are hidden for now. While this is false the site behaves as if the
 * backend returned none: no Products nav item, page or sections.
 */
const productsLive = false;
const products = productsLive ? allProducts : [];

/**
 * Data access for products. Pages import from here, never from ./data
 * directly, so swapping the static file for a CMS or database only touches
 * this module.
 */

export async function getProducts(): Promise<ProductSummary[]> {
  // Only ship card fields to the grid, not every product's full detail.
  return products.map(({ slug, name, tagline, audience, summary, media, icon, stat, rating }) => ({
    slug,
    name,
    tagline,
    audience,
    summary,
    media,
    icon,
    stat,
    rating,
  }));
}

/** False when the backend has no products; the Products nav item, page and sections are hidden then. */
export async function hasProducts(): Promise<boolean> {
  return products.length > 0;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((product) => product.slug === slug);
}

export async function getProductSlugs(): Promise<string[]> {
  return products.map((product) => product.slug);
}
