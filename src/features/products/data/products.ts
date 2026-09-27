import { mailtoHref } from "@/config/site";
import type { Product } from "../types";

// Placeholder content; replace with real products or source from a CMS via ../api.ts.
// Add a product by appending an object here: the card, detail page, static
// params and metadata are all generated from it.
export const products: Product[] = [
  {
    slug: "tally",
    name: "Tally",
    tagline: "See where your money goes, without the spreadsheet.",
    audience: "individual",
    summary:
      "A personal budget and expense tracker that categorises spending automatically and nudges you before you overspend.",
    media: { tone: "emerald", alt: "Tally budget overview screen" },
    icon: "wallet",
    stat: { value: 250000, label: "downloads" },
    rating: { value: 4.8, count: 12400 },
    cta: { label: "Download Tally", href: "#pricing" },
    purpose: {
      problem: "Budgeting apps ask for hours of manual entry, so most people give up within a month.",
      solution:
        "Tally reads your transactions, sorts them into categories you understand and shows one number: what you can still spend this month.",
      outcomes: ["Set up in under five minutes", "No manual categorising", "Gentle alerts before you overspend"],
    },
    screenshots: [
      { tone: "emerald", alt: "Monthly overview", caption: "Your month at a glance" },
      { tone: "teal", alt: "Spending categories", caption: "Automatic categories" },
      { tone: "sky", alt: "Savings goals", caption: "Goals that track themselves" },
    ],
    video: { title: "Tally in 90 seconds" },
    steps: [
      { title: "Connect an account", description: "Link your bank securely, or import a CSV if you prefer." },
      { title: "Review your categories", description: "Tally suggests categories; rename or merge any you like." },
      { title: "Set a monthly limit", description: "Pick an amount and Tally keeps a running safe-to-spend figure." },
      { title: "Get nudges, not nags", description: "Receive a heads-up when a category is close to its limit." },
    ],
    integrations: [
      { name: "Plaid", category: "Banking" },
      { name: "Apple Wallet", category: "Payments" },
      { name: "Google Sheets", category: "Export" },
      { name: "iCloud", category: "Sync" },
    ],
    specs: [
      { label: "Platforms", value: "iOS, Android, Web" },
      { label: "Data security", value: "Bank-grade encryption, read-only access" },
      { label: "Languages", value: "English, Spanish, Hindi" },
      { label: "Offline mode", value: "Yes" },
    ],
    pricing: [
      { name: "Free", price: "$0", description: "Everything you need to start.", features: ["2 linked accounts", "Automatic categories", "Monthly limit"] },
      {
        name: "Plus",
        price: "$4",
        period: "month",
        description: "For households and savers.",
        features: ["Unlimited accounts", "Shared budgets", "Savings goals", "CSV export"],
        highlighted: true,
      },
    ],
    faqs: [
      { question: "Can Tally move my money?", answer: "No. Tally has read-only access and can never move or spend funds." },
      { question: "Is there a web version?", answer: "Yes. Sign in at app.tally.example with the same account you use on mobile." },
      { question: "Can I share a budget?", answer: "Plus members can invite a partner to a shared budget." },
    ],
  },
  {
    slug: "pipeline",
    name: "Pipeline",
    tagline: "A CRM your sales team will actually keep up to date.",
    audience: "business",
    summary:
      "A lightweight CRM that logs calls and emails automatically, so reps spend time selling and managers get an accurate forecast.",
    media: { tone: "indigo", alt: "Pipeline deal board" },
    icon: "trending-up",
    stat: { value: 18000, label: "active users" },
    rating: { value: 4.6, count: 860 },
    cta: { label: "Start free trial", href: "#pricing" },
    purpose: {
      problem: "CRMs go stale because updating them is a second job, and forecasts built on stale data miss.",
      solution:
        "Pipeline captures activity from your inbox and calendar, updates deal stages from signals, and flags deals that have gone quiet.",
      outcomes: ["Activity logged automatically", "Forecasts built on live data", "Onboard a team in a day"],
    },
    screenshots: [
      { tone: "indigo", alt: "Deal board", caption: "Drag-and-drop deal board" },
      { tone: "violet", alt: "Forecast view", caption: "Forecasts that update themselves" },
      { tone: "sky", alt: "Contact timeline", caption: "Every touchpoint in one timeline" },
      { tone: "teal", alt: "Team dashboard", caption: "Team performance dashboard" },
    ],
    video: { title: "Pipeline product tour" },
    steps: [
      { title: "Connect email and calendar", description: "Pipeline starts logging meetings and threads against the right deals." },
      { title: "Import your contacts", description: "Bring contacts over from a CSV or your previous CRM in a few clicks." },
      { title: "Define your stages", description: "Match the board to your sales process, from lead to closed." },
      { title: "Review the forecast", description: "Watch weighted pipeline and at-risk deals update in real time." },
    ],
    integrations: [
      { name: "Gmail", category: "Email" },
      { name: "Outlook", category: "Email" },
      { name: "Slack", category: "Messaging" },
      { name: "Stripe", category: "Billing" },
      { name: "Zapier", category: "Automation" },
      { name: "HubSpot", category: "Import" },
    ],
    specs: [
      { label: "Deployment", value: "Cloud (SaaS)" },
      { label: "Compliance", value: "SOC 2 Type II, GDPR" },
      { label: "SSO", value: "Google, Microsoft, SAML" },
      { label: "API", value: "REST and webhooks" },
    ],
    pricing: [
      { name: "Starter", price: "$19", period: "user / month", description: "For small teams.", features: ["Deal board", "Email sync", "Basic reports"] },
      {
        name: "Growth",
        price: "$39",
        period: "user / month",
        description: "For scaling sales teams.",
        features: ["Everything in Starter", "Forecasting", "Automations", "Slack alerts"],
        highlighted: true,
      },
      { name: "Enterprise", price: "Custom", description: "For large organisations.", features: ["SAML SSO", "Audit logs", "Dedicated support"] },
    ],
    faqs: [
      { question: "Is there a free trial?", answer: "Yes, 14 days on the Growth plan with no card required." },
      { question: "Can we migrate from another CRM?", answer: "Yes. Import CSVs directly, or ask us to run the migration for you." },
      { question: "Where is data hosted?", answer: "In the EU or US; you choose at sign-up." },
    ],
  },
  {
    slug: "nook",
    name: "Nook",
    tagline: "Notes that organise themselves.",
    audience: "everyone",
    summary:
      "A fast, private notes app with smart search and automatic linking, useful for a grocery list or a whole team's knowledge base.",
    media: { tone: "violet", alt: "Nook notes editor" },
    icon: "file-text",
    stat: { value: 1200000, label: "downloads" },
    rating: { value: 4.7, count: 38500 },
    cta: { label: "Get Nook free", href: "#pricing" },
    purpose: {
      problem: "Notes pile up in folders nobody maintains, and the thing you need is never where you left it.",
      solution: "Nook links related notes as you write and finds anything with plain-language search, so folders become optional.",
      outcomes: ["Find any note in seconds", "Works offline, syncs everywhere", "Share a note or a whole space"],
    },
    screenshots: [
      { tone: "violet", alt: "Editor", caption: "A distraction-free editor" },
      { tone: "rose", alt: "Linked notes graph", caption: "Automatic links between notes" },
      { tone: "indigo", alt: "Search results", caption: "Search that understands you" },
    ],
    video: { title: "Getting started with Nook" },
    steps: [
      { title: "Write anything", description: "Start typing; Nook saves as you go." },
      { title: "Let links appear", description: "Related notes surface in the sidebar as you write." },
      { title: "Search in plain language", description: "Ask for “that recipe from last spring” and Nook finds it." },
    ],
    integrations: [
      { name: "Google Drive", category: "Files" },
      { name: "Dropbox", category: "Files" },
      { name: "Notion", category: "Import" },
      { name: "Readwise", category: "Highlights" },
      { name: "Slack", category: "Messaging" },
    ],
    specs: [
      { label: "Platforms", value: "macOS, Windows, iOS, Android, Web" },
      { label: "Privacy", value: "End-to-end encrypted sync" },
      { label: "Export", value: "Markdown, PDF" },
      { label: "Storage", value: "Unlimited notes" },
    ],
    pricing: [
      { name: "Personal", price: "$0", description: "Free forever for individuals.", features: ["Unlimited notes", "Sync on 2 devices", "Smart search"] },
      { name: "Pro", price: "$6", period: "month", description: "For power users.", features: ["Unlimited devices", "Version history", "Publishing"], highlighted: true },
      { name: "Teams", price: "$10", period: "user / month", description: "Shared knowledge for teams.", features: ["Shared spaces", "Permissions", "Admin controls"] },
    ],
    faqs: [
      { question: "Can I import from other apps?", answer: "Yes. Nook imports from Notion, Evernote, Apple Notes and Markdown folders." },
      { question: "Is my data private?", answer: "Notes are end-to-end encrypted; we cannot read them." },
    ],
  },
  {
    slug: "shiftwise",
    name: "Shiftwise",
    tagline: "Staff scheduling in minutes, not afternoons.",
    audience: "business",
    summary:
      "Build rotas, handle swaps and track hours for hourly teams from one app, with labour costs visible before you publish.",
    media: { tone: "sky", alt: "Shiftwise weekly rota" },
    icon: "calendar",
    stat: { value: 9500, label: "active users" },
    rating: { value: 4.5, count: 410 },
    cta: { label: "Book a demo", href: mailtoHref("Shiftwise demo") },
    purpose: {
      problem: "Managers of hourly teams lose hours each week to spreadsheets, group chats and last-minute swaps.",
      solution: "Shiftwise builds a rota from availability and demand, lets staff swap shifts with approval, and exports hours to payroll.",
      outcomes: ["Rotas built 5x faster", "Fewer no-shows with reminders", "Payroll-ready timesheets"],
    },
    screenshots: [
      { tone: "sky", alt: "Weekly rota", caption: "The weekly rota" },
      { tone: "amber", alt: "Shift swap request", caption: "Swaps with manager approval" },
      { tone: "emerald", alt: "Labour cost report", caption: "Labour cost before you publish" },
    ],
    video: { title: "Build a rota with Shiftwise" },
    steps: [
      { title: "Add your team", description: "Invite staff by email or phone; they set their own availability." },
      { title: "Generate a rota", description: "Shiftwise fills shifts from availability and your staffing targets." },
      { title: "Publish and notify", description: "Staff get the rota on their phone with reminders before each shift." },
      { title: "Export timesheets", description: "Approved hours flow to payroll at the end of the period." },
    ],
    integrations: [
      { name: "Xero", category: "Payroll" },
      { name: "QuickBooks", category: "Accounting" },
      { name: "Gusto", category: "Payroll" },
      { name: "Square", category: "POS" },
    ],
    specs: [
      { label: "Platforms", value: "Web, iOS, Android" },
      { label: "Team size", value: "5 to 5,000 staff" },
      { label: "Locations", value: "Multi-site support" },
      { label: "Support", value: "Live chat, 7 days a week" },
    ],
    faqs: [
      { question: "How is Shiftwise priced?", answer: "Per active staff member per month. Book a demo for a quote for your team." },
      { question: "Does it handle multiple locations?", answer: "Yes. Manage every site from one account with per-site permissions." },
    ],
  },
  {
    slug: "habitu",
    name: "Habitu",
    tagline: "Small habits, tracked kindly.",
    audience: "individual",
    summary:
      "A calm habit tracker built around streaks that forgive a missed day, with reflections that show how far you have come.",
    media: { tone: "rose", alt: "Habitu habit list" },
    icon: "leaf",
    stat: { value: 480000, label: "downloads" },
    rating: { value: 4.9, count: 21000 },
    cta: { label: "Download Habitu", href: "#pricing" },
    purpose: {
      problem: "Most habit apps punish a single missed day, which is exactly when people quit.",
      solution: "Habitu uses flexible streaks and weekly reflections so progress feels steady rather than fragile.",
      outcomes: ["Forgiving streaks", "Weekly reflections", "Home-screen widgets"],
    },
    screenshots: [
      { tone: "rose", alt: "Today view", caption: "Today's habits" },
      { tone: "amber", alt: "Weekly reflection", caption: "Weekly reflection" },
      { tone: "violet", alt: "Widgets", caption: "Home-screen widgets" },
    ],
    video: { title: "Why Habitu is different" },
    steps: [
      { title: "Pick a few habits", description: "Start with up to three; Habitu suggests realistic targets." },
      { title: "Check in daily", description: "Tap once from the app or a widget." },
      { title: "Reflect weekly", description: "A short summary shows trends and celebrates progress." },
    ],
    integrations: [
      { name: "Apple Health", category: "Health" },
      { name: "Google Fit", category: "Health" },
      { name: "Google Calendar", category: "Calendar" },
    ],
    specs: [
      { label: "Platforms", value: "iOS, Android, watchOS" },
      { label: "Account", value: "Optional; works fully offline" },
      { label: "Accessibility", value: "Dynamic type, VoiceOver, TalkBack" },
    ],
    pricing: [
      { name: "Free", price: "$0", description: "Up to three habits.", features: ["Flexible streaks", "Widgets", "Reminders"] },
      { name: "Unlimited", price: "$19", period: "year", description: "Every habit, every insight.", features: ["Unlimited habits", "Reflections", "Health sync"], highlighted: true },
    ],
    faqs: [
      { question: "Do I need an account?", answer: "No. An account is only needed to sync between devices." },
      { question: "Can I pause a habit?", answer: "Yes. Pause anytime without losing your history." },
    ],
  },
  {
    slug: "pagecraft",
    name: "Pagecraft",
    tagline: "A good-looking website by this afternoon.",
    audience: "everyone",
    summary:
      "A website builder for portfolios, small shops and side projects, with templates that look professional on any screen.",
    media: { tone: "amber", alt: "Pagecraft site editor" },
    icon: "layout",
    stat: { value: 65000, label: "active users" },
    rating: { value: 4.4, count: 2900 },
    cta: { label: "Build your site", href: "#pricing" },
    purpose: {
      problem: "Website builders are either too simple to look good or too complex to finish.",
      solution: "Pagecraft offers opinionated templates and a guided editor, so anyone can publish a polished site in an afternoon.",
      outcomes: ["Publish in under an hour", "Mobile-ready by default", "Custom domains included"],
    },
    screenshots: [
      { tone: "amber", alt: "Template gallery", caption: "Start from a template" },
      { tone: "sky", alt: "Visual editor", caption: "Edit right on the page" },
      { tone: "emerald", alt: "Analytics", caption: "Built-in visitor analytics" },
    ],
    video: { title: "Publish a site with Pagecraft" },
    steps: [
      { title: "Choose a template", description: "Pick from portfolios, shops, events and more." },
      { title: "Make it yours", description: "Swap text, images and colours right on the page." },
      { title: "Connect a domain", description: "Use a free subdomain or connect your own in a few clicks." },
      { title: "Publish", description: "Go live instantly; changes publish whenever you save." },
    ],
    integrations: [
      { name: "Stripe", category: "Payments" },
      { name: "Mailchimp", category: "Email" },
      { name: "Instagram", category: "Social" },
      { name: "Google Analytics", category: "Analytics" },
      { name: "Calendly", category: "Booking" },
    ],
    specs: [
      { label: "Hosting", value: "Global CDN, SSL included" },
      { label: "Templates", value: "80+ responsive templates" },
      { label: "Commerce", value: "Up to 500 products" },
    ],
    pricing: [
      { name: "Starter", price: "$0", description: "A free site on a Pagecraft subdomain.", features: ["1 site", "Core templates", "SSL"] },
      { name: "Site", price: "$12", period: "month", description: "Your own domain, no ads.", features: ["Custom domain", "All templates", "Analytics"], highlighted: true },
      { name: "Shop", price: "$24", period: "month", description: "Sell online.", features: ["Everything in Site", "Online store", "Stripe payments"] },
    ],
    faqs: [
      { question: "Do I need to code?", answer: "No. Everything is visual, although you can add custom code on paid plans." },
      { question: "Can I move my existing domain?", answer: "Yes. Connect any domain you own, or transfer it to Pagecraft." },
    ],
  },
];
