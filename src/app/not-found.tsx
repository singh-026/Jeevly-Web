import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section aria-labelledby="not-found-title" className="sm:py-32">
      <SectionHeader
        id="not-found-title"
        as="h1"
        eyebrow="404"
        title="We couldn't find that page"
        description="It may have moved, or the link might be mistyped."
        align="center"
      />
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/services">Services</ButtonLink>
        <ButtonLink href="/products" variant="outline">
          Products
        </ButtonLink>
      </div>
    </Section>
  );
}
