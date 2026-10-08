import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/section";
import { HeroJourney } from "./hero-journey";

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
            Design <span aria-hidden="true">·</span> Build{" "}
            <span aria-hidden="true">·</span> Launch
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
        </div>
        <HeroJourney />
      </Container>
    </section>
  );
}
