/* ==========================================================================
   Content, part 2 — work, insights, firm, contact.

   The four Insights posts are the REAL posts currently on walqalum.com, with
   their real titles, dates, categories and slugs. They are listed here as-is
   so the client can see exactly how the existing newsroom looks inside the
   new design — and, in two cases, what the same subject would look like
   rewritten for a consulting audience.

   Office addresses, phones and emails are verbatim from /contact-us/.
   ========================================================================== */

C.work = [
  {
    slug: "securance-catcher-sites", img: "case-1", featured: true,
    client: "Securance",
    sector: T("Compliance & assurance advisory", "استشارات الامتثال والضمان"),
    region: T("Global", "عالمي"), year: "2024",
    head: T(
      "Turning a compliance advisory’s expertise into a demand engine that runs without media spend",
      "تحويل خبرة شركة استشارات امتثال إلى محرّك طلب يعمل دون إنفاق إعلاني"
    ),
    situation: T(
      "Securance is a global advisory firm certifying enterprises against ISAE 3402, SOC 2 and BSI C5. Their expertise was unquestioned; their visibility at the moment a prospect started searching was not.",
      "Securance شركة استشارية عالمية تعتمد المؤسسات وفق معايير ISAE 3402 و SOC 2 و BSI C5. خبرتها لم تكن موضع تساؤل؛ أما ظهورها في اللحظة التي يبدأ فيها العميل المحتمل بالبحث، فكان كذلك."
    ),
    problem: T(
      "Demand for niche audit certifications is small, high-value and intensely intent-driven. A single corporate site could not rank credibly across every certification, jurisdiction and buying stage at once — so the highest-intent searches were being answered by competitors.",
      "الطلب على شهادات التدقيق المتخصصة محدود العدد، مرتفع القيمة، ومدفوع بالنيّة الشرائية. لم يكن بوسع موقع مؤسسي واحد أن يتصدّر بمصداقية كل شهادة ونطاق قضائي ومرحلة شراء في آنٍ واحد — فكان المنافسون هم من يجيب على عمليات البحث الأعلى نيّة."
    ),
    approach: [
      T("Mapped the certification landscape as an entity graph — standard, jurisdiction, industry, buyer stage — and identified where intent concentrated.", "رسمنا مشهد الشهادات كرسم بياني للكيانات — المعيار والنطاق القضائي والقطاع ومرحلة المشتري — وحدّدنا أين تتركّز النيّة الشرائية."),
      T("Designed a suite of geo- and standard-targeted microsites, each answering one question completely rather than many partially.", "صمّمنا مجموعة مواقع مصغّرة موجَّهة جغرافياً وحسب المعيار، يجيب كل منها على سؤال واحد إجابة كاملة بدل أسئلة كثيرة إجابة ناقصة."),
      T("Built on a shared Drupal and React platform so a new market could launch without a new build.", "بنيناها على منصة مشتركة من Drupal و React ليتسنى إطلاق سوق جديد دون بناء جديد."),
      T("Instrumented the whole funnel end to end, so lead quality — not traffic — governed what got built next.", "قِسنا مسار التحويل كاملاً، ليحكم جودةُ العملاء المحتملين — لا حجم الزيارات — ما يُبنى تالياً."),
    ],
    outcome: [
      T("A repeatable demand asset: each new certification or market is a configuration, not a project.", "أصل طلبٍ قابل للتكرار: كل شهادة أو سوق جديد صار إعداداً لا مشروعاً."),
      T("Inbound enquiries arrive pre-qualified by the specificity of the page that produced them.", "تصل الاستفسارات الواردة مؤهَّلة مسبقاً بحكم دقة الصفحة التي أنتجتها."),
      T("A consulting firm chose us to build the infrastructure their own revenue depends on.", "شركة استشارية اختارتنا لبناء البنية التي تعتمد عليها إيراداتها."),
    ],
    stack: ["Drupal", "React", "AWS", "MySQL"],
    practices: ["growth-systems", "engineering"],
    viz: "line",
  },
  {
    slug: "nectios", img: "case-2", featured: true,
    client: "Nectios",
    sector: T("Enterprise SaaS", "برمجيات المؤسسات كخدمة"),
    region: T("Global", "عالمي"), year: "2024",
    head: T(
      "A no-code community platform enterprises can configure themselves",
      "منصة مجتمعات بلا برمجة تستطيع المؤسسات تهيئتها بنفسها"
    ),
    situation: T(
      "Nectios set out to give large organisations a way to run branded digital communities — events, webinars, networking — without a development team standing behind every change.",
      "انطلقت Nectios لتمنح المؤسسات الكبيرة وسيلة لإدارة مجتمعات رقمية بهويتها الخاصة — فعاليات وندوات وتواصل — دون فريق تطوير يقف خلف كل تعديل."
    ),
    problem: T(
      "Enterprise buyers wanted deep customisation; their own teams could not write code. Every configuration request routed through engineering, which capped how many clients the business could serve at once.",
      "أراد مشترو المؤسسات تخصيصاً عميقاً؛ ولم تكن فرقهم قادرة على البرمجة. كان كل طلب تهيئة يمرّ عبر الهندسة، ما حدّ من عدد العملاء الذين يمكن خدمتهم في آنٍ واحد."
    ),
    approach: [
      T("Reframed the roadmap around the real constraint: not missing features, but who was allowed to change them.", "أعدنا صياغة خارطة الطريق حول القيد الحقيقي: ليس نقص الميزات، بل من يُسمح له بتغييرها."),
      T("Built a drag-and-drop space builder so a client administrator could compose event spaces, chat and networking rooms unaided.", "بنينا أداة تركيب بالسحب والإفلات تتيح لمسؤول العميل تكوين مساحات الفعاليات والدردشة وغرف التواصل دون مساعدة."),
      T("Architected multi-tenancy on Next.js and AWS with isolation strong enough for regulated sectors.", "صمّمنا معمارية متعددة المستأجرين على Next.js و AWS بعزلٍ يكفي للقطاعات الخاضعة للتنظيم."),
      T("Embedded real-time chat and webinar delivery so live events stayed inside the platform.", "دمجنا الدردشة الفورية وبثّ الندوات ليبقى الحدث المباشر داخل المنصة."),
    ],
    outcome: [
      T("Nectios now serves clients across education, technology and healthcare in multiple regions.", "تخدم Nectios اليوم عملاء في التعليم والتقنية والرعاية الصحية عبر مناطق متعددة."),
      T("Client onboarding no longer consumes engineering capacity, so growth stopped being headcount-bound.", "لم يعد تفعيل العملاء يستهلك طاقة الهندسة، فتحرّر النمو من قيد عدد الموظفين."),
    ],
    stack: ["Next.js", "React", "AWS", "MySQL"],
    practices: ["engineering", "digital-transformation"],
    viz: "grid",
  },
  {
    slug: "hainok", img: "case-3", featured: true,
    client: "Hainok",
    sector: T("Real estate intelligence", "ذكاء السوق العقاري"),
    region: T("Pakistan", "باكستان"), year: "2025",
    head: T("Making an opaque property market legible enough to price", "جعل سوق عقاري غامض قابلاً للقراءة بما يكفي للتسعير"),
    situation: T(
      "Pakistan’s property market runs largely on relationships and anecdote. Buyers, investors and agents were all making large decisions on thin evidence.",
      "يقوم السوق العقاري الباكستاني في معظمه على العلاقات والروايات الشخصية. كان المشترون والمستثمرون والوكلاء يتخذون قرارات كبيرة بأدلة ضحلة."
    ),
    problem: T(
      "Listing data was fragmented, inconsistent and frequently stale. Any product built on it would inherit the noise unless the data problem was solved first — which is where most attempts stop.",
      "كانت بيانات العروض مجزّأة وغير متسقة وقديمة في كثير من الأحيان. أي منتج يُبنى عليها سيرث الضجيج ما لم تُحلّ مشكلة البيانات أولاً — وهنا تتوقف معظم المحاولات."
    ),
    approach: [
      T("Treated it as a data problem before a product problem: ingestion, deduplication, normalisation and confidence scoring.", "تعاملنا معها كمشكلة بيانات قبل أن تكون مشكلة منتج: الاستيعاب وإزالة التكرار والتوحيد وتنقيط الثقة."),
      T("Built the analytics layer that turns raw listings into comparable, trend-bearing signals.", "بنينا طبقة التحليلات التي تحوّل العروض الخام إلى إشارات قابلة للمقارنة وحاملة للاتجاه."),
      T("Designed the interface for three distinct audiences without splitting into three products.", "صمّمنا الواجهة لثلاث فئات مختلفة دون تقسيمها إلى ثلاثة منتجات."),
    ],
    outcome: [
      T("Buyers and investors can compare on evidence rather than on the last conversation they had.", "صار بوسع المشترين والمستثمرين المقارنة بالدليل لا بآخر محادثة أجروها."),
      T("The data foundation is reusable — valuation and forecasting sit on top of it without a rebuild.", "أساس البيانات قابل لإعادة الاستخدام — التقييم والتنبؤ يقومان فوقه دون إعادة بناء."),
    ],
    stack: ["React", "Node.js", "AWS", "SQL"],
    practices: ["ai-advisory", "engineering"],
    viz: "bars",
  },
  {
    slug: "securance", img: "case-4", client: "Securance",
    sector: T("Cybersecurity & assurance", "الأمن السيبراني والضمان"),
    region: T("Global", "عالمي"), year: "2023",
    head: T("An enterprise face for a firm whose product is trust", "واجهة مؤسسية لشركة منتجها هو الثقة"),
    situation: T("Securance sells advisory, audit and cybersecurity services to enterprises that scrutinise vendors closely — often as a formal procurement step.", "تبيع Securance خدمات استشارية وتدقيقية وأمنية لمؤسسات تدقّق في مورّديها بعناية — غالباً كخطوة رسمية في الشراء."),
    problem: T("When a security firm’s own web presence looks less rigorous than the standards it audits against, the credibility gap is doing damage before a conversation starts.", "حين يبدو الحضور الرقمي لشركة أمنية أقل انضباطاً من المعايير التي تدقّق وفقها، تكون فجوة المصداقية قد أضرّت قبل أن تبدأ أي محادثة."),
    approach: [
      T("Restructured the service architecture so advisory, audit and cybersecurity read as one integrated practice rather than three price lists.", "أعدنا هيكلة بنية الخدمات لتُقرأ الاستشارة والتدقيق والأمن كممارسة واحدة متكاملة لا ثلاث قوائم أسعار."),
      T("Built an enterprise-grade interface on Drupal with content governance their team could operate.", "بنينا واجهة بمستوى مؤسسي على Drupal مع حوكمة محتوى يستطيع فريقهم تشغيلها."),
    ],
    outcome: [T("A presence that survives procurement scrutiny instead of triggering it.", "حضورٌ يجتاز تدقيق المشتريات بدل أن يستدعيه.")],
    stack: ["Drupal", "PHP", "MySQL", "AWS"],
    practices: ["engineering", "growth-systems"], viz: "grid",
  },
  {
    slug: "bremod", img: "case-5", client: "Bremod",
    sector: T("Beauty & haircare retail", "تجزئة التجميل والعناية بالشعر"),
    region: T("UAE", "الإمارات"), year: "2024",
    head: T("One commerce spine serving web and mobile without a second build", "عمود فقري تجاري واحد يخدم الويب والجوال دون بناء ثانٍ"),
    situation: T("Bremod sells premium haircare where a large share of customers browse and buy on a phone.", "تبيع Bremod منتجات عناية بالشعر متميزة، وتتصفّح شريحة كبيرة من عملائها وتشتري عبر الهاتف."),
    problem: T("Running a separate storefront and app meant catalogue, pricing and promotions drifted apart — and every campaign cost twice to launch.", "أدّى تشغيل متجر وتطبيق منفصلين إلى تباعد الكتالوج والأسعار والعروض — وصارت كل حملة تكلّف ضعف الإطلاق."),
    approach: [
      T("Consolidated catalogue, pricing and promotion logic into a single source of truth.", "وحّدنا الكتالوج والتسعير ومنطق العروض في مصدر حقيقة واحد."),
      T("Shipped a React Native Android app against the same commerce layer.", "أطلقنا تطبيق أندرويد بـ React Native يعمل على طبقة التجارة نفسها."),
    ],
    outcome: [T("Campaigns launch once and appear everywhere. Merchandising moved back to the marketing team, off the development queue.", "تُطلق الحملة مرة واحدة فتظهر في كل مكان. وعادت إدارة العرض التجاري إلى فريق التسويق، خارج طابور التطوير.")],
    stack: ["React Native", "WordPress", "AWS"],
    practices: ["engineering", "growth-systems"], viz: "bars",
  },
  {
    slug: "shumailas", img: "case-6", client: "Shumaila's",
    sector: T("Aesthetic & laser clinics", "عيادات التجميل والليزر"),
    region: T("Pakistan", "باكستان"), year: "2023",
    head: T("A clinic site built around the booking, not the brochure", "موقع عيادة مبني حول الحجز، لا حول الكتيّب"),
    situation: T("A leading aesthetic and laser clinic whose growth depends on appointments booked, not pages viewed.", "عيادة رائدة في التجميل والليزر يعتمد نموّها على المواعيد المحجوزة لا على الصفحات المُشاهَدة."),
    problem: T("Treatment information was hard to compare, and the path from interest to booking was long enough for people to leave in the middle of it.", "كانت معلومات العلاجات صعبة المقارنة، وكان الطريق من الاهتمام إلى الحجز طويلاً بما يكفي ليغادر الناس في منتصفه."),
    approach: [
      T("Rebuilt treatment content so a patient could compare options and understand cost without calling.", "أعدنا بناء محتوى العلاجات ليتمكن المريض من المقارنة وفهم التكلفة دون اتصال هاتفي."),
      T("Compressed the booking path and made it the primary action on every page.", "اختصرنا مسار الحجز وجعلناه الإجراء الأساسي في كل صفحة."),
    ],
    outcome: [T("Enquiries arrive knowing which treatment they want.", "تصل الاستفسارات ويعرف أصحابها أي علاج يريدون.")],
    stack: ["WordPress", "MySQL", "AWS"],
    practices: ["growth-systems"], viz: "line",
  },
  {
    slug: "pnrm", img: "case-7", client: "PNRM",
    sector: T("Retail & e-commerce", "التجزئة والتجارة الإلكترونية"),
    region: T("Pakistan", "باكستان"), year: "2023",
    head: T("A storefront the client’s own team can merchandise", "متجر يستطيع فريق العميل نفسه إدارة عرضه"),
    situation: T("A retail business whose catalogue and campaigns change faster than any development cycle can accommodate.", "شركة تجزئة يتغيّر كتالوجها وحملاتها أسرع مما تستوعبه أي دورة تطوير."),
    problem: T("Every merchandising change required a developer, so the site was always describing last month’s business.", "كان كل تغيير في العرض التجاري يتطلب مطوّراً، فكان الموقع يصف دائماً أعمال الشهر الماضي."),
    approach: [T("Built a component-based commerce system on Drupal with editorial control in the client’s hands.", "بنينا نظام تجارة قائماً على المكوّنات على Drupal مع تحكّم تحريري بيد العميل.")],
    outcome: [T("Campaign turnaround dropped from a development ticket to an afternoon.", "انخفض زمن إطلاق الحملة من تذكرة تطوير إلى فترة بعد الظهر.")],
    stack: ["Drupal", "PHP", "AWS"],
    practices: ["engineering"], viz: "grid",
  },
];

