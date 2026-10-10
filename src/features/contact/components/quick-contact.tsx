import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/icon";

/**
 * "Prefer quick communication?": WhatsApp and email shortcuts shown under the
 * enquiry form's intro. Numbers and addresses come from `siteConfig.contact`.
 */
export function QuickContact() {
  const { email, gmailHref, whatsapp } = siteConfig.contact;

  return (
    <div className="mt-8 border-t border-line pt-6">
      <p className="text-sm font-semibold text-navy">Prefer quick communication?</p>
      <div className="mt-3 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
        <a
          href={whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp (opens in a new tab)"
          className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 transition-colors hover:border-emerald-300 hover:bg-emerald-100"
        >
          <Icon name="whatsapp" className="size-4" />
          Chat on WhatsApp
        </a>
        <a
          href={gmailHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Email ${email} in Gmail (opens in a new tab)`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy underline-offset-4 hover:underline"
        >
          <Icon name="mail" className="size-4" />
          {email}
        </a>
      </div>
    </div>
  );
}
