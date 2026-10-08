import type {
  CaseHighlight,
  Differentiator,
  FrameworkStage,
  Persona,
  ServiceOffering,
} from "../types";

// Commitments in this file (timelines, response times, IP ownership, stack)
// are proposed copy; confirm each one before launch.

export const personas: Persona[] = [
  {
    id: "business",
    label: "For Businesses",
    hash: "for-business",
    headline: "Modernize what slows you down. Build what grows you.",
    body: "You have customers, a team and systems that have outgrown their spreadsheets or their original developer. We become your engineering partner: we audit what exists, modernize it without downtime, and ship the web and mobile tools that drive your next stage of growth.",
    fit: [
      "Your core system is slow, fragile, or only one person understands it",
      "You're losing hours to manual work that software should do",
      "You need a reliable tech partner, not another freelancer to manage",
    ],
    deliverables: [
      "Technical audit and roadmap",
      "Legacy modernization",
      "Custom web platforms and internal tools",
      "Mobile apps for customers or staff",
      "Ongoing DevOps and support",
    ],
    engagement: "3–6 month build, then a monthly support plan",
    proofSlug: "harbor-logistics",
    cta: { label: "Plan My Modernization", service: "modernize" },
  },
  {
    id: "founder",
    label: "For Founders & Creators",
    hash: "for-founders",
    headline: "From idea to paying users, without the enterprise bloat.",
    body: "You have an idea, a budget that has to count, and no time to waste on features nobody wants. We validate it with real users first, design a focused MVP, and launch it in weeks, not quarters. You own all the code and IP from day one.",
    fit: [
      "You have an idea or a prototype but no technical co-founder",
      "You need something investors and early users can touch, fast",
      "You've been quoted six figures for a first version and know that's wrong",
    ],
    deliverables: [
      "Validation sprint",
      "Clickable prototype",
      "UI/UX design",
      "MVP build, web or mobile",
      "Launch and first-100-users plan",
    ],
    engagement: "2-week validation sprint, then an 8–12 week MVP",
    proofSlug: "orbit-mobile",
    cta: { label: "Scope My MVP", service: "build" },
  },
];

export const offerings: ServiceOffering[] = [
  {
    id: "design",
    icon: "pen",
    title: "UI/UX & Digital Product Design",
    promise: "Interfaces people understand on first use, and that convert.",
    deliverables: [
      "User research: interviews, competitor teardown, personas and journey maps",
      "Information architecture and low-fidelity wireframes",
      "Clickable high-fidelity prototype, tested with real users",
      "Design system: components, tokens and developer-ready specs",
      "Conversion review of sign-up, checkout and onboarding flows",
    ],
    stack: ["Figma", "FigJam", "Maze", "Design tokens", "WCAG 2.2 AA"],
    outcome: "Validate before you build, and avoid paying developers to rebuild screens users reject.",
    leadService: "design",
  },
  {
    id: "development",
    icon: "code",
    title: "Custom Web & Mobile Development",
    promise: "Production-grade apps built by senior engineers, shipped in two-week increments.",
    deliverables: [
      "Full-stack web apps: customer portals, SaaS platforms, internal tools",
      "Cross-platform mobile apps (React Native) or native iOS and Android",
      "API design and integrations: payments, CRM, ERP, banking",
      "AI features: search, classification, assistants and workflow automation",
      "Legacy modernization without downtime or data loss",
    ],
    stack: ["React", "Next.js", "Node.js", "React Native", "Swift", "Kotlin", "PostgreSQL", "Python"],
    outcome: "Working software every two weeks, and code you fully own.",
    leadService: "build",
  },
  {
    id: "devops",
    icon: "wrench",
    title: "Growth, Maintenance & DevOps",
    promise: "Keep your product fast, secure and improving after launch.",
    deliverables: [
      "Cloud infrastructure setup and cost optimization",
      "CI/CD pipelines, automated testing and staged releases",
      "Security hardening, dependency updates and backups",
      "Performance tuning: Core Web Vitals, API latency, app start time",
      "Monthly feature releases from engineers who know your code",
    ],
    stack: ["AWS", "Google Cloud", "Vercel", "Docker", "GitHub Actions", "Sentry"],
    outcome: "Fewer outages, lower cloud bills, and a product that keeps improving.",
    leadService: "devops",
  },
  {
    id: "marketing",
    icon: "megaphone",
    title: "Launch & Growth Marketing",
    promise: "An audience ready on launch day, not six months after.",
    deliverables: [
      "Brand identity and launch creative",
      "Landing pages and conversion copy",
      "Product video and social content",
      "Launch plan: channels, sequencing and a first-100-users playbook",
    ],
    stack: ["Brand", "Video", "Social", "SEO", "Analytics"],
    outcome: "Launch is ready when the code is.",
    leadService: "marketing",
  },
];