/* --- Insights ------------------------------------------------------------
   The first four are the REAL posts live on walqalum.com right now, with
   their real dates, categories and slugs, shown in the new design. The two
   marked `proposed` are what the same newsroom looks like written for the
   buyer this rebrand is aimed at — included so the difference is visible
   side by side rather than described. */
C.posts = [
  {
    slug: "n8n-agent", live: true,
    cat: T("Artificial Intelligence", "الذكاء الاصطناعي"),
    date: "2025-08-04", dateLabel: T("4 August 2025", "٤ أغسطس ٢٠٢٥"), mins: 6,
    title: T("Automate Website Audits with n8n", "أتمتة تدقيق المواقع باستخدام n8n"),
    excerpt: T(
      "Integrated GitHub, Sheets, and PageSpeed with n8n for fast, automated site audits.",
      "دمج GitHub وSheets وPageSpeed مع n8n لإجراء تدقيق سريع وآلي للمواقع."
    ),
  },
  {
    slug: "shopify-development", live: true,
    cat: T("Shopify Development", "تطوير Shopify"),
    date: "2025-07-21", dateLabel: T("21 July 2025", "٢١ يوليو ٢٠٢٥"), mins: 9,
    title: T("The Ultimate Guide to Shopify Development", "الدليل الشامل لتطوير Shopify"),
    excerpt: T(
      "Unlocking e-commerce success: a complete guide to Shopify development.",
      "مفاتيح النجاح في التجارة الإلكترونية: دليل كامل لتطوير Shopify."
    ),
  },
  {
    slug: "uiux-design", live: true,
    cat: T("UI/UX Design", "تصميم واجهات وتجربة المستخدم"),
    date: "2025-06-26", dateLabel: T("26 June 2025", "٢٦ يونيو ٢٠٢٥"), mins: 5,
    title: T("UI vs UX: What’s the Real Difference?", "الواجهة مقابل التجربة: ما الفرق الحقيقي؟"),
    excerpt: T(
      "A beginner’s guide to the fundamentals of great UI/UX design.",
      "دليل المبتدئين لأساسيات التصميم الجيد للواجهة والتجربة."
    ),
  },
  {
    slug: "earth-day-2026-walqalum", live: true,
    cat: T("Celebration", "مناسبات"),
    date: "2026-04-22", dateLabel: T("22 April 2026", "٢٢ أبريل ٢٠٢٦"), mins: 3,
    title: T("Earth Day 2026 at WalQalum", "يوم الأرض ٢٠٢٦ في WalQalum"),
    excerpt: T(
      "This Earth Day, our team came together for a company-wide initiative led by our CEO, Talha.",
      "في يوم الأرض هذا، اجتمع فريقنا في مبادرة على مستوى الشركة بقيادة رئيسنا التنفيذي طلحة."
    ),
  },
  {
    slug: "pilot-that-never-scales", proposed: true, featured: true,
    cat: T("AI Advisory", "استشارات الذكاء الاصطناعي"),
    date: "2026-08-01", dateLabel: T("Proposed", "مقترح"), mins: 7,
    title: T(
      "The pilot that never scales: why AI programmes stall at proof of concept",
      "التجربة التي لا تتوسّع: لماذا تتعثّر برامج الذكاء الاصطناعي عند إثبات المفهوم"
    ),
    excerpt: T(
      "A pilot proves a model works. It does not prove your organisation can absorb it. Those are different problems, they have different owners, and the second one is almost never anybody’s job.",
      "التجربة الأولية تثبت أن النموذج يعمل. لكنها لا تثبت أن مؤسستكم قادرة على استيعابه. هاتان مشكلتان مختلفتان، لكل منهما مالك مختلف، والثانية لا تكون مسؤولية أحد تقريباً."
    ),
  },
  {
    slug: "buyer-asks-an-llm", proposed: true,
    cat: T("Growth", "النمو"),
    date: "2026-07-14", dateLabel: T("Proposed", "مقترح"), mins: 5,
    title: T("Your next buyer will ask an LLM before they ask you", "عميلكم القادم سيسأل نموذجاً لغوياً قبل أن يسألكم"),
    excerpt: T(
      "Retrieval systems read structure, not adjectives. What that changes about how a B2B site should be built.",
      "أنظمة الاسترجاع تقرأ البنية لا الصفات. وما يعنيه ذلك في طريقة بناء موقع للأعمال."
    ),
  },
];

