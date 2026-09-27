import { getProducts } from "@/features/products/api";
import { DoorCards } from "@/features/home/components/door-cards";
import { FeaturedProducts } from "@/features/home/components/featured-products";
import { Hero } from "@/features/home/components/hero";
import { HowWeWork } from "@/features/home/components/how-we-work";
import { StatsBand } from "@/features/home/components/stats-band";

export default async function HomePage() {
  const featured = (await getProducts()).slice(0, 4);

  return (
    <>
      <Hero />
      <DoorCards products={featured} />
      <HowWeWork />
      <FeaturedProducts products={featured} />
      <StatsBand />
    </>
  );
}
