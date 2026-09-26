import type { EngagementModel, ServicePillar } from "../types";

export const pillars: ServicePillar[] = [
  {
    id: "development",
    icon: "code",
    title: "Development",
    description:
      "Product engineering from first prototype to production scale, built by senior teams who own the outcome.",
    capabilities: [
      { label: "Web Development", icon: "globe" },
      { label: "Mobile Apps", icon: "smartphone" },
      { label: "AI/ML", icon: "brain" },
      { label: "Staff Augmentation", icon: "users" },
    ],
  },
  {
    id: "marketing",
    icon: "megaphone",
    title: "Marketing & Creative",
    description:
      "Brand, content and campaigns that make your product impossible to ignore, and measurable while they do it.",
    capabilities: [
      { label: "Graphics & Design", icon: "palette" },
      { label: "Video Production", icon: "video" },
      { label: "Social Media Management", icon: "share" },
    ],
  },
];

export const engagementModels: EngagementModel[] = [
  {
    id: "a-la-carte",
    label: "À la Carte",
    summary: "Choose individual services as you need them.",
    description:
      "Bring us in for a specific build, a campaign or a sprint of extra engineers. You keep control of the roadmap; we slot into your team and tools.",
    points: [
      "Engage any single service, from one sprint up",
      "Works alongside your in-house team and vendors",
      "Scale up or down month to month",
    ],
    bestFor: "Teams with a clear roadmap that need specialist capacity.",
  },
  {
    id: "complete",
    label: "Complete Package",
    summary: "End-to-end product development and marketing.",
    description:
      "One team designs, builds, launches and grows your product. Engineering and marketing share a plan, so launch is ready when the code is.",
    points: [
      "A single team across development and marketing",
      "A single point of contact, accountable end to end",
      "Launch strategy planned alongside the build",
    ],
    bestFor: "New products and companies that want one partner from idea to growth.",
  },
];
