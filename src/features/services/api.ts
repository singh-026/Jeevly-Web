import "server-only";
import { getCaseStudies } from "@/features/portfolio/api";
import {
  caseHighlights,
  differentiators,
  faqs,
  frameworkStages,
  incubationReasons,
  offerings,
  personas,
} from "./data/services";

/** Data access for the services page; see features/portfolio/api.ts. */
export async function getServicesPageContent() {
  return {
    offerings,
    frameworkStages,
    incubationReasons,
    differentiators,
    caseHighlights,
    faqs,
  };
}

/** The service cards alone, for previews outside the services page. */
export async function getServiceOfferings() {
  return offerings;
}

/** The "Who we help" personas, each with its proof case study resolved. */
export async function getPersonasWithProof() {
  const studies = await getCaseStudies();
  const studyBySlug = new Map(studies.map((study) => [study.slug, study]));
  const proof = Object.fromEntries(
    personas.flatMap((p) => {
      const study = studyBySlug.get(p.proofSlug);
      return study ? [[p.id, { client: study.client, outcome: study.outcome }]] : [];
    }),
  );
  return { personas, proof };
}
