import { Icon } from "@/components/ui/icon";
import { Section, SectionHeader } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { processSteps } from "../data/home";

export function HowWeWork() {
  return (
    <Section aria-labelledby="process-title" className="py-16 sm:py-20">
      <SectionHeader
        id="process-title"
        title="How We Work"
        description="A simple, proven process from idea to impact."
        align="center"
      />
      <ol className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {processSteps.map((step, i) => (
          <li
            key={step.title}
            className="relative flex flex-col items-center text-center lg:after:absolute lg:after:top-8 lg:after:left-[calc(50%+3rem)] lg:after:h-px lg:after:w-[calc(100%-6rem+1.5rem)] lg:after:bg-line lg:last:after:hidden"
          >
            <span className={cn("grid size-16 place-items-center rounded-full ring-8", step.tint)}>
              <Icon name={step.icon} className="size-7" />
            </span>
            <h3 className="mt-5 font-semibold text-navy">
              {i + 1}. {step.title}
            </h3>
            <p className="mt-1 max-w-[12rem] text-sm text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
