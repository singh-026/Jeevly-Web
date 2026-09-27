import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Terms of Service",
};

// Placeholder until the final legal copy is ready.
export default function TermsPage() {
  return (
    <Section aria-labelledby="terms-title">
      <SectionHeader
        id="terms-title"
        as="h1"
        eyebrow="Legal"
        title="Terms of Service"
        description={
          <>
            We&apos;re finalising our terms of service. For any questions in the meantime, write to us at{" "}
            <a href={siteConfig.contact.href} className="font-semibold text-navy underline underline-offset-4">
              {siteConfig.contact.email}
            </a>
            .
          </>
        }
      />
    </Section>
  );
}
