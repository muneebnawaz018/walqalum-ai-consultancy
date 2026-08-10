/**
 * Fills a fresh database with enough to click around: one marketing account and
 * a handful of bilingual posts, some published and one still a draft so the
 * newsroom's draft/published split has something to show.
 *
 *   npm run seed:demo
 *
 * The account it creates is SEED_EMAIL / SEED_PASSWORD from
 * `.env.development.local`, which is also the account the integration suite
 * signs in as.
 *
 * Safe to re-run. Posts are upserted by slug and the account is upserted by
 * email, so nothing duplicates. Pass --force to overwrite posts you have since
 * edited by hand; without it, existing slugs are left alone.
 */
import { posts, readingMinutes, type PostDoc } from "../lib/db";
import { requireAccount, resolveAccount, upsertAccount } from "./account";

const FORCE = process.argv.includes("--force");

/**
 * The account comes from the same place `seed:admin` gets it, so the two cannot
 * describe different logins. `--force` is a flag rather than a positional, so
 * it is filtered out before the account resolver reads argv.
 */
const ACCOUNT = resolveAccount(process.argv.slice(2).filter((a) => !a.startsWith("--")));

type Seed = Omit<PostDoc, "_id" | "author" | "readingMinutes" | "updatedAt" | "publishedAt"> & {
  daysAgo: number | null;
};

