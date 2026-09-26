import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeader } from "@/components/ui/section";
import { TeamGrid } from "@/features/about/components/team-grid";
import { about } from "@/features/about/data/about";

export const metadata: Metadata = {
  title: "About Us",
  description: "The people behind Jeevly, and why we build software and marketing under one roof.",
};

export default function AboutPage() {
  return (
    <>
      <Section aria-labelledby="about-title">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <SectionHeader id="about-title" as="h1" eyebrow="About Us" title="We build it, then we help the world find it." />
            <div className="mt-8 flex flex-col gap-4 text-lg text-ink">
              {about.story.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-4 self-center">
            {about.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse rounded-card border border-line bg-surface p-6">
                <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
                <dd className="text-3xl font-bold text-navy sm:text-4xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="navy" aria-labelledby="mission-title">
        <div className="max-w-3xl">
          <h2 id="mission-title" className="text-sm font-semibold tracking-wide text-white/80 uppercase">
            Our mission
          </h2>
          <p className="mt-4 text-3xl font-bold text-balance sm:text-4xl">{about.mission}</p>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((value) => (
            <li key={value.title} className="rounded-card bg-white/5 p-6 ring-1 ring-white/10">
              <Icon name={value.icon} className="size-6 text-accent" />
              <h3 className="mt-4 font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm text-white/80">{value.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="team-title">
        <SectionHeader id="team-title" eyebrow="The team" title="The people you'll work with" />
        <div className="mt-10">
          <TeamGrid members={about.team} />
        </div>
      </Section>
    </>
  );
}
