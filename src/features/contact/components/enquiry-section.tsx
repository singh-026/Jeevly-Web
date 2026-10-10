import { Section } from "@/components/ui/section";
import { enquirySectionId } from "../constants";
import { EnquiryForm } from "./enquiry-form";
import { EnquiryIntro } from "./enquiry-intro";

/**
 * The inline "Tell us what you're building" section. While a page renders it,
 * every "Start a Project" CTA scrolls here instead of opening the modal.
 */
export function EnquirySection() {
  return (
    <Section id={enquirySectionId} tone="surface" aria-labelledby="enquiry-title" className="border-t border-line">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <EnquiryIntro titleId="enquiry-title" />
        <EnquiryForm />
      </div>
    </Section>
  );
}