const POSTS: Seed[] = [
  {
    slug: "what-production-ready-ai-actually-means",
    status: "published",
    daysAgo: 6,
    featured: true,
    category: { en: "AI / ML", ar: "ذكاء اصطناعي" },
    cover: { url: "", alt: { en: "", ar: "" } },
    title: {
      en: "What ‘production-ready AI’ actually means",
      ar: "ماذا يعني فعلًا ذكاء اصطناعي جاهز للإنتاج",
    },
    excerpt: {
      en: "Most AI pilots stall at the demo. The real gap is everything between a notebook and a system your team can run.",
      ar: "تتعثّر معظم تجارب الذكاء الاصطناعي عند العرض. الفجوة الحقيقية هي كل ما بين الدفتر ونظام يشغّله فريقك.",
    },
    body: {
      en: [
        "A demo proves a model can be right once. Production asks a harder question: what happens the thousandth time, on a Tuesday, when the input is malformed and the person waiting is a customer.",
        "",
        "## The gap nobody budgets for",
        "",
        "Between a notebook and a running system sits the work that rarely makes it into a proposal:",
        "",
        "- **Evaluation** that reflects the decision, not a leaderboard metric",
        "- **Monitoring** that notices the model drifting before a customer does",
        "- **Fallbacks** for the cases the model should refuse to answer",
        "- **Audit trails**, because someone will eventually ask why",
        "",
        "## Start from the decision",
        "",
        "We ask what decision gets made better, then work back to the smallest model that reaches it. That order matters. Starting from the model produces something impressive that nobody uses.",
        "",
        "> If you cannot name the decision, you are not ready to train anything.",
      ].join("\n"),
      ar: [
        "يُثبت العرض التوضيحي أن النموذج قد يصيب مرّة. أما الإنتاج فيسأل سؤالًا أصعب: ماذا يحدث في المرّة الألف، حين تكون المدخلات مشوّهة ومن ينتظر عميل.",
        "",
        "## الفجوة التي لا يحسب لها أحد حسابًا",
        "",
        "بين الدفتر والنظام العامل يقع العمل الذي نادرًا ما يظهر في العروض:",
        "",
        "- **تقييم** يعكس القرار لا مقياسًا في لوحة صدارة",
        "- **مراقبة** تلاحظ انحراف النموذج قبل أن يلاحظه العميل",
        "- **بدائل** للحالات التي ينبغي أن يمتنع النموذج عن الإجابة عنها",
        "- **أثر تدقيق**، لأن أحدهم سيسأل عن السبب يومًا ما",
        "",
        "## ابدأ من القرار",
        "",
        "نسأل أي قرار سيتحسّن، ثم نعود إلى أصغر نموذج يحقّقه. هذا الترتيب مهم. البدء من النموذج يُنتج شيئًا مبهرًا لا يستخدمه أحد.",
      ].join("\n"),
    },
    authorName: "Muneeb Siddique",
    reviewedBy: "WalQalum data engineering",
    tags: ["evaluation", "monitoring", "MLOps", "production"],
    faqs: [
      {
        q: { en: "How long does it take to get a model into production?", ar: "كم يستغرق نقل نموذج إلى الإنتاج؟" },
        a: {
          en: "The model is rarely the long pole. Evaluation, monitoring and the fallback path are, and they are what turn a demo into something your team can leave running.",
          ar: "النموذج نادرًا ما يكون العائق. التقييم والمراقبة ومسار البدائل هي ما يحوّل العرض إلى نظام يمكن لفريقك تركه يعمل.",
        },
      },
      {
        q: { en: "Do we need our own model?", ar: "هل نحتاج إلى نموذج خاص بنا؟" },
        a: {
          en: "Usually not at the start. We work back from the decision to the smallest model that reaches it, which is often a hosted one behind good retrieval.",
          ar: "غالبًا لا في البداية. نعود من القرار إلى أصغر نموذج يحقّقه، وكثيرًا ما يكون نموذجًا مستضافًا خلف استرجاع جيّد.",
        },
      },
    ],
    seo: {
      title: { en: "What production-ready AI actually means", ar: "ماذا يعني الذكاء الاصطناعي الجاهز للإنتاج" },
      description: {
        en: "The work between a notebook and a system your team can run: evaluation, monitoring, fallbacks and audit trails.",
        ar: "العمل الواقع بين الدفتر ونظام يشغّله فريقك: التقييم والمراقبة والبدائل وأثر التدقيق.",
      },
      ogImage: { url: "", alt: { en: "", ar: "" } },
      canonical: "",
      primaryKeyword: "production-ready AI",
      keywords: ["AI evaluation", "model monitoring", "AI in production"],
      noindex: false,
      jsonLd: "",
    },
  },
  {
    slug: "cutting-cloud-spend-without-cutting-corners",
    status: "published",
    daysAgo: 34,
    featured: false,
    category: { en: "Data", ar: "بيانات" },
    cover: { url: "", alt: { en: "", ar: "" } },
    title: {
      en: "Cutting cloud spend without cutting corners",
      ar: "خفض إنفاق السحابة دون المساس بالجودة",
    },
    excerpt: {
      en: "A calm, boring audit that trimmed a client's monthly bill by a third, and what we would never touch.",
      ar: "تدقيق هادئ وممل قلّص فاتورة عميل الشهرية بالثلث، وما لا نمسّه أبدًا.",
    },
    body: {
      en: [
        "Cloud bills grow the way clutter does: one reasonable decision at a time. The audit that fixes it is not clever, it is patient.",
        "",
        "## Where the money actually was",
        "",
        "- Idle GPU capacity held for a training job that finished in March",
        "- Three environments where the staging one had production-sized instances",
        "- Logs retained for seven years because nobody chose a number",
        "",
        "## What we left alone",
        "",
        "Backups, replicas and the on-call alerting path. Savings that show up as an outage are not savings, and the first person to discover the trade was made would be a customer.",
      ].join("\n"),
      ar: [
        "تنمو فواتير السحابة كما تنمو الفوضى: قرار معقول في كل مرّة. والتدقيق الذي يعالجها ليس ذكيًّا بل صبورًا.",
        "",
        "## أين كان المال فعلًا",
        "",
        "- طاقة معالجات رسومية خاملة محجوزة لمهمّة تدريب انتهت في مارس",
        "- ثلاث بيئات، بيئة الاختبار فيها بحجم الإنتاج",
        "- سجلّات محفوظة سبع سنوات لأن أحدًا لم يختر رقمًا",
        "",
        "## وما لم نمسّه",
        "",
        "النسخ الاحتياطي والنسخ المتماثلة ومسار تنبيهات المناوبة. التوفير الذي يظهر على شكل انقطاع ليس توفيرًا.",
      ].join("\n"),
    },
    seo: {
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
      ogImage: { url: "", alt: { en: "", ar: "" } },
      canonical: "",
      primaryKeyword: "",
      keywords: [],
      noindex: false,
      jsonLd: "",
    },
  },
  {
    slug: "designing-for-arabic-lessons-from-real-rtl-work",
    status: "published",
    daysAgo: 68,
    featured: false,
    category: { en: "Design", ar: "تصميم" },
    cover: { url: "", alt: { en: "", ar: "" } },
    title: {
      en: "Designing for Arabic: lessons from real RTL work",
      ar: "التصميم للعربية: دروس من مشاريع RTL حقيقية",
    },
    excerpt: {
      en: "Mirroring a layout is the easy part. The details that actually make Arabic feel native.",
      ar: "عكس التخطيط هو الجزء السهل. التفاصيل التي تجعل العربية تبدو أصيلة حقًّا.",
    },
    body: {
      en: [
        "Flipping a layout takes an afternoon. Making it feel like it was designed in Arabic takes longer, and the difference is entirely in the details.",
        "",
        "## Things that break",
        "",
        "- Letter-spacing tuned for Latin, which pulls Arabic letterforms apart",
        "- Icons with direction baked in, so the arrow now points the wrong way",
        "- Numerals switched everywhere, including where the client uses Western ones",
        "",
        "## What we do now",
        "",
        "Type is chosen per script rather than scaled from one family, and every directional icon is mirrored by rule rather than by hand. Arabic copy is written, not translated.",
      ].join("\n"),
      ar: [
        "عكس التخطيط يستغرق بعد ظهيرة. أما جعله يبدو مصمَّمًا بالعربية فيستغرق أطول، والفرق كلّه في التفاصيل.",
        "",
        "## ما ينكسر",
        "",
        "- تباعد أحرف مضبوط للّاتينية، فيمزّق أشكال الحروف العربية",
        "- أيقونات ذات اتجاه مثبّت، فيشير السهم إلى الجهة الخطأ",
        "- تبديل الأرقام في كل مكان، حتى حيث يستخدم العميل الأرقام الغربية",
        "",
        "## ما نفعله الآن",
        "",
        "يُختار الخط لكل نظام كتابة على حدة، وتُعكس كل أيقونة اتجاهية بقاعدة لا يدويًّا. والنص العربي يُكتب ولا يُترجم.",
      ].join("\n"),
    },
    seo: {
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
      ogImage: { url: "", alt: { en: "", ar: "" } },
      canonical: "",
      primaryKeyword: "",
      keywords: [],
      noindex: false,
      jsonLd: "",
    },
  },
  {
    slug: "notes-on-evaluating-retrieval",
    status: "draft",
    daysAgo: null,
    featured: false,
    category: { en: "AI / ML", ar: "ذكاء اصطناعي" },
    cover: { url: "", alt: { en: "", ar: "" } },
    title: { en: "Notes on evaluating retrieval", ar: "ملاحظات في تقييم الاسترجاع" },
    excerpt: {
      en: "An unfinished draft, here so the newsroom has something in the draft column.",
      ar: "مسوّدة غير مكتملة، موجودة ليكون في عمود المسوّدات شيء.",
    },
    body: {
      en: "Retrieval quality is not one number. Recall tells you whether the answer was reachable; precision tells you whether the model had to wade through noise to reach it.\n\nStill writing this one.",
      ar: "",
    },
    seo: {
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
      ogImage: { url: "", alt: { en: "", ar: "" } },
      canonical: "",
      primaryKeyword: "",
      keywords: [],
      noindex: false,
      jsonLd: "",
    },
  },
];

