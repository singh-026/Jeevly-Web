import { Section, SectionHeader } from "@/components/ui/section";
import { EnquirySection } from "@/features/contact/components/enquiry-section";
import { FeaturedProducts } from "@/features/home/components/featured-products";
import { Hero } from "@/features/home/components/hero";
import { ServicesPreview } from "@/features/home/components/services-preview";
import { TechStrip } from "@/features/home/components/tech-strip";
import { getProducts } from "@/features/products/api";
import { getPersonasWithProof, getServiceOfferings } from "@/features/services/api";
import { PersonaSwitcher } from "@/features/services/components/persona-switcher";

export default async function HomePage() {
  const [products, offerings, { personas, proof }] = await Promise.all([
    getProducts(),
    getServiceOfferings(),
    getPersonasWithProof(),
  ]);

  return (
    <>
      <Hero />
      <ServicesPreview offerings={offerings} />
      {/* Hidden while the backend has no products. */}
      {products.length > 0 && <FeaturedProducts products={products.slice(0, 4)} />}

      <Section id="who-we-help" aria-labelledby="who-we-help-title" className="border-t border-line">
        <SectionHeader
          id="who-we-help-title"
          eyebrow="Who we help"
          title="Built for where you are right now"
          description="Choose your path. You get the same senior team either way; only the process changes."
        />
        <div className="mt-10">
          <PersonaSwitcher personas={personas} proof={proof} />
        </div>
      </Section>

      <TechStrip offerings={offerings} />
      <EnquirySection />
    </>
  );
}
