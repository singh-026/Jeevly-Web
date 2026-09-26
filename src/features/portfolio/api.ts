import "server-only";
import { caseStudies } from "./data/case-studies";
import type { CaseStudy } from "./types";

/**
 * Data access for the portfolio. Pages import from here, never from ./data
 * directly, so swapping the static file for a CMS or database only touches
 * this module.
 */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  // Featured work first, otherwise keep authoring order.
  return [...caseStudies].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}