async function main() {
  requireAccount(ACCOUNT);
  const { doc: account } = await upsertAccount(ACCOUNT);

  const postCol = await posts();
  let written = 0;
  let skipped = 0;

  for (const seed of POSTS) {
    const { daysAgo, ...rest } = seed;
    const existing = await postCol.findOne({ slug: seed.slug });
    if (existing && !FORCE) {
      skipped++;
      continue;
    }

    const publishedAt =
      seed.status === "published" && daysAgo != null ? new Date(Date.now() - daysAgo * 86_400_000) : null;

    await postCol.updateOne(
      { slug: seed.slug },
      {
        $set: {
          ...rest,
          publishedAt,
          updatedAt: new Date(),
          readingMinutes: readingMinutes(seed.body),
          author: { name: ACCOUNT.name, id: account?._id },
        },
      },
      { upsert: true }
    );
    written++;
  }

  const published = await postCol.countDocuments({ status: "published" });
  const drafts = await postCol.countDocuments({ status: "draft" });

  console.log("");
  console.log(`  Account   ${ACCOUNT.email}`);
  console.log(`  Password  the value of SEED_PASSWORD in .env.development.local`);
  console.log("");
  console.log(`  Posts     ${written} written, ${skipped} left alone${skipped ? " (use --force to overwrite)" : ""}`);
  console.log(`  In the db ${published} published, ${drafts} draft`);
  console.log("");
  console.log("  Sign in at /admin, read the blog at /blog");
  console.log("");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
