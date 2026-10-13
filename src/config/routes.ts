/**
 * Every top-level page path in one place. Link to `routes.x` rather than a
 * string literal, so renaming a page is a one-line change.
 */
export const routes = {
  home: "/",
  services: "/services",
  products: "/products",
  about: "/about",
  privacy: "/privacy",
  terms: "/terms",
} as const;

/** Tells whether `pathname` is `href` or one of its descendants. */
export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
