import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/section";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    // Bottom padding leaves room for the floating contact button.
    <footer className="bg-navy pt-12 pb-24 text-white/80">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3">
          <Logo inverted />
          <p className="max-w-sm text-sm">{siteConfig.tagline}</p>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
