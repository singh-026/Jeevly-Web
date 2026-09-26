import { formatCompact } from "@/lib/format";
import { Icon, type IconName } from "./icon";

type StatBadgeProps = {
  value: number;
  /** e.g. "downloads", "active users" */
  label: string;
  icon?: IconName;
};

export function StatBadge({ value, label, icon = "download" }: StatBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy">
      <Icon name={icon} className="size-3.5" />
      <span>
        {formatCompact(value)}+ <span className="text-navy-700">{label}</span>
      </span>
    </span>
  );
}
