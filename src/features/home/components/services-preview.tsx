import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Container } from "@/components/ui/section";
import { routes } from "@/config/routes";
import type { ServiceOffering } from "@/features/services/types";

/** A glance at what we offer; the full detail lives on /services. */
export function ServicesPreview({ offerings }: { offerings: ServiceOffering[] }) {
  return (
    <section aria-labelledby="services-preview-title" className="pb-16 sm:pb-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 id="services-preview-title" className="text-3xl font-bold tracking-tight text-navy">
              What we do
            </h2>
            <p className="mt-2 text-muted text-pretty">
              End-to-end product development and launch support for businesses and founders.
            </p>
          </div>
          <ButtonLink href={routes.services} variant="primary">
            Explore Services
            <Icon name="arrow-right" className="size-4" />
          </ButtonLink>
        </div>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((offering) => (
            <li key={offering.id} className="flex flex-col rounded-2xl border border-line/60 bg-surface p-6 shadow-card">
              <span className="grid size-11 place-items-center rounded-xl bg-navy text-white">
                <Icon name={offering.icon} className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-navy">{offering.title}</h3>
              <p className="mt-1 text-sm text-muted text-pretty">{offering.promise}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
