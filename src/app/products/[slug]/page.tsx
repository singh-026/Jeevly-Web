import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/ui/faq-list";
import { Section, SectionHeader } from "@/components/ui/section";
import { getProductBySlug, getProductSlugs } from "@/features/products/api";
import { DemoVideo } from "@/features/products/components/demo-video";
import { HowToUse } from "@/features/products/components/how-to-use";
import { IntegrationsList } from "@/features/products/components/integrations-list";
import { PricingTable } from "@/features/products/components/pricing-table";
import { ProductHero } from "@/features/products/components/product-hero";
import { ProductPurpose } from "@/features/products/components/product-purpose";
import { ScreenshotGallery } from "@/features/products/components/screenshot-gallery";
import { SpecList } from "@/features/products/components/spec-list";

// Every product page is prerendered; unknown slugs 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug);
  if (!product) return {};
  return { title: product.name, description: product.tagline };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = await getProductBySlug((await params).slug);
  if (!product) notFound();

  return (
    <>
      <ProductHero product={product} />
      <ProductPurpose product={product} />

      <Section tone="surface" aria-labelledby="screenshots-title">
        <SectionHeader id="screenshots-title" eyebrow="Gallery" title="Screenshots" />
        <div className="mt-10">
          <ScreenshotGallery screenshots={product.screenshots} productName={product.name} seed={product.slug} />
        </div>
      </Section>

      <Section id="demo" aria-labelledby="demo-title">
        <SectionHeader id="demo-title" eyebrow="Demo" title={product.video.title} />
        <div className="mt-10">
          <DemoVideo video={product.video} poster={product.media} seed={product.slug} />
        </div>
      </Section>

      <Section tone="surface" aria-labelledby="how-to-title">
        <SectionHeader id="how-to-title" eyebrow="Getting started" title="How to use" />
        <div className="mt-10">
          <HowToUse steps={product.steps} />
        </div>
      </Section>

      <Section aria-labelledby="integrations-title">
        <SectionHeader
          id="integrations-title"
          eyebrow="Connects with"
          title="Integrations"
          description={`${product.name} works with the tools you already use.`}
        />
        <div className="mt-10">
          <IntegrationsList integrations={product.integrations} />
        </div>
      </Section>

      <Section tone="surface" aria-labelledby="details-title">
        <SectionHeader id="details-title" eyebrow="The details" title="Specs, pricing and FAQ" />
        <div className="mt-10 grid gap-12">
          <div>
            <h3 className="mb-4 text-xl font-semibold text-navy">Specifications</h3>
            <SpecList specs={product.specs} />
          </div>
          {product.pricing && (
            <div id="pricing">
              <h3 className="mb-4 text-xl font-semibold text-navy">Pricing</h3>
              <PricingTable tiers={product.pricing} />
            </div>
          )}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-navy">Frequently asked questions</h3>
            <FaqList items={product.faqs} />
          </div>
        </div>
      </Section>
    </>
  );
}
