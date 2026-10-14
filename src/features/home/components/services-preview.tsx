import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Container } from "@/components/ui/section";
import { routes } from "@/config/routes";
import type { ServiceOffering } from "@/features/services/types";
import { ServicesShowcase } from "./services-showcase";

/** What we offer, one service at a time; the full detail lives on /services. */
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
        <div className="mt-8">
          <ServicesShowcase offerings={offerings} />
        </div>
      </Container>
    </section>
  );
}
