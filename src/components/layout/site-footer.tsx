import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Container } from "@/components/ui/section";
import { ProjectIntakeButton } from "@/features/contact/components/project-intake";
import { cn } from "@/lib/cn";
import { Logo } from "./logo";

/** Text link with an underline that grows from the left on hover and keyboard focus. */
const linkClass =
  "cursor-pointer rounded-sm bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 text-white/70 transition-all duration-200 hover:bg-[length:100%_1px] hover:text-white focus-visible:bg-[length:100%_1px] focus-visible:text-white";

const headingClass = "text-xs font-semibold uppercase tracking-wider text-white/60";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-sm text-white/70">
      <Container className="flex flex-col gap-10 py-10 lg:py-12">
        {/* Contact call to action */}
        <div className="flex flex-col items-start gap-6 border-b border-white/10 pb-10 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
            Have an idea? Let&apos;s build it.
          </h2>
          <ProjectIntakeButton
            className={cn(buttonStyles({ variant: "accent" }), "shrink-0 cursor-pointer transition-all duration-200")}
          >
            Start a Conversation
            <Icon name="arrow-right" className="size-4" />
          </ProjectIntakeButton>
        </div>

        {/* Brand, navigation, social and email columns */}
        <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1.25fr]">
          <div className="flex flex-col gap-3 sm:col-span-3 lg:col-span-1">
            <Logo inverted className="w-fit [&>span]:inline" />
            <p className="max-w-sm">{siteConfig.tagline}</p>
          </div>

          <nav aria-labelledby="footer-explore" className="flex flex-col gap-3">
            <h2 id="footer-explore" className={headingClass}>
              Explore
            </h2>
            <ul className="flex flex-col gap-2.5">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <h2 id="footer-connect" className={headingClass}>
              Connect
            </h2>
            <ul aria-labelledby="footer-connect" className="flex flex-col gap-2.5">
              {siteConfig.social.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.name} on ${item.label} (opens in a new tab)`}
                    className="group inline-flex cursor-pointer items-center gap-3 rounded-md text-white/70 transition-all duration-200 hover:text-white focus-visible:text-white"
                  >
                    <span className="grid size-9 place-items-center rounded-full border border-white/15 transition-all duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent group-focus-visible:border-accent group-focus-visible:bg-accent group-focus-visible:text-on-accent motion-safe:group-hover:-translate-y-0.5">
                      <Icon name={item.icon} className="size-4" />
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className={headingClass}>Have a project in mind?</h2>
            <a
              href={siteConfig.contact.href}
              className="group inline-flex w-fit cursor-pointer items-center gap-2 rounded-md text-base font-semibold text-white transition-all duration-200 hover:text-cta focus-visible:text-cta"
            >
              {siteConfig.contact.email}
              <Icon
                name="arrow-right"
                className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1"
              />
            </a>
          </div>
        </div>

        {/* Legal bar */}
        <div className="flex flex-col-reverse gap-4 border-t border-white/10 pt-6 text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex items-center gap-6">
              {siteConfig.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
