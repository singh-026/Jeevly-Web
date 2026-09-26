import "server-only";
import { engagementModels, pillars } from "./data/services";
import type { EngagementModel, ServicePillar } from "./types";

/** Data access for the services page; see features/portfolio/api.ts. */
export async function getServicePillars(): Promise<ServicePillar[]> {
  return pillars;
}

export async function getEngagementModels(): Promise<EngagementModel[]> {
  return engagementModels;
}
