import type { IconName } from "@/components/ui/icon";

export type Discipline = "development" | "marketing";

/** Who a visitor is; drives the persona switcher and pre-fills the enquiry form. */
export type PersonaId = "business" | "founder";

/** Options in the enquiry form's "What do you need?" group. */
export type LeadServiceId = "validate" | "design" | "build" | "modernize" | "devops" | "marketing";

export type Persona = {
  id: PersonaId;
  /** Tab label. */
  label: string;
  /** URL hash that opens this tab, without the "#". */
  hash: string;
  headline: string;
  body: string;
  fit: string[];
  deliverables: string[];
  engagement: string;
  /** Case study shown as proof; resolved against the portfolio by slug. */
  proofSlug: string;
  cta: { label: string; service: LeadServiceId };
};

export type ServiceOffering = {
  id: string;
  icon: IconName;
  title: string;
  promise: string;
  deliverables: string[];
  stack: string[];
  outcome: string;
  /** Form option pre-selected by this card's "Discuss This Service". */
  leadService: LeadServiceId;
};

export type FrameworkStage = {
  name: string;
  duration: string;
  activities: string[];
  output: string;
  /** Decision that must pass before the next stage; absent on the last one. */
  gate?: string;
};

export type Differentiator = {
  icon: IconName;
  title: string;
  headline: string;
  description: string;
};

export type CaseHighlight = {
  slug: string;
  /** Headline number, shown in large type. */
  metric: string;
  persona: PersonaId;
};
