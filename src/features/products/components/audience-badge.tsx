import { Badge } from "@/components/ui/badge";
import { Icon, type IconName } from "@/components/ui/icon";
import type { Audience } from "../types";

export const audienceMeta: Record<Audience, { label: string; icon: IconName; tone: "navy" | "accent" | "neutral" }> = {
  business: { label: "For Businesses", icon: "users", tone: "navy" },
  individual: { label: "For Individuals", icon: "heart", tone: "accent" },
  everyone: { label: "For Everyone", icon: "globe", tone: "neutral" },
};

export function AudienceBadge({ audience, className }: { audience: Audience; className?: string }) {
  const meta = audienceMeta[audience];
  return (
    <Badge tone={meta.tone} className={className}>
      <Icon name={meta.icon} className="size-3.5" />
      {meta.label}
    </Badge>
  );
}
