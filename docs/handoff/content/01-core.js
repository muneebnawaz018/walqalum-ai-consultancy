/* ==========================================================================
   Content — bilingual, and grounded in what walqalum.com actually publishes.

   Real, pulled from the live site: the eight service names and their own
   descriptions, all four blog posts with their real dates and categories,
   the three office addresses and phone numbers from /contact-us/, the client
   names from /our-work/, and the leadership team from /about-us/.

   Invented: the consulting layer — practice framing, the three diagnostics,
   the method, and the case-study narratives. That is the rebrand.

   ⚠ Conflict to resolve: the homepage says "Sharjah Media City" but the
   contact page says "Bur Dubai, Near Port Rashid, Dubai". RESOLVED by the
   client: Sharjah Media City is correct.
   ========================================================================== */

const T = (en, ar) => ({ en, ar });

const C = {
  brand: {
    name: "WalQalum",
    descriptor: T("AI & Digital Transformation Consultancy", "استشارات الذكاء الاصطناعي والتحول الرقمي"),
    email: "service@walqalum.com",
    altEmail: "tafseel@walqalum.com",
    linkedin: "https://www.linkedin.com/company/walqalum",
  },

  // Labels and routes match walqalum.com exactly. The four the live site
  // already has keep its wording; only "How we engage" and "Industries" are
  // new, because those pages are new.
  // Exactly the live site's header: Home · About Us · Services ▾ · Our Work ·
  // Blogs · Contact Us. Services carries a dropdown there too, so the two new
  // pages (How we engage, Industries) live inside it rather than adding
  // top-level items the client does not have.
  nav: [
    { route: "home", label: T("Home", "الرئيسية") },
    { route: "about-us", label: T("About Us", "من نحن") },
    { route: "services", label: T("Services", "الخدمات"), menu: true },
    { route: "our-work", label: T("Our Work", "أعمالنا") },
    { route: "blog", label: T("Blogs", "المدونة") },
    { route: "contact", label: T("Contact Us", "تواصل معنا") },
  ],
  menuGroups: {
    practices: T("Practices", "الممارسات"),
    capabilities: T("Capabilities", "القدرات"),
    more: T("How we work", "كيف نعمل"),
  },

  ui: {
    cta: T("Request a diagnostic", "اطلبوا تشخيصاً"),
    menu: T("Menu", "القائمة"),
    skip: T("Skip to content", "تخطَّ إلى المحتوى"),
    readCase: T("Read the case", "اقرأ الحالة"),
    read: T("Read", "اقرأ"),
    back: T("Back", "رجوع"),
    all: T("View all", "عرض الكل"),
    minRead: T("min read", "دقيقة قراءة"),
    situation: T("Situation", "السياق"),
    problem: T("The problem", "المشكلة"),
    approach: T("What we did", "ما فعلناه"),
    outcome: T("Outcome", "النتيجة"),
    builtWith: T("Built with", "بُني بـ"),
    sector: T("Sector", "القطاع"),
    region: T("Region", "المنطقة"),
    year: T("Year", "السنة"),
    practices: T("Practices", "الممارسات"),
    buyer: T("Who buys this", "من يشتري هذا"),
    capabilities: T("Capabilities", "القدرات"),
    duration: T("Duration", "المدة"),
    deliverables: T("What you receive", "ما تحصلون عليه"),
    bestFor: T("Who this is for", "لمن هذا"),
    related: T("Related", "ذات صلة"),
    moreWork: T("More work", "أعمال أخرى"),
    notFound: T("That page does not exist.", "هذه الصفحة غير موجودة."),
    placeholder: T("Placeholder", "عنصر مؤقت"),
  },

  home: {
    eyebrow: T("AI & Digital Transformation Consultancy", "استشارات الذكاء الاصطناعي والتحول الرقمي"),
    h1a: T("Strategy", "استراتيجية"),
    h1b: T("that ships.", "تُنفَّذ."),
    lead: T(
      "Most transformation fails in the gap between the recommendation and the build. We close that gap by owning both.",
      "يفشل معظم التحوّل في الفجوة بين التوصية والتنفيذ. نُغلق تلك الفجوة بامتلاك الطرفين."
    ),
    secondary: T("See how we engage", "كيف نعمل معكم"),
    stats: [
      { k: "40+", v: T("Consultants & engineers", "مستشارون ومهندسون") },
      { k: "3", v: T("Countries, one delivery model", "دول، ونموذج تنفيذ واحد") },
      { k: "50+", v: T("Client engagements delivered", "ارتباطات عملاء مُنفّذة") },
      { k: "2", v: T("Working languages, as peers", "لغتا عمل، بالتكافؤ") },
    ],
    trustedBy: T("Trusted by", "وثق بنا"),
    clients: ["Securance", "Nectios", "Hainok", "Bremod", "Shumaila's", "PNRM", "Epictory", "Misk"],

    noteEyebrow: T("Why we changed", "لماذا تغيّرنا"),
    note: {
      en: [
        "We started out building websites. That is not something to be embarrassed about, and it is not what we do now.",
        "What changed was watching the same thing happen on client after client. A large firm writes the strategy, presents it, and leaves. Someone like us is hired to build it. And then we are the ones who discover — eighteen months late, with the budget spent — that the plan assumed data nobody had, or a process nobody was willing to change.",
        "Nobody was accountable for that gap, because it sat between two contracts.",
        "So we stopped taking those projects and started doing both halves ourselves. That is the whole idea. Everything else on this site is detail.",
      ],
      ar: [
        "بدأنا ببناء المواقع الإلكترونية. ليس في ذلك ما يُخجل، وليس هذا ما نفعله اليوم.",
        "ما غيّر مسارنا هو تكرار المشهد نفسه مع عميل بعد آخر: شركة كبيرة تكتب الاستراتيجية، وتعرضها، ثم تنصرف. ثم يُستأجر فريق مثلنا لتنفيذها. وبعد ثمانية عشر شهراً، وقد أُنفقت الميزانية، نكون نحن من يكتشف أن الخطة افترضت بيانات لا وجود لها، أو عملية لم يكن أحد مستعداً لتغييرها.",
        "لم يكن أحد مسؤولاً عن تلك الفجوة، لأنها تقع بين عقدين.",
        "فتوقفنا عن قبول تلك المشاريع، وبدأنا نتولى الشقّين معاً. هذه هي الفكرة كاملة. وكل ما تبقى في هذا الموقع تفصيل.",
      ],
    },
    noteSigner: T("Muhammad Talha Khan", "محمد طلحة خان"),
    noteRole: T("Chief Executive, WalQalum", "الرئيس التنفيذي، WalQalum"),
    photo1: T("Photograph<br>Founders, Sharjah office", "صورة فوتوغرافية<br>المؤسِّسان، مكتب الشارقة"),
    photo1cap: T(
      "Real photography of the team and the working offices does more for credibility here than any illustration we could commission.",
      "الصور الحقيقية للفريق وللمكاتب تبني مصداقية أكبر من أي رسم توضيحي يمكن تكليف أحد به."
    ),
    photo2: T("Photograph<br>Engineering floor, Lahore", "صورة فوتوغرافية<br>قسم الهندسة، لاهور"),
    photo2cap: T(
      "One honest photograph of forty people working beats the figure “40+” in a statistics row.",
      "صورة صادقة واحدة لأربعين شخصاً أثناء العمل أقوى من رقم «+40» في صف إحصاءات."
    ),

    wedge: T(
      "The Big Four write the strategy and hand you a deck. Integrators build what the deck says, late.",
      "شركات الاستشارات الكبرى تكتب الاستراتيجية وتسلّمكم عرضاً تقديمياً. وشركات التكامل تبني ما يقوله العرض، متأخراً."
    ),
    wedgeEnd: T("We do both.", "نحن نفعل الاثنين."),
    wedgeCards: [
      {
        h: T("No handover", "بلا تسليم"),
        p: T(
          "The people who ran the diagnostic stay on through delivery. Nothing gets re-scoped in translation, because nothing gets translated.",
          "من أجرى التشخيص يبقى حتى نهاية التنفيذ. لا يُعاد تحديد النطاق أثناء الترجمة، لأنه لا توجد ترجمة أصلاً."
        ),
      },
      {
        h: T("Economics that work", "اقتصاديات عملية"),
        p: T(
          "Advisory close to you in the Gulf. Engineering at scale from Lahore. That is the arrangement, and it is the reason our rates are not the global firms’ rates.",
          "استشارة قريبة منكم في الخليج. وهندسة واسعة النطاق من لاهور. هذا هو الترتيب، وهو سبب اختلاف أسعارنا عن أسعار الشركات العالمية."
        ),
      },
      {
        h: T("One P&L", "قائمة أرباح واحدة"),
        p: T(
          "When something slips there is nobody else in the room to point at. It changes how carefully a plan gets written.",
          "حين يتأخر شيء لا يوجد طرف آخر في الغرفة يُشار إليه. وهذا يغيّر مدى الدقة في كتابة الخطة."
        ),
      },
    ],
  },

  practices: [
    {
      slug: "ai-advisory",
      idx: "01",
      name: T("AI & Data Advisory", "استشارات الذكاء الاصطناعي والبيانات"),
      promise: T("Where AI actually pays — and where it doesn’t.", "أين يُثمر الذكاء الاصطناعي فعلياً — وأين لا يُثمر."),
      buyer: T("CEO · COO · CIO", "الرئيس التنفيذي · مدير العمليات · مدير المعلومات"),
      body: T(
        "Most AI budgets are spent on the wrong problem. We start with your P&L, not your stack: which decisions are slow, which processes leak margin, which of them a model can genuinely improve. You leave with a ranked portfolio, an honest cost of ownership, and a roadmap you can defend to a board.",
        "تُنفَق معظم ميزانيات الذكاء الاصطناعي على المشكلة الخطأ. نبدأ من قائمة أرباحكم وخسائركم، لا من بنيتكم التقنية: أي القرارات بطيئة، وأي العمليات تستنزف الهامش، وأيها يمكن للنموذج أن يحسّنه فعلاً. تخرجون بمحفظة حالات استخدام مُرتّبة، وتكلفة ملكية صادقة، وخارطة طريق قابلة للدفاع أمام مجلس الإدارة."
      ),
      caps: [
        { n: T("Readiness assessment", "تقييم الجاهزية"), d: T("Scored across data, process, talent and governance.", "تقييم مُنقَّط عبر البيانات والعمليات والكفاءات والحوكمة.") },
        { n: T("Use-case portfolio", "محفظة حالات الاستخدام"), d: T("Every candidate sized by effort and return, then ranked. The list of what not to build is usually the more valuable half.", "كل حالة مُقدَّرة بالجهد والعائد ثم مُرتّبة. قائمة ما لا يجب بناؤه هي عادةً النصف الأثمن.") },
        { n: T("Data foundation review", "مراجعة أساس البيانات"), d: T("Most failed AI programmes were data programmes nobody scoped.", "معظم برامج الذكاء الاصطناعي الفاشلة كانت برامج بيانات لم يحدّد أحد نطاقها.") },
        { n: T("Build, buy or wait", "البناء أم الشراء أم الانتظار"), d: T("Total cost of ownership stated in full — including the cost of doing nothing.", "تكلفة الملكية الكاملة — بما فيها تكلفة عدم اتخاذ أي إجراء.") },
        { n: T("Governance & risk", "الحوكمة والمخاطر"), d: T("Model policy, human-in-the-loop design, audit trail, regulatory alignment.", "سياسة النماذج، وتصميم التدخّل البشري، ومسار التدقيق، والتوافق التنظيمي.") },
        { n: T("Agentic workflow design", "تصميم سير العمل الوكيلي"), d: T("Where autonomous agents replace coordination overhead — and the guardrails that keep them accountable.", "أين تحلّ الوكلاء المستقلّة محل أعباء التنسيق — والضوابط التي تُبقيها خاضعة للمساءلة.") },
      ],
      // The live site's own service, folded in where it belongs
      legacy: T(
        "Includes what the current site calls “AI & Machine Learning” — intelligent transformation tailored to your industry.",
        "يشمل ما يسمّيه الموقع الحالي «الذكاء الاصطناعي وتعلّم الآلة» — تحوّل ذكي مصمَّم لقطاعكم."
      ),
      stack: ["OpenAI", "Anthropic", "Azure AI Foundry", "AWS Bedrock", "Snowflake", "dbt", "n8n"],
      proof: "hainok",
    },
    {
      slug: "digital-transformation",
      idx: "02",
      name: T("Digital Transformation", "التحول الرقمي"),
      promise: T("Fix the operating model, not just the software.", "أصلحوا نموذج التشغيل، لا البرمجيات وحدها."),
      buyer: T("COO · Head of Operations · CFO", "مدير العمليات · رئيس التشغيل · المدير المالي"),
      body: T(
        "New systems laid over old processes produce expensive versions of the same problem. We map how work actually moves through your business — not how the org chart says it should — then redesign the process and the systems together, and manage the change through the part where people have to work differently.",
        "الأنظمة الجديدة فوق العمليات القديمة تُنتج نسخة أغلى من المشكلة نفسها. نرسم كيف ينتقل العمل فعلياً داخل مؤسستكم — لا كما يقول الهيكل التنظيمي — ثم نعيد تصميم العملية والأنظمة معاً، وندير التغيير خلال المرحلة التي يضطر فيها الناس للعمل بطريقة مختلفة."
      ),
      caps: [
        { n: T("Operating model design", "تصميم نموذج التشغيل"), d: T("Roles, decision rights, hand-offs, and the measures that tell you it is working.", "الأدوار وصلاحيات القرار ونقاط التسليم والمقاييس التي تخبركم أن الأمر ينجح.") },
        { n: T("Process mining & redesign", "استخلاص العمليات وإعادة تصميمها"), d: T("Current state from real system logs, then a target state with the waste designed out.", "الحالة الراهنة من سجلات الأنظمة الفعلية، ثم حالة مستهدفة أُزيل منها الهدر بالتصميم.") },
        { n: T("ERP & core systems", "أنظمة تخطيط الموارد"), d: T("Selection, implementation oversight, and rescue of stalled programmes.", "الاختيار والإشراف على التنفيذ وإنقاذ البرامج المتعثّرة.") },
        { n: T("Intelligent automation", "الأتمتة الذكية"), d: T("Finance close, procurement, onboarding, compliance reporting.", "الإقفال المالي، والمشتريات، والتعيين، والتقارير الرقابية.") },
        { n: T("Change management", "إدارة التغيير"), d: T("Adoption is the deliverable. A system nobody uses is a write-off with a login page.", "التبنّي هو المُخرَج. النظام الذي لا يستخدمه أحد خسارةٌ لها صفحة دخول.") },
        { n: T("Programme assurance", "ضمان البرامج"), d: T("Independent review of a transformation already in flight, with a candid recovery plan.", "مراجعة مستقلة لبرنامج تحوّل قائم، مع خطة تعافٍ صريحة.") },
      ],
      legacy: T(
        "Includes what the current site calls “Custom Software Development” — tailored solutions to real business problems.",
        "يشمل ما يسمّيه الموقع الحالي «تطوير البرمجيات المخصّصة» — حلول مصمَّمة لمشكلات عمل حقيقية."
      ),
      stack: ["SAP", "Odoo", "Microsoft Dynamics", "NetSuite", "Power Platform", "n8n"],
      proof: "nectios",
    },
    {
      slug: "growth-systems",
      idx: "03",
      name: T("Growth & Demand Systems", "أنظمة النمو والطلب"),
      promise: T("Demand as engineered infrastructure, not campaigns.", "الطلب كبنية تحتية مُهندَسة، لا كحملات."),
      buyer: T("CMO · Head of Growth · Founder", "مدير التسويق · رئيس النمو · المؤسّس"),
      body: T(
        "Campaigns stop the day you stop paying. Systems compound. We build the search architecture, conversion paths and lifecycle automation that keep producing qualified pipeline after the media budget pauses — and we instrument all of it, so the argument about what worked ends.",
        "الحملات تتوقف يوم تتوقفون عن الدفع. الأنظمة تتراكم. نبني بنية البحث ومسارات التحويل وأتمتة دورة حياة العميل التي تواصل إنتاج فرص مؤهَّلة بعد توقّف ميزانية الإعلان — ونقيسها بالكامل، فينتهي الجدل حول ما نجح."
      ),
      caps: [
        { n: T("Search visibility architecture", "بنية الظهور في البحث"), d: T("Built for classical search and for LLM retrieval, which increasingly decide the same question.", "مصمَّمة للبحث التقليدي ولاسترجاع نماذج اللغة معاً، وهما يحسمان السؤال ذاته على نحوٍ متزايد.") },
        { n: T("Conversion systems", "أنظمة التحويل"), d: T("Landing architecture, offer design, and the measurement to tell signal from noise.", "بنية صفحات الهبوط، وتصميم العرض، والقياس الذي يفصل الإشارة عن الضجيج.") },
        { n: T("Paid social & performance", "الإعلانات الاجتماعية والأداء"), d: T("In-house creative and media buying, run against pipeline rather than impressions.", "إنتاج إبداعي وشراء إعلاني داخلي، يُقاس بالفرص لا بالمشاهدات.") },
        { n: T("Lifecycle & CRM", "دورة الحياة وإدارة العملاء"), d: T("So sales inherits context instead of a name.", "ليرث فريق المبيعات سياقاً كاملاً لا مجرد اسم.") },
        { n: T("Bilingual market entry", "دخول السوق بلغتين"), d: T("Arabic and English demand built as peers — not one translated after the fact.", "بناء الطلب بالعربية والإنجليزية على قدم المساواة — لا ترجمة إحداهما لاحقاً.") },
        { n: T("Attribution & reporting", "الإسناد والتقارير"), d: T("One number the board trusts, and the working detail underneath it.", "رقم واحد يثق به المجلس، وتفصيله التشغيلي تحته.") },
      ],
      legacy: T(
        "Includes the SEO work the current site sells separately.",
        "يشمل أعمال تحسين محركات البحث التي يبيعها الموقع الحالي بشكل منفصل."
      ),
      stack: ["GA4", "GTM", "HubSpot", "Meta Ads", "Google Ads", "Ahrefs", "Looker Studio"],
      proof: "securance-catcher-sites",
    },
    {
      slug: "engineering",
      idx: "04",
      name: T("Engineering & Platforms", "الهندسة والمنصّات"),
      promise: T("The team that designed it is the team that builds it.", "الفريق الذي صمّمه هو الفريق الذي يبنيه."),
      buyer: T("CTO · Head of Engineering", "المدير التقني · رئيس الهندسة"),
      body: T(
        "This is where the strategy stops being a document. Product engineering, platform work, cloud and security — delivered by our own engineers, in the same accountability line as the advisory work.",
        "هنا تتوقف الاستراتيجية عن كونها وثيقة. هندسة المنتجات، وبناء المنصّات، والسحابة، والأمن — ينفّذها مهندسونا ضمن خط المساءلة نفسه الذي يحكم العمل الاستشاري."
      ),
      caps: [
        { n: T("Product engineering", "هندسة المنتجات"), d: T("Multi-tenant platforms, internal tools and customer-facing products, zero to production.", "منصّات متعددة المستأجرين، وأدوات داخلية، ومنتجات موجّهة للعملاء، من الصفر إلى الإنتاج.") },
        { n: T("Cloud & infrastructure", "السحابة والبنية التحتية"), d: T("Architecture, migration, cost control, and the discipline to keep it that way.", "التصميم المعماري، والترحيل، وضبط التكلفة، والانضباط الذي يحافظ عليها.") },
        { n: T("Data platforms", "منصّات البيانات"), d: T("Pipelines, warehousing, and the semantic layer that makes AI work possible later.", "خطوط المعالجة، والمستودعات، والطبقة الدلالية التي تجعل عمل الذكاء الاصطناعي ممكناً لاحقاً.") },
        { n: T("Web & commerce platforms", "منصّات الويب والتجارة"), d: T("Enterprise CMS and commerce builds where content operations and revenue depend on them.", "أنظمة إدارة محتوى وتجارة للمؤسسات، حيث تعتمد عليها عمليات المحتوى والإيرادات.") },
        { n: T("Mobile", "تطبيقات الجوال"), d: T("iOS and Android where the mobile surface is the business, not a checkbox.", "iOS وأندرويد حين يكون الجوال هو العمل نفسه، لا مجرد بند في قائمة.") },
        { n: T("Security & assurance", "الأمن والضمان"), d: T("Secure-by-default delivery, review against SOC 2 and ISAE 3402 expectations.", "تسليم آمن افتراضياً، ومراجعة وفق متطلبات SOC 2 و ISAE 3402.") },
      ],
      legacy: T(
        "This is where the current site’s Website Development, Mobile Application Development, Drupal Development, Shopify Development, IT Infrastructure & Cloud, and Data Intelligence & Cybersecurity all live. We still do every one of them. They are capabilities, not the offer.",
        "هنا تقع كل خدمات الموقع الحالي: تطوير المواقع، وتطوير تطبيقات الجوال، وتطوير Drupal، وتطوير Shopify، والبنية التحتية والسحابة، وذكاء البيانات والأمن السيبراني. ما زلنا ننفّذها جميعاً. لكنها قدرات، لا عرضاً."
      ),
      stack: ["TypeScript", "Next.js", "React Native", "Node.js", "Java", "PHP", "AWS", "Drupal", "Shopify", "WordPress"],
      proof: "nectios",
    },
  ],

  engagements: [
    {
      slug: "ai-readiness-diagnostic",
      tier: "diagnostic",
      name: T("AI Readiness Diagnostic", "تشخيص الجاهزية للذكاء الاصطناعي"),
      dur: T("3 weeks", "٣ أسابيع"),
      tag: T("Before you spend the budget, know which half of it is wasted.", "قبل أن تُنفقوا الميزانية، اعرفوا أي نصفٍ منها سيُهدر."),
      purpose: T(
        "A structured read of where your organisation actually stands, and which AI investments will return inside twelve months. Runs alongside your team without stopping their work.",
        "قراءة منهجية لموقع مؤسستكم الحقيقي، وأي استثمارات الذكاء الاصطناعي ستحقق عائداً خلال اثني عشر شهراً. يُنفَّذ بالتوازي مع فريقكم دون إيقاف عمله."
      ),
      items: [
        T("Scored maturity assessment across data, process, talent and governance", "تقييم نضج مُنقَّط عبر البيانات والعمليات والكفاءات والحوكمة"),
        T("Ranked use-case portfolio with effort, return and risk per candidate", "محفظة حالات استخدام مُرتّبة بالجهد والعائد والمخاطر لكل حالة"),
        T("Data foundation findings and the gaps that must close first", "نتائج تقييم أساس البيانات والفجوات الواجب إغلاقها أولاً"),
        T("Twelve-month roadmap sequenced by dependency, not by enthusiasm", "خارطة طريق لاثني عشر شهراً مُرتّبة بالاعتمادية لا بالحماس"),
        T("Board-ready summary and a costed first move", "ملخّص جاهز لمجلس الإدارة وخطوة أولى مُسعَّرة"),
      ],
      bestFor: T(
        "Leadership teams under pressure to “do something with AI” who need a defensible answer rather than a pilot.",
        "فرق القيادة الواقعة تحت ضغط «فعل شيء ما بالذكاء الاصطناعي» والتي تحتاج إجابة قابلة للدفاع لا تجربة أولية."
      ),
    },
    {
      slug: "transformation-blueprint",
      tier: "diagnostic",
      name: T("Transformation Blueprint", "مخطّط التحول"),
      dur: T("6 weeks", "٦ أسابيع"),
      tag: T("The plan a board can approve and an engineer can build from.", "خطة يوافق عليها المجلس ويبني منها المهندس."),
      purpose: T(
        "A full current-state to target-state design covering process, systems and operating model — with the business case and the sequence to get there.",
        "تصميم متكامل من الحالة الراهنة إلى الحالة المستهدفة يغطي العمليات والأنظمة ونموذج التشغيل — مع دراسة الجدوى وتسلسل التنفيذ."
      ),
      items: [
        T("Current-state process map drawn from real system evidence", "خريطة العمليات الراهنة مستخلَصة من أدلة الأنظمة الفعلية"),
        T("Target operating model with decision rights and ownership", "نموذج التشغيل المستهدف مع صلاحيات القرار وملكية العمليات"),
        T("Systems architecture and integration design", "معمارية الأنظمة وتصميم التكامل"),
        T("Costed business case, payback modelled under three scenarios", "دراسة جدوى مُسعَّرة مع نمذجة العائد وفق ثلاثة سيناريوهات"),
        T("Delivery plan sequenced into releases, with risks named", "خطة تنفيذ مُقسَّمة إلى إصدارات، مع تسمية المخاطر"),
      ],
      bestFor: T("Organisations committed to change but unable to agree internally on what it is.", "المؤسسات الملتزمة بالتغيير لكنها لم تتفق داخلياً على ماهيته."),
    },
    {
      slug: "growth-systems-audit",
      tier: "diagnostic",
      name: T("Growth Systems Audit", "تدقيق أنظمة النمو"),
      dur: T("2 weeks", "أسبوعان"),
      tag: T("Find out why the pipeline stops when the spend stops.", "اكتشفوا لماذا تتوقف الفرص حين يتوقف الإنفاق."),
      purpose: T(
        "A teardown of your demand infrastructure — search, conversion, lifecycle and measurement — and a prioritised build plan for the parts that compound.",
        "تفكيك كامل لبنية الطلب لديكم — البحث والتحويل ودورة الحياة والقياس — وخطة بناء مُرتَّبة بالأولوية للأجزاء التي تتراكم."
      ),
      items: [
        T("Visibility and entity-coverage analysis for search and LLM retrieval", "تحليل الظهور وتغطية الكيانات في البحث واسترجاع نماذج اللغة"),
        T("Conversion path teardown with the leaks quantified", "تفكيك مسار التحويل مع تحديد حجم التسرّب"),
        T("Measurement and attribution audit", "تدقيق القياس والإسناد"),
        T("Bilingual readiness review for GCC market entry", "مراجعة الجاهزية ثنائية اللغة لدخول أسواق الخليج"),
        T("Ninety-day build plan, ordered by compounding return", "خطة بناء لتسعين يوماً مُرتَّبة بالعائد التراكمي"),
      ],
      bestFor: T("Firms spending on media with no durable asset to show for it.", "الشركات التي تُنفق على الإعلان دون أصلٍ دائم يقابل الإنفاق."),
    },
    {
      slug: "transformation-programme",
      tier: "programme",
      name: T("Transformation Programme", "برنامج التحول"),
      dur: T("3–18 months", "٣–١٨ شهراً"),
      tag: T("Delivery against the blueprint, priced to the outcome.", "تنفيذ وفق المخطّط، بتسعير مرتبط بالنتيجة."),
      purpose: T(
        "Full delivery of a defined change — design, build, migration, adoption — governed to agreed outcomes rather than to hours.",
        "تنفيذ كامل لتغيير محدَّد — تصميم وبناء وترحيل وتبنٍّ — يُحكَم بنتائج متفق عليها لا بساعات عمل."
      ),
      items: [
        T("One accountable engagement lead from strategy through go-live", "قائد ارتباط واحد مسؤول من الاستراتيجية حتى الإطلاق"),
        T("Blended advisory and engineering team, sized to the phase", "فريق مدمج من الاستشارة والهندسة، بحجم يناسب كل مرحلة"),
        T("Fortnightly steering with outcome measures, not status colours", "توجيه كل أسبوعين بمقاييس نتائج، لا بألوان حالة"),
        T("Knowledge transfer built into the plan, not bolted on at the end", "نقل المعرفة مُدمج في الخطة، لا مُضاف في نهايتها"),
      ],
      bestFor: T("Change with a board-level owner and a date attached.", "التغيير الذي له مالك على مستوى المجلس وتاريخ محدَّد."),
    },
    {
      slug: "embedded-team",
      tier: "programme",
      name: T("Embedded Team", "فريق مُدمج"),
      dur: T("Retained, 6 months+", "بالاحتفاظ، ٦ أشهر فأكثر"),
      tag: T("Capacity and judgement, on your side of the table.", "قدرة تنفيذية وحُكم مهني، في صفّكم."),
      purpose: T(
        "A standing pod — engineering, data, growth or all three — working inside your rituals and tooling, with our advisory bench behind them.",
        "فريق دائم — هندسة أو بيانات أو نمو أو الثلاثة — يعمل داخل أنظمتكم وطقوسكم التشغيلية، مسنوداً بفريقنا الاستشاري."
      ),
      items: [
        T("Named team members, not rotating resources", "أعضاء فريق بأسمائهم، لا موارد متبدّلة"),
        T("Your backlog, your standups, your definition of done", "قائمة أعمالكم، واجتماعاتكم، وتعريفكم للإنجاز"),
        T("Quarterly advisory review at leadership level", "مراجعة استشارية ربع سنوية على مستوى القيادة"),
        T("Scale up or down at agreed notice", "زيادة أو تقليص الحجم بإشعار متفق عليه"),
      ],
      bestFor: T("Teams that need to move faster than hiring allows.", "الفرق التي تحتاج التحرّك أسرع مما يسمح به التوظيف."),
    },
  ],

  method: [
    { n: "01", h: T("Diagnose", "تشخيص"), p: T("Evidence before opinion. We read your systems, your numbers and your process as it actually runs — not as it is documented.", "الدليل قبل الرأي. نقرأ أنظمتكم وأرقامكم وعملياتكم كما تجري فعلاً — لا كما هي موثّقة.") },
    { n: "02", h: T("Design", "تصميم"), p: T("Target state, sequence and business case — specified closely enough that an engineer could start on Monday.", "الحالة المستهدفة والتسلسل ودراسة الجدوى — محدَّدة بدقة تكفي ليبدأ مهندس العمل صباح الاثنين.") },
    { n: "03", h: T("Deliver", "تنفيذ"), p: T("Our engineers build it, in releases, against the outcomes agreed at design. The advisory team stays on the engagement.", "مهندسونا يبنونه على دفعات، وفق النتائج المتفق عليها في التصميم. ويبقى الفريق الاستشاري ضمن الارتباط.") },
    { n: "04", h: T("Sustain", "استدامة"), p: T("Adoption, measurement and knowledge transfer. We are finished when your team can run it without calling us.", "التبنّي والقياس ونقل المعرفة. ننتهي حين يستطيع فريقكم تشغيله دون الاتصال بنا.") },
  ],

  industries: [
    {
      slug: "financial-services", n: "01",
      name: T("Financial Services", "الخدمات المالية"),
      thesis: T("The constraint is rarely the model. It is proving to a regulator why the model decided what it decided.", "القيد نادراً ما يكون النموذج نفسه. القيد هو إثبات سبب القرار الذي اتخذه النموذج أمام الجهة الرقابية."),
      where: [
        T("Document-heavy processes: onboarding, claims, credit files", "العمليات كثيفة المستندات: التعيين والمطالبات وملفات الائتمان"),
        T("Risk and compliance reporting with a human decision point", "تقارير المخاطر والامتثال مع نقطة قرار بشرية"),
        T("Core system integration without a rip-and-replace programme", "تكامل الأنظمة الأساسية دون برنامج استبدال شامل"),
      ],
    },
    {
      slug: "healthcare", n: "02",
      name: T("Healthcare", "الرعاية الصحية"),
      thesis: T("Clinical time is the scarcest asset in the building. Most of it is lost to administration, not to medicine.", "الوقت السريري هو أندر أصل في المنشأة. ويُهدر معظمه في الإدارة لا في الطب."),
      where: [
        T("Scheduling, intake and follow-up automation", "أتمتة الجدولة والاستقبال والمتابعة"),
        T("Clinical documentation support with review built in", "دعم التوثيق السريري مع مراجعة مُدمجة"),
        T("Patient-facing digital front doors that convert", "بوابات رقمية للمرضى تحقّق التحويل"),
      ],
    },
    {
      slug: "manufacturing", n: "03",
      name: T("Manufacturing & Industrial", "التصنيع والصناعة"),
      thesis: T("The data already exists. It is trapped in machines, spreadsheets and the heads of three long-serving people.", "البيانات موجودة أصلاً. لكنها محتجزة في الآلات وجداول البيانات ورؤوس ثلاثة موظفين قدامى."),
      where: [
        T("Condition monitoring and maintenance prediction", "مراقبة الحالة والتنبؤ بالصيانة"),
        T("Demand and inventory forecasting", "التنبؤ بالطلب والمخزون"),
        T("ERP rescue and completion of stalled programmes", "إنقاذ أنظمة تخطيط الموارد وإكمال البرامج المتعثّرة"),
      ],
    },
    {
      slug: "professional-services", n: "04",
      name: T("Professional Services", "الخدمات المهنية"),
      thesis: T("When the product is expertise, AI either multiplies your people or commoditises them. The difference is design.", "حين يكون المنتج هو الخبرة، فإن الذكاء الاصطناعي إمّا يُضاعف أثر فريقكم أو يحوّله إلى سلعة. الفارق هو التصميم."),
      where: [
        T("Research, drafting and review inside a confidentiality boundary", "البحث والصياغة والمراجعة داخل حدود السرية"),
        T("Firm knowledge made retrievable rather than archived", "جعل معرفة الشركة قابلة للاسترجاع بدل أرشفتها"),
        T("Demand systems for high-value, low-volume services", "أنظمة طلب للخدمات عالية القيمة محدودة الحجم"),
      ],
    },
  ],
};

/* Exported so this reads as the module it actually is. Nothing imports it
   today — it is the bilingual source the handoff was written against, and the
   Arabic in it is the firm's own published wording, which is why it is worth
   keeping rather than deleting once the strings have been lifted into
   `lib/dictionaries/`. */
export { C, T };
