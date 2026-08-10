/**
 * The products, and everything each product page shows. One source for the
 * home band, the products index and the detail pages.
 *
 * Deliberately no new numbers here beyond the single headline metric each
 * product already carried: the figures on this site are unverified, and a
 * detail page is exactly where invented ones would multiply.
 */
export type Bullet = { title: string; titleAr: string; desc: string; descAr: string };

export type Product = {
  slug: string;
  name: string;
  cat: string;
  catAr: string;
  status: "live" | "beta";
  img: string;
  /** One line, used on the card and as the page lede. */
  tagline: string;
  taglineAr: string;
  metric: string;
  metricLabel: string;
  metricLabelAr: string;
  /** Two sentences on the detail page, under the hero. */
  lede: string;
  ledeAr: string;
  useCases: Bullet[];
  solutions: Bullet[];
  integrations: string[];
  /** Slugs from lib/sectors.ts. */
  sectors: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "slotwise",
    name: "SlotWise",
    cat: "Healthcare",
    catAr: "الرعاية الصحية",
    status: "live",
    img: "ps180",
    tagline: "A no-show risk model that keeps multi-site clinics full without the overbooking chaos.",
    taglineAr: "نموذج مخاطر تغيّب يُبقي العيادات متعدّدة المواقع ممتلئة دون فوضى الحجز الزائد.",
    metric: "−32%",
    metricLabel: "fewer no-shows",
    metricLabelAr: "تغيّب أقل",
    lede: "SlotWise scores every appointment for the chance it will be missed, then reshapes the schedule before the gap appears. It runs alongside the booking system you already have, so nothing needs replacing.",
    ledeAr:
      "يُقيّم SlotWise كل موعد باحتمال تفويته، ثم يعيد تشكيل الجدول قبل أن تظهر الفجوة. يعمل إلى جانب نظام الحجز الذي لديك، فلا شيء يحتاج إلى استبدال.",
    useCases: [
      {
        title: "No-show risk scoring",
        titleAr: "تقييم مخاطر التغيّب",
        desc: "Every booking gets a score from attendance history, lead time, distance and how the patient responded to reminders.",
        descAr: "يحصل كل حجز على درجة من سجلّ الحضور ومهلة الحجز والمسافة وتفاعل المريض مع التذكيرات.",
      },
      {
        title: "Intelligent overbooking",
        titleAr: "حجز زائد ذكيّ",
        desc: "Doubles up only the slots the data supports, inside a ceiling each site sets for itself.",
        descAr: "يضاعف الحجز فقط في المواعيد التي تدعمها البيانات، ضمن سقف يحدّده كل موقع لنفسه.",
      },
      {
        title: "Waitlist matching",
        titleAr: "مطابقة قوائم الانتظار",
        desc: "When a slot frees up, it offers it to the patient most likely to accept it and turn up.",
        descAr: "حين يشغر موعد، يعرضه على المريض الأرجح أن يقبله ويحضر.",
      },
      {
        title: "Reminder timing",
        titleAr: "توقيت التذكير",
        desc: "Sends each reminder at the hour that patient tends to act on, rather than on one fixed schedule for everyone.",
        descAr: "يرسل كل تذكير في الساعة التي يستجيب فيها ذلك المريض عادةً، لا وفق جدول واحد للجميع.",
      },
      {
        title: "Capacity forecasting",
        titleAr: "التنبّؤ بالطاقة",
        desc: "Projects demand per site and per specialty, so rosters are set against expected load instead of last month's.",
        descAr: "يتوقّع الطلب لكل موقع وتخصّص، فتُبنى الجداول على الحمل المتوقّع لا على حمل الشهر الماضي.",
      },
      {
        title: "Load balancing across sites",
        titleAr: "موازنة الحمل بين المواقع",
        desc: "Offers a nearby clinic with earlier availability instead of leaving the patient on a longer wait.",
        descAr: "يعرض عيادة قريبة بموعد أبكر بدل ترك المريض في انتظار أطول.",
      },
      {
        title: "Recall and follow-up",
        titleAr: "الاستدعاء والمتابعة",
        desc: "Flags patients overdue for review and drafts the outreach for the front desk to send.",
        descAr: "يُعلّم المرضى المتأخّرين عن المراجعة ويصوغ رسالة التواصل ليرسلها الاستقبال.",
      },
      {
        title: "Utilisation reporting",
        titleAr: "تقارير الاستخدام",
        desc: "Shows where clinic time is lost, and what actually changed after each intervention.",
        descAr: "يُظهر أين يُهدر وقت العيادة، وما الذي تغيّر فعلًا بعد كل إجراء.",
      },
    ],
    solutions: [
      {
        title: "Runs beside your PMS",
        titleAr: "يعمل إلى جانب نظامك",
        desc: "Reads and writes through the practice management system you already run. No migration and no second diary to keep in step.",
        descAr: "يقرأ ويكتب عبر نظام إدارة العيادة القائم لديك. بلا ترحيل بيانات وبلا جدول ثانٍ تلاحق مزامنته.",
      },
      {
        title: "Your risk appetite, not ours",
        titleAr: "حدودك أنت لا حدودنا",
        desc: "Overbooking ceilings, escalation rules and reminder channels are per-site settings rather than assumptions baked into the model.",
        descAr: "سقوف الحجز الزائد وقواعد التصعيد وقنوات التذكير إعدادات لكل موقع، لا افتراضات مدفونة في النموذج.",
      },
      {
        title: "Every score explains itself",
        titleAr: "كل درجة تشرح نفسها",
        desc: "The factors behind a score are shown next to it, so staff can override with the reason recorded against the booking.",
        descAr: "تُعرض العوامل خلف كل درجة بجوارها، فيستطيع الموظّف تجاوزها مع تسجيل السبب على الحجز.",
      },
      {
        title: "Retrains on your attendance",
        titleAr: "يُعاد تدريبه على حضورك",
        desc: "The model keeps learning from what actually happens at your clinics, and drift is monitored rather than assumed away.",
        descAr: "يواصل النموذج التعلّم ممّا يحدث فعلًا في عياداتك، ويُراقَب انحرافه بدل تجاهله.",
      },
    ],
    integrations: ["HL7 / FHIR", "Epic", "Cerner", "Twilio", "Google Calendar", "Custom PMS"],
    sectors: ["healthcare"],
  },
  {
    slug: "ledgeriq",
    name: "LedgerIQ",
    cat: "Fintech",
    catAr: "التقنية المالية",
    status: "live",
    img: "ps20",
    tagline: "Document extraction and AI reconciliation for a month-end close without surprises.",
    taglineAr: "استخراج مستندات وتسوية بالذكاء الاصطناعي لإقفال شهري بلا مفاجآت.",
    metric: "4×",
    metricLabel: "faster close",
    metricLabelAr: "إقفال أسرع",
    lede: "LedgerIQ reads the documents, proposes the matches and hands you only what genuinely needs a human. Every suggestion arrives with the evidence that produced it, so approving it is a decision rather than a leap.",
    ledeAr:
      "يقرأ LedgerIQ المستندات ويقترح المطابقات ويحيل إليك ما يستدعي إنسانًا فعلًا. يصل كل اقتراح مصحوبًا بالدليل الذي أنتجه، فتصير الموافقة قرارًا لا قفزة.",
    useCases: [
      {
        title: "Invoice and receipt extraction",
        titleAr: "استخراج الفواتير والإيصالات",
        desc: "Pulls line items, tax and totals out of PDFs, scans and photographs, including the badly cropped ones.",
        descAr: "يستخرج البنود والضرائب والمجاميع من ملفات PDF والمسح والصور، بما فيها الرديئة القصّ.",
      },
      {
        title: "Bank statement reconciliation",
        titleAr: "تسوية كشوف البنك",
        desc: "Matches transactions to ledger entries and proposes a treatment for what will not match.",
        descAr: "يطابق الحركات بقيود الأستاذ ويقترح معالجة لما لا يطابق.",
      },
      {
        title: "Intercompany matching",
        titleAr: "المطابقة بين الشركات",
        desc: "Pairs entries across entities and currencies, and surfaces the ones that will not net to zero.",
        descAr: "يزاوج القيود عبر الكيانات والعملات، ويُبرز ما لن يتصافى إلى صفر.",
      },
      {
        title: "Exception triage",
        titleAr: "فرز الاستثناءات",
        desc: "Sorts unmatched items by how likely they are to be a real problem rather than by date received.",
        descAr: "يرتّب البنود غير المطابَقة بحسب احتمال كونها مشكلة حقيقية لا بحسب تاريخ الورود.",
      },
      {
        title: "Duplicate payment detection",
        titleAr: "كشف المدفوعات المكرّرة",
        desc: "Catches the same invoice paid twice under a different reference, supplier spelling or currency.",
        descAr: "يلتقط الفاتورة نفسها مدفوعة مرّتين تحت مرجع أو تهجئة مورّد أو عملة مختلفة.",
      },
      {
        title: "Accrual suggestions",
        titleAr: "اقتراح الاستحقاقات",
        desc: "Proposes accruals from open purchase orders and delivery evidence, with the source attached.",
        descAr: "يقترح استحقاقات من أوامر الشراء المفتوحة وأدلّة التسليم، مع إرفاق المصدر.",
      },
      {
        title: "Close checklist automation",
        titleAr: "أتمتة قائمة الإقفال",
        desc: "Tracks what is done, what is blocked and who it is waiting on, without a spreadsheet passed around.",
        descAr: "يتتبّع المنجَز والمعطَّل ومن يُنتظر منه، دون جدول يُتداول باليد.",
      },
      {
        title: "Audit pack assembly",
        titleAr: "تجميع ملف التدقيق",
        desc: "Collects the supporting documents behind every posting into one pack the auditor can walk through.",
        descAr: "يجمع المستندات المؤيّدة خلف كل قيد في ملف واحد يمكن للمدقّق تتبّعه.",
      },
    ],
    solutions: [
      {
        title: "Ledger-agnostic",
        titleAr: "لا يرتبط بدفتر بعينه",
        desc: "Sits on top of the ledger you already keep. Nothing is migrated and the ledger stays the system of record.",
        descAr: "يجلس فوق الدفتر الذي تمسكه أصلًا. لا يُرحَّل شيء ويبقى الدفتر هو السجلّ المعتمد.",
      },
      {
        title: "Evidence on every match",
        titleAr: "دليل مع كل مطابقة",
        desc: "Each proposal links back to the document region and the rule that produced it, which is what an auditor asks for.",
        descAr: "يعود كل اقتراح إلى موضعه في المستند وإلى القاعدة التي أنتجته، وهو ما يطلبه المدقّق.",
      },
      {
        title: "Approval thresholds you set",
        titleAr: "حدود موافقة تضبطها",
        desc: "Below your confidence line it posts; above it, a person signs. Where that line sits is your call, per account.",
        descAr: "دون خطّ الثقة يُرحَّل، وفوقه يوقّع إنسان. موضع الخطّ قرارك، لكل حساب.",
      },
      {
        title: "Your data stays put",
        titleAr: "بياناتك تبقى مكانها",
        desc: "Runs in your tenant. Financial documents are not sent to a shared model and are not used to train anyone else's.",
        descAr: "يعمل داخل بيئتك. لا تُرسَل المستندات المالية إلى نموذج مشترك ولا تُستخدم لتدريب نموذج غيرك.",
      },
    ],
    integrations: ["Xero", "QuickBooks", "NetSuite", "SAP", "Plaid", "CSV / SFTP"],
    sectors: ["finance", "fintech"],
  },
  {
    slug: "qalam-desk",
    name: "Qalam Desk",
    cat: "Support",
    catAr: "الدعم",
    status: "live",
    img: "banner",
    tagline: "An AI helpdesk that drafts the reply and routes what it should not answer alone.",
    taglineAr: "مكتب مساعدة بالذكاء الاصطناعي يصوغ الردّ ويُحيل ما لا ينبغي أن يجيب عنه وحده.",
    metric: "2h → 8m",
    metricLabel: "first response",
    metricLabelAr: "أول ردّ",
    lede: "Qalam Desk drafts from your own help centre and past resolved tickets, in English or Arabic, and hands the agent a reply to approve rather than a blank box. What it is not confident about, it routes instead of guessing.",
    ledeAr:
      "يصوغ Qalam Desk من مركز مساعدتك وتذاكرك المحلولة، بالعربية أو الإنجليزية، ويسلّم الموظّف ردًّا يوافق عليه بدل صندوق فارغ. وما لا يثق به يُحيله بدل أن يخمّن.",
    useCases: [
      {
        title: "Drafted replies",
        titleAr: "ردود مصاغة",
        desc: "Writes the answer from your documentation and previously resolved tickets, with the sources listed underneath.",
        descAr: "يكتب الجواب من توثيقك وتذاكرك المحلولة سابقًا، مع سرد المصادر أسفله.",
      },
      {
        title: "Intent routing",
        titleAr: "توجيه حسب النيّة",
        desc: "Reads what the customer actually wants and sends it to the queue that handles it, not the one named in the subject line.",
        descAr: "يقرأ ما يريده العميل فعلًا ويرسله إلى الطابور الذي يعالجه، لا الذي ذُكر في العنوان.",
      },
      {
        title: "Bilingual handling",
        titleAr: "معالجة ثنائية اللغة",
        desc: "Answers in the language the customer wrote in, and keeps the register consistent between English and Arabic.",
        descAr: "يجيب باللغة التي كتب بها العميل، ويحافظ على اتّساق الأسلوب بين العربية والإنجليزية.",
      },
      {
        title: "Escalation prediction",
        titleAr: "التنبّؤ بالتصعيد",
        desc: "Flags the tickets heading for a complaint while there is still time to change the outcome.",
        descAr: "يُعلّم التذاكر المتّجهة إلى شكوى بينما لا يزال في الوقت متّسع لتغيير المسار.",
      },
      {
        title: "Duplicate and merge",
        titleAr: "التكرار والدمج",
        desc: "Spots the same customer opening the same issue in three channels and joins the threads.",
        descAr: "يرصد العميل نفسه يفتح المشكلة نفسها في ثلاث قنوات ويدمج المسارات.",
      },
      {
        title: "Knowledge gap reports",
        titleAr: "تقارير فجوات المعرفة",
        desc: "Tells you what customers keep asking that your documentation does not answer.",
        descAr: "يخبرك بما يسأل عنه العملاء باستمرار ولا يجيب عنه توثيقك.",
      },
      {
        title: "SLA risk alerts",
        titleAr: "تنبيهات مخاطر مستوى الخدمة",
        desc: "Warns on the tickets about to breach, ranked by consequence rather than by clock alone.",
        descAr: "ينبّه على التذاكر الموشكة على الإخلال، مرتّبة بالأثر لا بالساعة وحدها.",
      },
      {
        title: "Macro suggestions",
        titleAr: "اقتراح الردود الجاهزة",
        desc: "Proposes a new saved reply when it notices the team writing the same answer by hand.",
        descAr: "يقترح ردًّا محفوظًا جديدًا حين يلاحظ الفريق يكتب الجواب نفسه يدويًّا.",
      },
    ],
    solutions: [
      {
        title: "Grounded in your help centre",
        titleAr: "مبنيّ على مركز مساعدتك",
        desc: "It answers from your content or it says it cannot. There is no general-knowledge fallback inventing a policy you do not have.",
        descAr: "يجيب من محتواك أو يقرّ بعجزه. لا رجوع إلى معرفة عامة تخترع سياسة لا تملكها.",
      },
      {
        title: "The agent stays in control",
        titleAr: "الموظّف يبقى المتحكّم",
        desc: "Drafts are proposals. Nothing reaches a customer without a person sending it, unless you explicitly turn that on per queue.",
        descAr: "المسوّدات اقتراحات. لا يصل شيء إلى العميل دون إرسال إنسان، ما لم تُفعّل ذلك صراحةً لكل طابور.",
      },
      {
        title: "Arabic that reads natively",
        titleAr: "عربية تُقرأ أصيلة",
        desc: "Right-to-left throughout, with the numerals, dates and honorifics a customer expects rather than a translated English reply.",
        descAr: "من اليمين إلى اليسار في كل شيء، بالأرقام والتواريخ وصيغ الخطاب التي يتوقّعها العميل، لا ردًّا إنجليزيًّا مترجمًا.",
      },
      {
        title: "Measured on resolution",
        titleAr: "يُقاس بالحلّ",
        desc: "Reporting is built around tickets actually resolved, not deflection rates that only prove customers gave up.",
        descAr: "تُبنى التقارير على التذاكر المحلولة فعلًا، لا على معدّلات صرف تُثبت أن العملاء استسلموا.",
      },
    ],
    integrations: ["Gmail", "Outlook", "Slack", "Zendesk", "Intercom", "Webhooks"],
    sectors: ["retail", "fintech", "education"],
  },
  {
    slug: "commercebridge",
    name: "CommerceBridge",
    cat: "Commerce",
    catAr: "التجارة",
    status: "live",
    img: "ps504",
    tagline: "Demand forecasting and catalogue enrichment kept in sync across every storefront.",
    taglineAr: "تنبّؤ بالطلب وإثراء للكتالوج متزامنان عبر كل متجر.",
    metric: "×2",
    metricLabel: "avg. order value",
    metricLabelAr: "متوسّط الطلب",
    lede: "CommerceBridge keeps one catalogue behind every channel you sell through, and forecasts what each of them will need. It optimises for margin, which is not the same thing as optimising for clicks.",
    ledeAr:
      "يُبقي CommerceBridge كتالوجًا واحدًا خلف كل قناة تبيع عبرها، ويتوقّع ما تحتاجه كل منها. يُحسّن للهامش، وهو غير التحسين للنقرات.",
    useCases: [
      {
        title: "Demand forecasting per SKU",
        titleAr: "تنبّؤ بالطلب لكل صنف",
        desc: "Projects sales by product and by market, with seasonality and promotions separated out.",
        descAr: "يتوقّع المبيعات لكل منتج وسوق، مع فصل الموسمية والعروض.",
      },
      {
        title: "Reorder points",
        titleAr: "نقاط إعادة الطلب",
        desc: "Sets the level at which each line should be reordered, given its own lead time rather than a blanket rule.",
        descAr: "يحدّد المستوى الذي يُعاد عنده طلب كل صنف، وفق مهلته الخاصة لا وفق قاعدة عامة.",
      },
      {
        title: "Catalogue enrichment",
        titleAr: "إثراء الكتالوج",
        desc: "Writes the missing titles, attributes and descriptions from what you already know about the product.",
        descAr: "يكتب العناوين والخصائص والأوصاف الناقصة ممّا تعرفه أصلًا عن المنتج.",
      },
      {
        title: "Variant and duplicate matching",
        titleAr: "مطابقة المتغيّرات والمكرّرات",
        desc: "Recognises the same product arriving from two suppliers under two names and joins them.",
        descAr: "يتعرّف على المنتج نفسه واردًا من مورّدَين باسمَين ويوحّدهما.",
      },
      {
        title: "Bundle selection",
        titleAr: "اختيار الحِزَم",
        desc: "Picks the bundles worth offering from what actually sells together at a margin you accept.",
        descAr: "يختار الحِزَم الجديرة بالعرض ممّا يُباع معًا فعلًا بهامش تقبله.",
      },
      {
        title: "Price sensitivity",
        titleAr: "حساسية السعر",
        desc: "Estimates how much volume a price change costs or buys, per market, before you commit to it.",
        descAr: "يقدّر ما يكلّفه أو يجلبه تغيير السعر من حجم مبيعات، لكل سوق، قبل أن تلتزم به.",
      },
      {
        title: "Search and ranking",
        titleAr: "البحث والترتيب",
        desc: "Orders results by what converts for that customer, not by whatever the theme sorted on by default.",
        descAr: "يرتّب النتائج بما يحوّل لذلك العميل، لا بما رتّبه القالب افتراضيًّا.",
      },
      {
        title: "Out-of-stock substitution",
        titleAr: "بدائل نفاد المخزون",
        desc: "Offers the nearest thing you can actually ship instead of showing an empty product page.",
        descAr: "يعرض أقرب بديل يمكنك شحنه فعلًا بدل إظهار صفحة منتج فارغة.",
      },
    ],
    solutions: [
      {
        title: "One catalogue, every channel",
        titleAr: "كتالوج واحد لكل قناة",
        desc: "Changes are made once and pushed out, so the marketplace listing and the storefront stop disagreeing about the same product.",
        descAr: "يُجرى التعديل مرّة ويُدفع إلى الجميع، فيكفّ إعلان السوق والمتجر عن الاختلاف حول المنتج نفسه.",
      },
      {
        title: "Margin-aware, not click-aware",
        titleAr: "مراعاة الهامش لا النقرة",
        desc: "The objective is contribution after shipping and returns, which is the number that pays wages.",
        descAr: "الهدف هو المساهمة بعد الشحن والمرتجعات، وهو الرقم الذي يدفع الرواتب.",
      },
      {
        title: "Forecasts you can override",
        titleAr: "توقّعات يمكنك تجاوزها",
        desc: "Planners can overwrite any number, and the override is kept as a signal rather than discarded at the next run.",
        descAr: "يستطيع المخطّط تجاوز أي رقم، ويُحتفظ بالتجاوز كإشارة بدل إهماله في الدورة التالية.",
      },
      {
        title: "Works with your stack",
        titleAr: "يعمل مع منظومتك",
        desc: "Sits behind the platforms you already sell on rather than asking you to replatform to adopt it.",
        descAr: "يجلس خلف المنصّات التي تبيع عليها بدل مطالبتك بتغييرها كي تتبنّاه.",
      },
    ],
    integrations: ["Shopify", "WooCommerce", "Magento", "Amazon", "Meta Catalog", "Google Merchant"],
    sectors: ["retail", "manufacturing"],
  },
  {
    slug: "sentryline",
    name: "Sentryline",
    cat: "Security",
    catAr: "الأمن",
    status: "beta",
    img: "ps0",
    tagline: "Anomaly detection that pages you for real threats and stays quiet otherwise.",
    taglineAr: "كشف شذوذ ينبّهك للتهديدات الحقيقية ويصمت فيما عداها.",
    metric: "90%",
    metricLabel: "less alert noise",
    metricLabelAr: "ضجيج تنبيهات أقل",
    lede: "Sentryline learns what normal looks like in your estate, then alerts on the departures from it. The design goal is the on-call engineer's sleep: an alert that fires has to be worth waking up for.",
    ledeAr:
      "يتعلّم Sentryline شكل الوضع الطبيعي في بيئتك، ثم ينبّه على الخروج عنه. هدف التصميم هو نوم المهندس المناوب: التنبيه الذي ينطلق يجب أن يستحقّ الاستيقاظ.",
    useCases: [
      {
        title: "Behavioural baselines",
        titleAr: "خطوط أساس سلوكية",
        desc: "Builds a picture of normal per account, per service and per hour, instead of one threshold for the whole estate.",
        descAr: "يبني صورة للوضع الطبيعي لكل حساب وخدمة وساعة، بدل عتبة واحدة للبيئة كلّها.",
      },
      {
        title: "Session anomalies",
        titleAr: "شذوذ الجلسات",
        desc: "Catches impossible travel, unusual device pairs and sessions that behave nothing like the account's history.",
        descAr: "يلتقط التنقّل المستحيل واقترانات الأجهزة غير المعتادة والجلسات التي لا تشبه سجلّ الحساب.",
      },
      {
        title: "Alert clustering",
        titleAr: "تجميع التنبيهات",
        desc: "Groups the forty alerts from one incident into one incident, with the forty still attached underneath.",
        descAr: "يجمع أربعين تنبيهًا من حادثة واحدة في حادثة واحدة، مع بقاء الأربعين مرفقة تحتها.",
      },
      {
        title: "Noise suppression",
        titleAr: "كبح الضجيج",
        desc: "Learns which alerts your team has closed as expected, and stops raising those without being told twice.",
        descAr: "يتعلّم أي تنبيهات أغلقها فريقك كأمر متوقّع، ويتوقّف عن رفعها دون أن يُقال له مرّتين.",
      },
      {
        title: "Phishing triage",
        titleAr: "فرز التصيّد",
        desc: "Reads reported messages, ranks them by how convincing the attempt actually is, and drafts the response.",
        descAr: "يقرأ الرسائل المبلّغ عنها، ويرتّبها بمدى إقناع المحاولة فعلًا، ويصوغ الردّ.",
      },
      {
        title: "Log anomaly detection",
        titleAr: "كشف شذوذ السجلّات",
        desc: "Finds the pattern that is new rather than the pattern someone thought to write a rule for last year.",
        descAr: "يجد النمط الجديد بدل النمط الذي كتب أحدهم له قاعدة العام الماضي.",
      },
      {
        title: "Incident timelines",
        titleAr: "خطوط زمنية للحوادث",
        desc: "Assembles what happened in what order across systems, so the write-up does not start from a blank page.",
        descAr: "يجمع ما حدث وبأي ترتيب عبر الأنظمة، فلا يبدأ التقرير من صفحة فارغة.",
      },
      {
        title: "On-call handover",
        titleAr: "تسليم المناوبة",
        desc: "Summarises the shift: what fired, what was dismissed and why, and what is still open.",
        descAr: "يلخّص المناوبة: ما انطلق، وما رُفض ولماذا، وما لا يزال مفتوحًا.",
      },
    ],
    solutions: [
      {
        title: "Learns your normal",
        titleAr: "يتعلّم وضعك الطبيعي",
        desc: "There is no generic threat profile to tune away. The baseline is built from your own estate over its first weeks.",
        descAr: "لا ملفّ تهديدات عامّ تضبطه بالحذف. يُبنى خطّ الأساس من بيئتك خلال أسابيعها الأولى.",
      },
      {
        title: "Evidence with every alert",
        titleAr: "دليل مع كل تنبيه",
        desc: "The raw events behind a detection travel with it, so triage starts from the facts and not from a severity label.",
        descAr: "تسافر الأحداث الخام خلف الاكتشاف معه، فيبدأ الفرز من الوقائع لا من وسم خطورة.",
      },
      {
        title: "Tuned for on-call",
        titleAr: "مضبوط للمناوبة",
        desc: "Paging thresholds are separate from logging thresholds, so the quiet signals are recorded without waking anyone.",
        descAr: "عتبات الاستدعاء منفصلة عن عتبات التسجيل، فتُسجَّل الإشارات الهادئة دون إيقاظ أحد.",
      },
      {
        title: "Logs stay on your side",
        titleAr: "السجلّات تبقى عندك",
        desc: "It reads where your logs already live. Raw security telemetry is not copied into someone else's account to be useful.",
        descAr: "يقرأ حيث تسكن سجلّاتك أصلًا. لا تُنسخ قياسات الأمن الخام إلى حساب غيرك لتكون مفيدة.",
      },
    ],
    integrations: ["AWS CloudTrail", "Okta", "Microsoft 365", "Datadog", "PagerDuty", "Syslog"],
    sectors: ["fintech", "finance", "healthcare"],
  },
  {
    slug: "looplearn",
    name: "LoopLearn",
    cat: "Education",
    catAr: "التعليم",
    status: "beta",
    img: "ps2",
    tagline: "An offline-first tutor that adapts to each learner, for teams that train in the field.",
    taglineAr: "مُعلّم يعمل دون اتصال ويتكيّف مع كل متعلّم، للفرق التي تتدرّب ميدانيًّا.",
    metric: "+41%",
    metricLabel: "completion",
    metricLabelAr: "الإتمام",
    lede: "LoopLearn teaches from your material, adapts the path from how each learner answers, and keeps working when the signal does not. Progress syncs when the device is next online, so a dropped connection never costs a session.",
    ledeAr:
      "يُدرّس LoopLearn من موادّك، ويكيّف المسار بحسب إجابات كل متعلّم، ويواصل العمل حين ينقطع الاتصال. يتزامن التقدّم عند اتّصال الجهاز التالي، فلا يكلّف الانقطاع جلسةً أبدًا.",
    useCases: [
      {
        title: "Adaptive learning paths",
        titleAr: "مسارات تعلّم تكيّفية",
        desc: "Moves each learner on when they have it and back when they do not, from their answers rather than a fixed order.",
        descAr: "ينقل كل متعلّم للأمام حين يتقن ويعود به حين لا يتقن، من إجاباته لا من ترتيب ثابت.",
      },
      {
        title: "Automated marking",
        titleAr: "تصحيح آليّ",
        desc: "Marks written answers against your rubric and shows which criterion drove the score.",
        descAr: "يصحّح الإجابات المكتوبة وفق معاييرك ويُظهر أي معيار حدّد الدرجة.",
      },
      {
        title: "Question generation",
        titleAr: "توليد الأسئلة",
        desc: "Writes practice questions from your own source material, at the difficulty the learner is currently at.",
        descAr: "يكتب أسئلة تدريب من موادّك أنت، بالمستوى الذي يقف عنده المتعلّم حاليًّا.",
      },
      {
        title: "Misconception detection",
        titleAr: "كشف المفاهيم الخاطئة",
        desc: "Recognises the specific wrong model behind a wrong answer, and teaches against that rather than repeating the lesson.",
        descAr: "يتعرّف على الفهم الخاطئ المحدّد خلف الإجابة الخاطئة، ويعالجه بدل إعادة الدرس.",
      },
      {
        title: "Offline sync",
        titleAr: "مزامنة دون اتصال",
        desc: "The whole course runs on the device. Answers, progress and marking reconcile when a connection returns.",
        descAr: "تعمل الدورة كاملة على الجهاز. تتصالح الإجابات والتقدّم والتصحيح عند عودة الاتصال.",
      },
      {
        title: "Spaced recall",
        titleAr: "الاستدعاء المتباعد",
        desc: "Brings material back at the interval that keeps it, scheduled per learner rather than per cohort.",
        descAr: "يعيد المادة على الفترة التي تُثبّتها، مجدولة لكل متعلّم لا لكل دفعة.",
      },
      {
        title: "Cohort reporting",
        titleAr: "تقارير الدفعات",
        desc: "Shows where a group is stuck and on which specific idea, in time to do something about it.",
        descAr: "يُظهر أين تعثّرت المجموعة وعند أي فكرة بعينها، في وقت يسمح بالتصرّف.",
      },
      {
        title: "Localisation",
        titleAr: "التوطين",
        desc: "Delivers the same course in English and Arabic, with the examples adapted rather than only the words.",
        descAr: "يقدّم الدورة نفسها بالعربية والإنجليزية، بتكييف الأمثلة لا الكلمات وحدها.",
      },
    ],
    solutions: [
      {
        title: "Grounded in your curriculum",
        titleAr: "مبنيّ على منهجك",
        desc: "Questions and explanations come from your material. It does not improvise a syllabus you never approved.",
        descAr: "تأتي الأسئلة والشروح من موادّك. لا يرتجل منهجًا لم توافق عليه.",
      },
      {
        title: "Built for no signal",
        titleAr: "مبنيّ لانعدام الشبكة",
        desc: "Offline is the default state, not a degraded mode, because field training rarely happens next to a router.",
        descAr: "العمل دون اتصال هو الحالة الافتراضية لا وضعًا منقوصًا، فالتدريب الميداني نادرًا ما يجري بجوار موجّه.",
      },
      {
        title: "Marking you can audit",
        titleAr: "تصحيح قابل للتدقيق",
        desc: "Every mark shows the rubric line it came from, and an instructor can change it with the change kept on record.",
        descAr: "تُظهر كل درجة بند المعيار الذي جاءت منه، ويستطيع المدرّب تغييرها مع حفظ التغيير في السجلّ.",
      },
      {
        title: "The content stays yours",
        titleAr: "المحتوى يبقى لك",
        desc: "Your material is not folded into a shared model, and you can export the whole course and its results at any point.",
        descAr: "لا تُدمج موادّك في نموذج مشترك، ويمكنك تصدير الدورة كاملة ونتائجها في أي وقت.",
      },
    ],
    integrations: ["SCORM", "xAPI", "Moodle", "Google Classroom", "CSV import", "SSO / SAML"],
    sectors: ["education", "manufacturing", "healthcare"],
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
