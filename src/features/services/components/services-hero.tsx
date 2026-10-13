import { buttonStyles } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { Container } from "@/components/ui/section";
import { EnquiryButton } from "@/features/contact/components/enquiry-context";
import { cn } from "@/lib/cn";

type MilestoneStatus = "done" | "active" | "next";

/** A sample engagement for the hero card; illustrative, not a real client. */
const sampleMilestones: { title: string; detail: string; icon: IconName; status: MilestoneStatus }[] = [
  { title: "Discover & plan", detail: "PRD, milestones, fixed price", icon: "file-text", status: "done" },
  { title: "Design", detail: "Tested prototype", icon: "pen", status: "done" },
  { title: "Build", detail: "Sprint 3 of 5 · demo every 2 weeks", icon: "code", status: "active" },
  { title: "Launch", detail: "App stores and web", icon: "rocket", status: "next" },
];

export function ServicesHero() {
  return (
    <section aria-labelledby="services-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute -top-48 -right-48 size-[40rem] rounded-full bg-accent-soft/70" />
      <Container className="relative grid items-center gap-12 pt-10 pb-16 lg:grid-cols-[7fr_5fr] lg:pt-16 lg:pb-20">
        <div>
          <p className="text-sm font-semibold tracking-wider text-navy uppercase">
            Services for growing businesses and first-time founders
          </p>
          <h1
            id="services-title"
            className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-navy sm:text-5xl lg:text-[3.5rem]"
          >
            Your product team, from first idea to <span className="text-accent-hover">scale.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-pretty text-muted sm:text-xl">
            Jeevly designs, builds and grows web and mobile products for small and medium businesses and solo
            founders. Senior engineers, fixed-scope pricing, and a launch plan built alongside the code.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <EnquiryButton className={cn(buttonStyles({ variant: "accent", size: "lg" }), "cursor-pointer shadow-float")}>
              Book a Free Strategy Call
              <Icon name="arrow-right" className="size-4" />
            </EnquiryButton>
          </div>
          <p className="mt-4 text-sm text-muted">
            30-minute call <span aria-hidden="true">·</span> No sales pitch <span aria-hidden="true">·</span> NDA on
            request
          </p>
        </div>

        <ProjectPlanCard />
      </Container>
    </section>
  );
}

/** A sample project plan: shows how an engagement is laid out, milestone by milestone. */
function ProjectPlanCard() {
  return (
    <div aria-hidden="true" className="rounded-card border border-line bg-surface p-6 shadow-card-hover sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted">Your project plan</p>
          <p className="mt-1 text-xl font-bold tracking-tight text-navy">Customer app, v1</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">On track</span>
      </div>

      <ol className="mt-6 flex flex-col">
        {sampleMilestones.map((m, i) => {
          const last = i === sampleMilestones.length - 1;
          return (
            <li key={m.title} className="relative flex gap-4 pb-5 last:pb-0">
              {!last && (
                <span
                  className={cn(
                    "absolute top-10 bottom-0 left-[1.1875rem] w-0.5",
                    m.status === "done" ? "bg-cta" : "bg-line",
                  )}
                />
              )}
              <span
                className={cn(
                  "relative grid size-10 shrink-0 place-items-center rounded-full",
                  m.status === "done" && "bg-cta text-on-cta",
                  m.status === "active" && "bg-accent-soft text-navy ring-2 ring-cta",
                  m.status === "next" && "bg-navy-50 text-navy/50",
                )}
              >
                <Icon name={m.status === "done" ? "check" : m.icon} className="size-5" />
              </span>
              <div className="min-w-0 flex-1 pt-1">
                <p className={cn("font-semibold", m.status === "next" ? "text-navy/50" : "text-navy")}>{m.title}</p>
                <p className="text-sm text-muted">{m.detail}</p>
                {m.status === "active" && (
                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-navy-50">
                    <div className="h-full w-3/5 rounded-full bg-cta" />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5 text-sm text-ink">
        <span className="inline-flex items-center gap-2">
          <Icon name="wallet" className="size-4 text-navy" />
          Fixed price per milestone
        </span>
        <span className="inline-flex items-center gap-2">
          <Icon name="calendar" className="size-4 text-navy" />
          Live demo every 2 weeks
        </span>
      </div>
    </div>
  );
}
