import { Container } from "@/components/ui/section";
import type { ServiceOffering } from "@/features/services/types";

/**
 * Short group names for the services whose `stack` is technology. Services
 * missing here (marketing lists channels, not tools) are left out.
 */
const groupLabels: Record<string, string> = {
  design: "Design",
  development: "Web & mobile",
};

/** "Built with": the tools behind each service, read from the service cards. */
export function TechStrip({ offerings }: { offerings: ServiceOffering[] }) {
  const groups = offerings.flatMap((o) => (groupLabels[o.id] ? [{ label: groupLabels[o.id], tools: o.stack }] : []));

  return (
    <section aria-labelledby="tech-strip-title" className="pb-16 sm:pb-20">
      <Container>
        <div className="grid gap-8 rounded-3xl bg-navy-50 px-6 py-8 sm:px-10 lg:grid-cols-[1fr_3fr] lg:items-center">
          <div>
            <h2 id="tech-strip-title" className="text-2xl font-bold tracking-tight text-navy">
              Built with
            </h2>
            <p className="mt-1 text-sm text-muted text-pretty">Proven, mainstream tools, so any team can pick up the code.</p>
          </div>
          <dl className="grid gap-6 sm:grid-cols-2 lg:border-l lg:border-navy/10 lg:pl-10">
            {groups.map((group) => (
              <div key={group.label}>
                <dt className="text-xs font-semibold tracking-wider text-muted uppercase">{group.label}</dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-1.5">
                    {group.tools.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-md bg-surface px-2 py-1 font-mono text-xs font-medium text-navy ring-1 ring-navy/10"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
