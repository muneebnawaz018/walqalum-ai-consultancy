/**
 * Copy for the inner pages.
 *
 * The design only drew the home page, so this is written to match its voice
 * rather than copied from it: plain claims, no adjectives doing the work of
 * evidence, and the same refusal to promise what has not shipped.
 *
 * Nothing here invents a metric. Where a number would belong and is not
 * confirmed, the sentence is written without one.
 */

/** The eight sectors, carried over from the existing site's own list. */
export const INDUSTRIES = [
  {
    num: "01",
    slug: "healthcare",
    name: "Healthcare",
    desc: "Clinical documentation, triage support and patient correspondence, built where an audit trail and a human sign-off are not optional.",
  },
  {
    num: "02",
    slug: "finance",
    name: "Finance",
    desc: "Reconciliation, reporting and document review, with every model output traceable to the record it came from.",
  },
  {
    num: "03",
    slug: "real-estate",
    name: "Real estate",
    desc: "Listing intelligence, valuation support and tenant correspondence across portfolios that outgrew their spreadsheets.",
  },
  {
    num: "04",
    slug: "retail",
    name: "Retail & commerce",
    desc: "Catalogue enrichment, demand signals and support automation that survive a peak trading week.",
  },
  {
    num: "05",
    slug: "education",
    name: "Education",
    desc: "Assessment support, content generation and student-facing assistants, with a clear line between help and answer.",
  },
  {
    num: "06",
    slug: "manufacturing",
    name: "Manufacturing",
    desc: "Quality inspection, maintenance forecasting and shop-floor reporting on data that was never collected for AI.",
  },
  {
    num: "07",
    slug: "fintech",
    name: "Fintech",
    desc: "Onboarding, KYC document handling and fraud signals, under the review process that regulation actually requires.",
  },
  {
    num: "08",
    slug: "legal",
    name: "Legal & professional",
    desc: "Contract review, discovery and precedent search, where a confident wrong answer costs more than no answer.",
  },
];

/** What the firm is, for the About page. */
export const ABOUT = {
  lede: "An AI consultancy and engineering agency. Fifteen years of production software under everything we ship, across three offices and eight sectors.",
  position: [
    {
      num: "01",
      name: "One accountable team",
      desc: "The Big Four write the strategy and hand you a deck. Integrators build what the deck says, late. We do both, and the same team answers for the result.",
    },
    {
      num: "02",
      name: "AI where it earns its place",
      desc: "Most of what gets sold as AI is a workflow problem wearing a model. We will tell you when that is the case, including when it costs us the engagement.",
    },
    {
      num: "03",
      name: "Built to outlive the launch",
      desc: "Evals, monitoring, access control and rollback paths are part of shipping, not a phase after it. The agent that impressed the board still runs a year later.",
    },
  ],
  offices: [
    { city: "Sharjah", country: "United Arab Emirates", tel: "+971 54 744 8002" },
    { city: "Lahore", country: "Pakistan", tel: "+92 322 4696562" },
    { city: "Dubbo", country: "Australia", tel: "+61 470 669 147" },
  ],
};

/** How to reach the firm, for the Contact page. */
export const CONTACT = {
  email: "tafseel@walqalum.com",
  lede: "Tell us what you are trying to build, or what has stalled. We reply with a straight answer about whether we are the right team for it.",
};
