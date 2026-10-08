import type { Metadata } from "next";
import { buttonStyles } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq-list";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeader } from "@/components/ui/section";
import { EnquiryButton } from "@/features/contact/components/enquiry-context";
import { EnquirySection } from "@/features/contact/components/enquiry-section";
import { trustedBrands } from "@/features/contact/data/intake";
import { stats } from "@/features/home/data/home";
import { getCaseStudies } from "@/features/portfolio/api";
import { getProductBySlug, getProducts } from "@/features/products/api";
import { getServicesPageContent } from "@/features/services/api";
import { FrameworkStages, IncubationSpotlight } from "@/features/services/components/product-framework";
import { ServiceCard } from "@/features/services/components/service-card";
import { ServicesHero } from "@/features/services/components/services-hero";
import { TrustBar } from "@/features/services/components/trust-bar";
import { Differentiators } from "@/features/services/components/why-jeevly";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Product design, web and mobile development, DevOps and launch support for small and medium businesses and solo founders. Fixed-scope pricing, senior engineers.",
};

/** The in-house product used as proof of the product framework. */
const spotlightSlug = "tally";

export default async function ServicesPage() {
  const [content, studies, products, spotlight] = await Promise.all([
    getServicesPageContent(),
    getCaseStudies(),
    getProducts(),
    getProductBySlug(spotlightSlug),
  ]);

  const studyBySlug = new Map(studies.map((study) => [study.slug, study]));
  const highlights = content.caseHighlights.flatMap((h) => {
    const study = studyBySlug.get(h.slug);
    return study ? [{ ...h, study }] : [];
  });
  const [heroProof] = highlights;

  return (
    <>
      {heroProof && <ServicesHero study={heroProof.study} metric={heroProof.metric} product={spotlight} />}
      <TrustBar stats={stats} brands={trustedBrands} />


      <Section id="services" tone="surface" aria-labelledby="services-heading" className="border-t border-line">
        <SectionHeader
          id="services-heading"
          eyebrow="Services"
          title="Everything you need to ship, and nothing you don't"
          description="Hire us for one service or the whole journey. Every card lists exactly what you receive."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          {content.offerings.map((offering) => (
            <li key={offering.id}>
              <ServiceCard offering={offering} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="product-strategy" aria-labelledby="product-strategy-title">
        <SectionHeader
          id="product-strategy-title"
          eyebrow="Product strategy"
          title="From raw idea to real users, one proven step at a time"
          description="Most first products fail because they're built before anyone checks that people want them. Our four-stage framework puts a decision gate after every stage, so you never spend build money on an unproven idea."
        />
        <div className="mt-12">
          <FrameworkStages stages={content.frameworkStages} />
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
          <EnquiryButton service="validate" className={cn(buttonStyles({ variant: "accent", size: "lg" }), "cursor-pointer")}>
            Start with a Validation Sprint
            <Icon name="arrow-right" className="size-4" />
          </EnquiryButton>
          <p className="text-sm text-muted">2 weeks · fixed price · you keep all research</p>
        </div>
        {/* Product proof; hidden while the backend has no products. */}
        {spotlight && (
          <div className="mt-16">
            <IncubationSpotlight
              product={spotlight}
              others={products.filter((p) => p.slug !== spotlightSlug)}
              reasons={content.incubationReasons}
            />
          </div>
        )}
      </Section>

      <Section tone="surface" aria-labelledby="why-jeevly" className="border-t border-line">
        <SectionHeader
          id="why-jeevly"
          eyebrow="Why Jeevly"
          title="Senior talent. Startup speed. No agency overhead."
        />
        <div className="mt-10">
          <Differentiators items={content.differentiators} />
        </div>
      </Section>

      <Section id="faq" aria-labelledby="faq-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader
            id="faq-title"
            eyebrow="FAQ"
            title="Questions founders and teams ask first"
            description="Anything else? Ask it in the form below and a senior engineer will answer."
          />
          <FaqList items={content.faqs} />
        </div>
      </Section>

      <EnquirySection />
    </>
  );
}