C.firm = {
  lead: T(
    "Three offices, deliberately arranged. Client leadership sits in the Gulf, the engineering bench sits in Lahore, and the registered company is in New South Wales. That arrangement is not an accident of history — it is the reason consulting-grade thinking arrives at a workable cost.",
    "ثلاثة مكاتب، مرتَّبة عن قصد. قيادة العملاء في الخليج، والفريق الهندسي في لاهور، والشركة مسجَّلة في نيو ساوث ويلز. هذا الترتيب ليس صدفة تاريخية — بل هو سبب وصول تفكيرٍ بمستوى استشاري بتكلفة عملية."
  ),
  small: T(
    "We are not the size of the global firms and do not compete with them on it. We compete on the absence of a handover — which is easier to guarantee at forty people than at forty thousand.",
    "لسنا بحجم الشركات العالمية ولا ننافسها عليه. ننافس على غياب التسليم بين الفرق — وهو أمر يسهل ضمانه بأربعين شخصاً لا بأربعين ألفاً."
  ),
  leadership: [
    { i: "TK", n: T("Muhammad Talha Khan", "محمد طلحة خان"), r: T("Chief Executive", "الرئيس التنفيذي"),
      b: T("Ten years building and delivering enterprise web and content platforms. Leads client engagements at board level across the Gulf and Australia.", "عشر سنوات في بناء وتسليم منصات الويب والمحتوى للمؤسسات. يقود الارتباطات مع العملاء على مستوى مجالس الإدارة في الخليج وأستراليا.") },
    { i: "MK", n: T("Muhammad Taha Khan", "محمد طه خان"), r: T("Chief Technology Officer", "المدير التقني"),
      b: T("Cloud architecture and digital transformation. Owns the technical standard every engagement is delivered against.", "معمارية السحابة والتحول الرقمي. يملك المعيار التقني الذي يُسلَّم وفقه كل ارتباط.") },
    { i: "HM", n: T("Hamaz Mubashar", "حماز مبشّر"), r: T("Principal, Enterprise Systems", "شريك أول، أنظمة المؤسسات"),
      b: T("Six-plus years in ERP and core enterprise systems, including recovery of programmes that stalled before completion.", "أكثر من ست سنوات في أنظمة تخطيط الموارد والأنظمة الأساسية، بما في ذلك إنقاذ برامج تعثّرت قبل اكتمالها.") },
    { i: "ZG", n: T("Zuhaib Ali Ghumman", "زهيب علي غمّان"), r: T("Head of Delivery", "رئيس التنفيذ"),
      b: T("Runs the delivery discipline across engagements — scope, sequence, steering, and the honest status report.", "يدير انضباط التنفيذ عبر الارتباطات — النطاق والتسلسل والتوجيه وتقرير الحالة الصريح.") },
    { i: "SA", n: T("Safeer Ahmad", "سفير أحمد"), r: T("Engineering Lead", "قائد الهندسة"),
      b: T("Five years across Node.js, Java and React. Leads the bench that builds what the advisory team designs.", "خمس سنوات عبر Node.js وJava وReact. يقود الفريق الذي يبني ما يصمّمه الفريق الاستشاري.") },
    { i: "AR", n: T("Abdul Rauf", "عبد الرؤوف"), r: T("Admin & Accounts", "الإدارة والحسابات"),
      b: T("Operations, contracting and compliance across three jurisdictions.", "العمليات والتعاقد والامتثال عبر ثلاث ولايات قضائية.") },
  ],
  offices: [
    { city: T("Sharjah", "الشارقة"), country: T("United Arab Emirates", "الإمارات العربية المتحدة"),
      role: T("Advisory & client leadership — GCC", "الاستشارة وقيادة العملاء — الخليج"),
      addr: T("Sharjah Media City, Sharjah", "مدينة الشارقة للإعلام، الشارقة"),
      tel: "+971 54 744 8002", tz: "GST · UTC+4" },
    { city: T("Lahore", "لاهور"), country: T("Pakistan", "باكستان"),
      role: T("Engineering & delivery at scale", "الهندسة والتنفيذ واسع النطاق"),
      addr: T("336, M Tower, G3, Johar Town, Lahore", "٣٣٦، برج M، G3، جوهر تاون، لاهور"),
      tel: "+92 322 469 6562", tz: "PKT · UTC+5" },
    { city: T("Dubbo", "دوبو"), country: T("Australia", "أستراليا"),
      role: T("Registered office — APAC", "المكتب المسجّل — آسيا والمحيط الهادئ"),
      addr: T("7 Ivy Court, Dubbo NSW 2830", "٧ آيفي كورت، دوبو، نيو ساوث ويلز ٢٨٣٠"),
      tel: "+61 470 669 147", tz: "AEST · UTC+10" },
  ],
};

