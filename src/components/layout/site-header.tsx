import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/section";
import { Logo } from "./logo";
import { NavLink } from "./nav-link";
import { SectionToggle } from "./section-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/75">
      <Container className="flex h-16 items-center gap-2 sm:gap-6 lg:gap-10">
        <Logo />
        <SectionToggle />
        <nav aria-label="Secondary" className="ml-auto">
          <ul className="flex items-center gap-1">
            {siteConfig.secondaryNav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
