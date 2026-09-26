/**
 * Site-wide settings. Anything that appears in more than one place
 * (brand name, primary routes, contact channel) lives here.
 */
export const siteConfig = {
  name: "Jeevly",
  tagline: "Software that works, and the marketing that gets it seen.",
  description:
    "Jeevly builds software and marketing for businesses, and makes products for everyone.",
  url: "https://jeevly.com",
  contact: {
    email: "hello@jeevly.com",
    href: "mailto:hello@jeevly.com?subject=Hello%20Jeevly",
  },
  /** The two sections shown in the header's segmented toggle. */
  sections: [
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
  ],
  secondaryNav: [{ label: "About Us", href: "/about" }],
} as const;

export type SiteSection = (typeof siteConfig.sections)[number];
