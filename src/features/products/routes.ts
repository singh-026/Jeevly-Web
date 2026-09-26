/** Single source of truth for product URLs. */
export const productsPath = "/products";

export function productHref(slug: string) {
  return `${productsPath}/${slug}`;
}
