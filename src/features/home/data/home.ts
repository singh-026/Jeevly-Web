import type { IconName } from "@/components/ui/icon";

// Placeholder copy and figures; replace the stats with real numbers before launch.

export const serviceHighlights: { icon: IconName; label: string }[] = [
  { icon: "target", label: "Product Strategy" },
  { icon: "pen", label: "UI/UX Design" },
  { icon: "code", label: "Development" },
  { icon: "trending-up", label: "Growth & Marketing" },
  { icon: "wrench", label: "Maintenance & Support" },
];

/** `tint` pairs a soft circle with a matching icon colour. */
export const processSteps: { icon: IconName; title: string; description: string; tint: string }[] = [
  { icon: "lightbulb", title: "Understand", description: "We listen, learn and define the right approach.", tint: "bg-orange-50 text-orange-500 ring-orange-100" },
  { icon: "file-text", title: "Plan", description: "Strategy, design and a clear roadmap.", tint: "bg-blue-50 text-blue-600 ring-blue-100" },
  { icon: "code", title: "Build", description: "High-quality, scalable software.", tint: "bg-emerald-50 text-emerald-600 ring-emerald-100" },
  { icon: "rocket", title: "Launch", description: "We help you go live and reach users.", tint: "bg-rose-50 text-rose-500 ring-rose-100" },
  { icon: "bar-chart", title: "Grow", description: "Ongoing support and data-driven growth.", tint: "bg-amber-50 text-amber-600 ring-amber-100" },
];

export const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "500K+", label: "Users Impacted" },
  { value: "20+", label: "Happy Clients" },
  { value: "98%", label: "Client Satisfaction" },
];
