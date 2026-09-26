import type { Media } from "@/components/ui/artwork";
import type { Discipline } from "@/features/services/types";

export type CaseStudy = {
  slug: string;
  client: string;
  project: string;
  /** A complete-package project lists both disciplines. */
  disciplines: Discipline[];
  engagement: "a-la-carte" | "complete";
  /** One-line result, ideally with a number. */
  outcome: string;
  media: Media;
  featured?: boolean;
  /** Optional link to a full write-up once one exists. */
  href?: string;
};

export type PortfolioFilter = "all" | Discipline;
