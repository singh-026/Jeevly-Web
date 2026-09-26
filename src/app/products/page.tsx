import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/section";
import { formatCompact } from "@/lib/format";
import { getProducts } from "@/features/products/api";
import { ProductCard } from "@/features/products/components/product-card";

export const metadata: Metadata = {
  title: "Products",
  description: "Apps and tools we've built for businesses, individuals and everyone in between.",
};

export default async function ProductsPage() {
  const products = await getProducts();
  const totalReach = products.reduce((sum, product) => sum + product.stat.value, 0);

  return (
    <>
      <Section aria-labelledby="what-weve-built" className="pb-8 sm:pb-12">
        <SectionHeader
          id="what-weve-built"
          as="h1"
          eyebrow="Products"
          title="What We've Built"
          description="Apps and tools made to be genuinely useful, whether you're running a team, a household or just your own day. Some are built for work, some for life, and some for both."
        />
        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          <Stat label="Products" value={String(products.length)} />
          <Stat label="Downloads and active users" value={`${formatCompact(totalReach)}+`} />
        </dl>
      </Section>

      <Section aria-labelledby="all-products" className="pt-8 sm:pt-12">
        <h2 id="all-products" className="sr-only">
          All products
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <li key={product.slug}>
              <ProductCard product={product} priority={i < 3} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col-reverse">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-3xl font-bold text-navy">{value}</dd>
    </div>
  );
}
