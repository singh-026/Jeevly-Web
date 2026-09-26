import type { Media } from "@/components/ui/artwork";

export type Audience = "business" | "individual" | "everyone";

export type Screenshot = Media & { caption: string };

export type PricingTier = {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  audience: Audience;
  /** 2–3 line summary for cards. */
  summary: string;
  media: Media;
  stat: { value: number; label: "downloads" | "active users" };
  rating: { value: number; count: number };
  cta: { label: string; href: string };

  purpose: {
    problem: string;
    solution: string;
    outcomes: string[];
  };
  screenshots: Screenshot[];
  video: {
    title: string;
    /** YouTube video id, loaded via youtube-nocookie on click. */
    youtubeId?: string;
    /** Or a self-hosted file under /public. */
    src?: string;
  };
  steps: { title: string; description: string }[];
  integrations: { name: string; category: string }[];
  specs: { label: string; value: string }[];
  pricing?: PricingTier[];
  faqs: { question: string; answer: string }[];
};

export type ProductSummary = Pick<
  Product,
  "slug" | "name" | "tagline" | "audience" | "summary" | "media" | "stat" | "rating"
>;
