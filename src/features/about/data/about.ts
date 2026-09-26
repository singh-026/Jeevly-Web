import type { IconName } from "@/components/ui/icon";

// Placeholder content; replace with the real company story and team.
export const about = {
  story: [
    "Jeevly started in 2019 as three engineers taking on client projects between their day jobs. The work was good, but we kept watching great products launch to silence because marketing was an afterthought.",
    "So we built a team that does both. Today, engineers, designers and marketers work side by side on client projects, and the same people build our own products for businesses, families and individuals.",
  ],
  mission: "Make useful software, and make sure the people who need it can find it.",
  stats: [
    { value: "120+", label: "Projects delivered" },
    { value: "6", label: "Products in market" },
    { value: "40", label: "People across 4 countries" },
    { value: "2M+", label: "People using our products" },
  ],
  values: [
    { icon: "target", title: "Outcomes over output", description: "We measure success by what changes for you, not by hours or tickets closed." },
    { icon: "users", title: "One team", description: "Engineering and marketing plan together from day one, not in a hand-off." },
    { icon: "heart", title: "Built for people", description: "Whether the user is an enterprise or one person, the product should respect their time." },
    { icon: "compass", title: "Straight talk", description: "Clear estimates, honest trade-offs, and no surprises on the invoice." },
  ] satisfies { icon: IconName; title: string; description: string }[],
  team: [
    { name: "Aarav Mehta", role: "Co-founder & CEO" },
    { name: "Sofia Laurent", role: "Co-founder & CTO" },
    { name: "Daniel Okafor", role: "Head of Marketing" },
    { name: "Mei Tanaka", role: "Design Director" },
    { name: "Rohan Iyer", role: "Head of Products" },
    { name: "Clara Novak", role: "Engineering Lead, AI/ML" },
    { name: "Lucas Ferreira", role: "Creative Producer" },
    { name: "Priya Sharma", role: "Client Partner" },
  ],
};