C.contact = {
  lead: T(
    "Tell us the problem in your own words. Someone who would work on the engagement replies — usually within one business day.",
    "صِفوا المشكلة بكلماتكم. يردّ عليكم شخص سيعمل ضمن الارتباط — عادةً خلال يوم عمل واحد."
  ),
  // The live site's contact form opens with exactly this question and these
  // five options. Kept, because it is a good qualifier.
  whoAmI: T("Who are you?", "من أنتم؟"),
  whoOptions: [
    T("Enterprise", "مؤسسة"), T("Startup", "شركة ناشئة"), T("Agency", "وكالة"),
    T("Individual", "فرد"), T("Freelancer", "مستقل"),
  ],
  needs: T("What are you exploring?", "ما الذي تستكشفونه؟"),
  fields: {
    name: T("Name", "الاسم"),
    email: T("Work email", "البريد المهني"),
    company: T("Company", "الشركة"),
    message: T("What is not working?", "ما الذي لا يعمل كما ينبغي؟"),
    hint: T("The more specific, the more useful the first reply will be.", "كلما زاد التحديد، كان الردّ الأول أكثر فائدة."),
    submit: T("Send", "إرسال"),
    sent: T("Received. You will hear from one of us within one business day.", "وصلتنا رسالتكم. سيصلكم ردّ خلال يوم عمل واحد."),
    required: T("Required", "مطلوب"),
  },
};

C.footer = {
  blurb: T(
    "An AI and digital transformation consultancy working across the Gulf, Pakistan and international markets.",
    "شركة استشارات في الذكاء الاصطناعي والتحول الرقمي، تعمل في الخليج وباكستان والأسواق الدولية."
  ),
  cols: {
    services: T("Services", "الخدمات"),
    engage: T("Engage", "الارتباط"),
    firm: T("Firm", "الشركة"),
    offices: T("Offices", "المكاتب"),
  },
  rights: T("All rights reserved.", "جميع الحقوق محفوظة."),
};
