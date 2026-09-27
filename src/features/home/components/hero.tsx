import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Container } from "@/components/ui/section";
import { productsPath } from "@/features/products/routes";
import { HeroDevices } from "./hero-devices";

export function Hero() {
  return (
    <section aria-labelledby="home-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-48 -right-48 size-[40rem] rounded-full bg-accent-soft/70"
      />
      <Container className="relative grid items-center gap-10 pt-10 pb-16 lg:grid-cols-[1.1fr_1fr] lg:pt-16 lg:pb-20">
        <div>
          <p className="text-sm font-semibold tracking-wider text-navy uppercase">
            Software <span aria-hidden="true">·</span> Products{" "}
            <span aria-hidden="true">·</span> Growth
          </p>
          <h1
            id="home-title"
            className="mt-4 text-5xl leading-[1.02] font-extrabold tracking-tight text-balance text-navy sm:text-6xl lg:text-[3.5rem] xl:text-[3.9rem]"
          >
            We build software that makes{" "}
            <span className="text-accent-hover">life easier.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-pretty text-muted">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {/* The header owns "Start a Project"; the hero points at proof instead. */}
            <ButtonLink
              href="/services#portfolio"
              variant="accent"
              size="lg"
              className="shadow-float"
            >
              View Our Work
              <Icon name="arrow-right" className="size-4" />
            </ButtonLink>
          </div>
        </div>
        <HeroDevices />
      </Container>
    </section>
  );
}
