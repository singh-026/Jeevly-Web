import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeader } from "@/components/ui/section";
import { getCaseStudies } from "@/features/portfolio/api";
import { PortfolioGrid } from "@/features/portfolio/components/portfolio-grid";
import { getEngagementModels, getServicePillars } from "@/features/services/api";
import { EngagementModels } from "@/features/services/components/engagement-models";
import { PillarPanel } from "@/features/services/components/pillar-panel";

export const metadata: Metadata = {
  title: "Services",
  description: "Software development and marketing services for businesses, à la carte or as a complete package.",
};

export default async function ServicesPage() {
  const [pillars, models, studies] = await Promise.all([
    getServicePillars(),
    getEngagementModels(),
    getCaseStudies(),
  ]);

  return (
    <>
      <Section aria-labelledby="what-we-do">
        <SectionHeader
          id="what-we-do"
          as="h1"
          eyebrow="Services"
          title="What We Do"
          description="Two disciplines, one standard. We engineer the product and build the audience for it, as individual services or one integrated team."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          {pillars.map((pillar) => (
            <PillarPanel key={pillar.id} pillar={pillar} />
          ))}
        </div>
        <div className="mt-16 sm:mt-20">
          <EngagementModels models={models} />
        </div>
      </Section>

      <Section tone="surface" aria-labelledby="portfolio" className="border-t border-line">
        <SectionHeader
          id="portfolio"
          eyebrow="Selected work"
          title="Portfolio"
          description="Results from recent engagements across development, marketing, and both at once."
        />
        <div className="mt-10">
          <PortfolioGrid studies={studies} />
        </div>
        <p className="mt-16 flex items-center justify-end gap-3 text-right text-lg font-semibold text-navy">
          Have a project like these in mind? Let&rsquo;s talk.
          <Icon name="arrow-right" className="size-6 rotate-45 text-accent" />
        </p>
      </Section>
    </>
  );
}
