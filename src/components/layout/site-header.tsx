import type { NavItem } from "@/config/site";
import { Container } from "@/components/ui/section";
import { HeaderCta } from "./header-cta";
import { Logo } from "./logo";
import { NavLink } from "./nav-link";

export function SiteHeader({ nav }: { nav: readonly NavItem[] }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/90 backdrop-blur supports-[backdrop-filter]:bg-canvas/75">
      <Container className="flex h-16 items-center gap-4 sm:h-20">
        <Logo />
        <nav aria-label="Main" className="ml-auto md:mx-auto">
          <ul className="flex items-center gap-1 sm:gap-4 lg:gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <HeaderCta />
      </Container>
    </header>
  );
}
