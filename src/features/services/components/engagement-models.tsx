import { Icon } from "@/components/ui/icon";
import { Tabs } from "@/components/ui/tabs";
import type { EngagementModel } from "../types";

/** Server component: builds the panels, hands them to the client Tabs. */
export function EngagementModels({ models }: { models: EngagementModel[] }) {
  return (
    <div className="rounded-card bg-navy-50 px-5 py-10 sm:px-10 sm:py-14">
      <div className="mb-8 max-w-2xl">
        <h3 className="text-2xl font-bold text-navy sm:text-3xl">How we work with you</h3>
        <p className="mt-2 text-navy-700">Pick the engagement model that fits where you are.</p>
      </div>
      <Tabs
        label="Engagement models"
        items={models.map((model) => ({
          id: model.id,
          label: model.label,
          panel: <EngagementPanel model={model} />,
        }))}
      />
    </div>
  );
}

function EngagementPanel({ model }: { model: EngagementModel }) {
  return (
    <div className="grid gap-8 rounded-card bg-surface p-6 shadow-card sm:p-8 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <p className="text-sm font-semibold tracking-wide text-muted uppercase">{model.label}</p>
        <p className="mt-2 text-xl font-semibold text-navy sm:text-2xl">{model.summary}</p>
        <p className="mt-3 text-muted">{model.description}</p>
        <p className="mt-6 text-sm text-ink">
          <span className="font-semibold text-navy">Best for: </span>
          {model.bestFor}
        </p>
      </div>
      <ul className="flex flex-col gap-3 self-center">
        {model.points.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-navy text-white">
              <Icon name="check" className="size-3.5" />
            </span>
            <span className="text-ink">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
