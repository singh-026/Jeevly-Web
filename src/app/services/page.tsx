import type { Metadata } from "next";
import { buttonStyles } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq-list";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeader } from "@/components/ui/section";
import { EnquiryButton } from "@/features/contact/components/enquiry-context";
import { EnquirySection } from "@/features/contact/components/enquiry-section";
import { getProductBySlug, getProducts } from "@/features/products/api";
import { getServicesPageContent } from "@/features/services/api";
import { FrameworkStages, IncubationSpotlight } from "@/features/services/components/product-framework";
import { ServiceCard } from "@/features/services/components/service-card";
import { ServicesHero } from "@/features/services/components/services-hero";
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
  const [content, products, spotlight] = await Promise.all([
    getServicesPageContent(),
    getProducts(),
    getProductBySlug(spotlightSlug),
  ]);

  return (
    <>
      <ServicesHero />

      <Section id="services" tone="surface" aria-labelledby="services-heading" className="border-t border-line">
        <SectionHeader
          id="services-heading"
          eyebrow="Services"
          title="Everything you need to ship, and nothing you don't"
          description="Partner with us for a single service or the whole journey. Every card lists exactly what you receive."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
          title="From first conversation to launch, planned before we build"
          description="Projects go over budget when the build starts before anyone has written down what's being built. Every engagement starts with a short planning sprint: a PRD, a milestone roadmap and a fixed price, agreed before any code. A decision gate after every stage keeps you in control."
        />
        <div className="mt-12">
          <FrameworkStages stages={content.frameworkStages} />
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
          <EnquiryButton service="plan" className={cn(buttonStyles({ variant: "accent", size: "lg" }), "cursor-pointer")}>
            Start with a Planning Sprint
            <Icon name="arrow-right" className="size-4" />
          </EnquiryButton>
          <p className="text-sm text-muted">1–2 weeks · fixed price · you keep the PRD and roadmap</p>
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
