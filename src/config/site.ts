import { routes } from "./routes";

export type NavItem = { label: string; href: string };

/**
 * Site-wide settings. Anything that appears in more than one place
 * (brand name, primary routes, contact channel) lives here.
 */
const contactEmail = "hello@jeevly.com";

// PLACEHOLDER: replace with the real WhatsApp business number before launch.
/** WhatsApp number in international format: country code first, digits only, no "+". */
const whatsappNumber = "8527010936";
/**
 * Pre-filled chat text. The prompts nudge visitors to share what we'd ask
 * first anyway, so the first reply can be useful instead of "tell us more".
 */
const whatsappMessage = [
  "Hi Jeevly! 👋 I'd love to talk about a project.",
  "",
  "What I'm building: ",
  "Rough budget: ",
  "Ideal timeline: ",
].join("\n");

/** Builds a `mailto:` link to the site contact address, optionally with a subject line and body. */
export function mailtoHref(subject?: string, body?: string) {
  const params = [
    ...(subject ? [`subject=${encodeURIComponent(subject)}`] : []),
    ...(body ? [`body=${encodeURIComponent(body)}`] : []),
  ];
  return `mailto:${contactEmail}${params.length ? `?${params.join("&")}` : ""}`;
}

/**
 * Builds a Gmail compose link to the site contact address. Unlike `mailto:`,
 * it works for visitors with no desktop mail app set up.
 */
export function gmailHref(subject?: string, body?: string) {
  const params = [
    `to=${encodeURIComponent(contactEmail)}`,
    ...(subject ? [`su=${encodeURIComponent(subject)}`] : []),
    ...(body ? [`body=${encodeURIComponent(body)}`] : []),
  ];
  return `https://mail.google.com/mail/?view=cm&fs=1&${params.join("&")}`;
}

/** Builds a WhatsApp chat link to our number with `message` pre-filled. */
export function whatsappHref(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
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
    /** Opens a Gmail compose window in the browser, addressed to us. */
    gmailHref: gmailHref("Hello Jeevly"),
    /** Opens a WhatsApp chat with the message pre-filled; change the number or message above. */
    whatsapp: {
      number: whatsappNumber,
      message: whatsappMessage,
      href: whatsappHref(whatsappMessage),
    },
  },
  /**
   * Primary navigation, shown in the header and footer. The root layout drops
   * Products while the backend has none.
   */
  nav: [
    { label: "Services", href: routes.services },
    { label: "Products", href: routes.products },
    { label: "About", href: routes.about },
  ] satisfies NavItem[],
  /** Utility links for the footer. */
  legal: [
    { label: "Privacy Policy", href: routes.privacy },
    { label: "Terms of Service", href: routes.terms },
  ] satisfies NavItem[],
  // Placeholder handles; confirm the real profile URLs before launch.
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/jeevly",
      icon: "linkedin",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/jeevlyhq/",
      icon: "instagram",
    },
    { label: "X", href: "https://x.com/Jeevlyhq", icon: "x" },
  ],
} as const;