export const frameworkStages: FrameworkStage[] = [
  {
    name: "Validate",
    duration: "2 weeks, fixed price",
    activities: [
      "Problem interviews with target users",
      "Competitor, pricing and positioning scan",
      "Landing-page smoke test to measure real demand",
    ],
    output: "A go / pivot / stop brief",
    gate: "Evidence of demand",
  },
  {
    name: "Design",
    duration: "2–3 weeks",
    activities: [
      "Cut scope to the one job users will pay for",
      "Clickable prototype of the core flow",
      "Usability tests with target users",
    ],
    output: "Tested prototype and a fixed-price MVP quote",
    gate: "Users complete the core task unaided",
  },
  {
    name: "Build MVP",
    duration: "6–10 weeks",
    activities: [
      "Two-week sprints with a live demo at the end of each",
      "Analytics and error tracking from day one",
      "Security review and app-store readiness",
    ],
    output: "A live product in the hands of real users",
    gate: "Launch checklist passed",
  },
  {
    name: "Launch & Grow",
    duration: "Ongoing, monthly",
    activities: [
      "Launch plan and first-100-users playbook",
      "Weekly review of activation and retention",
      "Version 2 roadmap built from real usage data",
    ],
    output: "Retention data and a roadmap backed by it",
  },
];

export const incubationReasons: { title: string; description: string }[] = [
  {
    title: "We make the mistakes on our own money.",
    description: "Every lesson from our products shortens your build.",
  },
  {
    title: "We reuse proven building blocks.",
    description: "Sign-in, payments, analytics and notifications are already battle-tested, so your MVP starts weeks ahead.",
  },
  {
    title: "We think like founders.",
    description: "We've cut scope, chased retention and priced a product ourselves, so our advice is practical, not theoretical.",
  },
];

export const differentiators: Differentiator[] = [
  {
    icon: "file-text",
    title: "Transparent pricing",
    headline: "Fixed scope, fixed price, no surprises",
    description: "You get an itemised quote before we start. Changes are priced before they're built.",
  },
  {
    icon: "zap",
    title: "Agile delivery",
    headline: "Working software every two weeks",
    description: "A live demo at the end of every sprint, so you see progress instead of status reports.",
  },
  {
    icon: "users",
    title: "Founder-level support",
    headline: "Talk to the people building it",
    description: "A senior lead on every project and a shared channel. No account-manager relay.",
  },
  {
    icon: "rocket",
    title: "Proven product builders",
    headline: "We ship our own products too",
    description: "Our in-house apps run on the same process and components we use for you.",
  },
];

export const caseHighlights: CaseHighlight[] = [
  { slug: "fieldnote-launch", metric: "40K sign-ups in 90 days", persona: "founder" },
  { slug: "harbor-logistics", metric: "38% faster dispatch", persona: "business" },
  { slug: "canopy-launch", metric: "$1M ARR in 8 months", persona: "founder" },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "How much does a project cost?",
    answer:
      "It depends on scope. After a free discovery call we send an itemised, fixed-price quote per milestone, so you know the full cost before work starts. A two-week Validation Sprint is the lowest-risk way to begin.",
  },
  {
    question: "How long does an MVP take?",
    answer:
      "Most MVPs take 8–12 weeks after a two-week validation sprint. You see working software at the end of every two-week sprint along the way.",
  },
  {
    question: "Who owns the code and IP?",
    answer: "You do, from day one. The repository, designs and accounts are set up in your name.",
  },
  {
    question: "Will you sign an NDA?",
    answer: "Yes. Mention it when you get in touch and we'll send one before you share any details.",
  },
  {
    question: "Can you work with our existing team or codebase?",
    answer:
      "Yes. Many SMB projects start with a technical audit of what already exists, then we slot into your team and tools.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Most clients move to a monthly support plan with the same engineers who built the product: updates, monitoring and new features.",
  },
];
