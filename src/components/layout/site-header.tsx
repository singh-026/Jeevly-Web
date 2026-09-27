import { siteConfig } from "@/config/site";
import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Container } from "@/components/ui/section";
import { ProjectIntakeButton } from "@/features/contact/components/project-intake";
import { Logo } from "./logo";
import { NavLink } from "./nav-link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/90 backdrop-blur supports-[backdrop-filter]:bg-canvas/75">
      <Container className="flex h-16 items-center gap-4 sm:h-20">
        <Logo />
        <nav aria-label="Main" className="ml-auto md:mx-auto">
          <ul className="flex items-center gap-1 sm:gap-4 lg:gap-8">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        {/* Wrapped because the button's own inline-flex would override `hidden`. */}
        <div className="hidden sm:block">
          <ProjectIntakeButton className={buttonStyles({ variant: "accent" })}>
            Start a Project
            <Icon name="arrow-right" className="size-4" />
          </ProjectIntakeButton>
        </div>
      </Container>
    </header>
  );
}
