import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/icon";

/** Always-visible contact CTA pinned to the bottom-right of the viewport. */
export function FloatingContact() {
  return (
    <a
      href={siteConfig.contact.href}
      aria-label={`Contact us by email at ${siteConfig.contact.email}`}
      className="fixed right-4 bottom-4 z-50 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-on-accent shadow-float transition hover:bg-accent-hover motion-safe:hover:-translate-y-0.5 sm:right-6 sm:bottom-6 sm:h-14 sm:px-6 sm:text-base"
    >
      <Icon name="mail" className="size-5" />
      Contact Us
    </a>
  );
}
