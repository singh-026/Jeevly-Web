import type { IconName } from "@/components/ui/icon";

export type Discipline = "development" | "marketing";

export type ServicePillar = {
  id: Discipline;
  icon: IconName;
  title: string;
  description: string;
  capabilities: { label: string; icon: IconName }[];
};

export type EngagementModel = {
  id: "a-la-carte" | "complete";
  label: string;
  summary: string;
  description: string;
  points: string[];
  bestFor: string;
};
