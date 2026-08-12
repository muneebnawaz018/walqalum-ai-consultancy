/**
 * The home page's copy, lifted from the design.
 *
 * Kept out of the components so the sections stay layout-only and the words can
 * be edited — or later translated — without touching markup. Copy is the
 * design's own; nothing here is invented.
 */

/** Client names for the marquee. */
export const CLIENTS = [
  "Tutors",
  "Securance",
  "Shumaila",
  "Epictory",
  "Bremod",
  "Misk",
] as const;

export type Capability = { num: string; name: string; desc: string };

export const CAPABILITIES: Capability[] = [
  {
    num: "01",
    name: "AI Agents & Automation",
    desc: "Autonomous and semi-autonomous agents that run real operations: triage, research, reporting, workflow orchestration, with guardrails and audit trails built in.",
  },
  {
    num: "02",
    name: "LLM Integration & RAG Systems",
    desc: "Language models grounded in your documents and data. Retrieval pipelines, evaluation harnesses and versioned prompts, not a thin wrapper around an API.",
  },
  {
    num: "03",
    name: "Machine Learning Engineering",
    desc: "Models trained, served and monitored as production software: feature pipelines, drift detection, rollback paths.",
  },
  {
    num: "04",
    name: "Data Intelligence",
    desc: "The layer AI depends on: warehouses, pipelines and decision dashboards that make your data usable before anything clever touches it.",
  },
  {
    num: "05",
    name: "Custom Software & SaaS",
    desc: "Fifteen years of product engineering. Web platforms, internal tools and SaaS products built to outlive their launch.",
  },
  {
    num: "06",
    name: "Cloud & DevOps",
    desc: "Infrastructure as code, CI/CD, observability and cost control across AWS, Azure and GCP.",
  },
];

export type Step = { num: string; name: string; desc: string };

export const STEPS: Step[] = [
  {
    num: "STEP 01",
    name: "Discover",
    desc: "We audit your data, workflows and constraints, and tell you plainly what AI can and cannot do for them.",
  },
  {
    num: "STEP 02",
    name: "Prototype",
    desc: "A working system on your real data within weeks, measured against success criteria we agree up front.",
  },
  {
    num: "STEP 03",
    name: "Ship",
    desc: "Hardening for production: evals, monitoring, access control, failure modes handled before launch day.",
  },
  {
    num: "STEP 04",
    name: "Scale",
    desc: "Extend across teams and geographies. We hand over cleanly or stay on as your engineering partner.",
  },
];

export type WorkItem = { slug: string; name: string; tags: string };

export const WORK: WorkItem[] = [
  {
    slug: "audit-platform",
    name: "Automated Website Audit Platform",
    tags: "AI AGENTS · N8N · AUTOMATION",
  },
  {
    slug: "securance",
    name: "Securance: Document Intelligence",
    tags: "RAG · LLM · COMPLIANCE",
  },
  {
    slug: "epictory",
    name: "Epictory: Rendering at Scale",
    tags: "ENGINEERING · CLOUD",
  },
];

export type Stat = { n: number; suffix: string; label: string };

export const STATS: Stat[] = [
  { n: 15, suffix: "", label: "YEARS SHIPPING" },
  { n: 30, suffix: "+", label: "ENGINEERS" },
  { n: 3, suffix: "", label: "COUNTRIES" },
  { n: 120, suffix: "+", label: "PROJECTS DELIVERED" },
];

export type Post = { slug: string; meta: string; title: string };

export const POSTS: Post[] = [
  {
    slug: "rag-security-review",
    meta: "JUL 2026 · RAG",
    title: "Why RAG pilots fail security review, and how to design past it",
  },
  {
    slug: "agent-evals",
    meta: "JUN 2026 · AGENTS",
    title: "Agent evals: what to measure before you let it touch production",
  },
  {
    slug: "boring-model",
    meta: "MAY 2026 · STRATEGY",
    title: "Choose the boring model. Spend the budget on your data instead.",
  },
];
