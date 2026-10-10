import { Icon } from "@/components/ui/icon";
import { SectionHeader } from "@/components/ui/section";
import { nextSteps } from "../data/enquiry";
import { QuickContact } from "./quick-contact";

/** The copy beside the enquiry form; shared by the inline section and the modal. */
export function EnquiryIntro({ titleId }: { titleId: string }) {
  return (
    <div>
      <SectionHeader
        id={titleId}
        eyebrow="Start your project"
        title="Tell us what you're building"
        description="Share a few details. A senior engineer, not a salesperson, will reply with questions, a rough timeline and a price range."
      />
      <h3 className="mt-10 text-sm font-semibold tracking-wide text-navy uppercase">What happens next</h3>
      <ol className="mt-4 flex flex-col gap-4">
        {nextSteps.map((step, index) => (
          <li key={step} className="flex items-start gap-3 text-ink">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-white">
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
      <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink">
        <span className="inline-flex items-center gap-2">
          <Icon name="shield" className="size-4 text-navy" />
          NDA on request
        </span>
        <span className="inline-flex items-center gap-2">
          <Icon name="check-circle" className="size-4 text-navy" />
          You own 100% of the code and IP
        </span>
      </p>
      <QuickContact />
    </div>
  );
}
