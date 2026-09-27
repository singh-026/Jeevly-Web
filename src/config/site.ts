/**
 * Site-wide settings. Anything that appears in more than one place
 * (brand name, primary routes, contact channel) lives here.
 */
const contactEmail = "hello@jeevly.com";

/** Builds a `mailto:` link to the site contact address, optionally with a subject line. */
export function mailtoHref(subject?: string) {
  return subject ? `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}` : `mailto:${contactEmail}`;
}

export const siteConfig = {
  name: "Jeevly",
  tagline: "Software products for a simpler, smarter life.",
  description:
    "From idea to launch, Jeevly designs, builds and grows digital products for businesses and individuals.",
  url: "https://jeevly.com",
  contact: {
    /** Change the address here; every mailto link on the site derives from it. */
    email: contactEmail,
    href: mailtoHref("Hello Jeevly"),
  },
  /** Primary navigation, shown in the header only. */
  nav: [
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
  ],
  /** Utility links for the footer. */
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  // Placeholder handles; confirm the real profile URLs before launch.
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/jeevly", icon: "linkedin" },
    { label: "Instagram", href: "https://www.instagram.com/jeevly", icon: "instagram" },
    { label: "X", href: "https://x.com/jeevly", icon: "x" },
  ],
} as const;
