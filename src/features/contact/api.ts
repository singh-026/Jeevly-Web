import { siteConfig } from "@/config/site";

export type ProjectInquiry = {
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  description: string;
  wantsMarketing?: boolean;
  wantsNda?: boolean;
  /** Set by the services page lead form. */
  persona?: string;
  services?: string[];
  budget?: string;
};

/**
 * The site is a static export (GitHub Pages), so there is no server to post
 * to. Until a form endpoint exists, an inquiry is handed to the visitor's
 * mail client as a prefilled email. Swap the body of this function for a
 * `fetch` to that endpoint when it does.
 */
export function submitProjectInquiry(inquiry: ProjectInquiry) {
  const lines = [
    `Name: ${inquiry.name || "-"}`,
    `Email: ${inquiry.email}`,
    `Contact number: ${inquiry.phone || "-"}`,
    `Company: ${inquiry.company || "-"}`,
    ...(inquiry.persona ? [`I am a: ${inquiry.persona}`] : []),
    ...(inquiry.services?.length ? [`Needs: ${inquiry.services.join(", ")}`] : []),
    ...(inquiry.budget ? [`Budget: ${inquiry.budget}`] : []),
    `Marketing partner requested: ${inquiry.wantsMarketing ? "Yes" : "No"}`,
    `NDA requested before details: ${inquiry.wantsNda ? "Yes" : "No"}`,
    "",
    "Project description:",
    inquiry.description || "-",
  ];
  const subject = `New project inquiry${inquiry.company ? ` from ${inquiry.company}` : ""}`;
  const params = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  window.location.href = `mailto:${siteConfig.contact.email}?${params}`;
}
