import { caseStudies } from "@/features/portfolio/data/case-studies";

export const intakeCopy = {
  title: "Ready to Build Your Next Digital Product?",
  subtitle: "Collaborate with a globally recognized, award-winning development team.",
  description:
    "Share a few details about your idea, and our team will come back with technical insights, timelines, and next steps.",
  trustBadge: "Fast 2-minute response, fully NDA-protected.",
};

/** First entry is the default selection. */
export const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "United States / Canada" },
  { code: "+44", country: "United Kingdom" },
  { code: "+61", country: "Australia" },
  { code: "+971", country: "United Arab Emirates" },
  { code: "+65", country: "Singapore" },
  { code: "+49", country: "Germany" },
];

// Wordmarks drawn from the (placeholder) portfolio; swap for real client logos before launch.
export const trustedBrands = caseStudies.map((study) => study.client);
