import { routes } from "@/config/routes";

/** Single source of truth for product URLs. */
export const productsPath = routes.products;

export function productHref(slug: string) {
  return `${productsPath}/${slug}`;
}
