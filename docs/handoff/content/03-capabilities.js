/* ==========================================================================
   Content, part 3 — the eight capability pages.

   These are the eight services walqalum.com sells today, kept as real pages
   with their real slugs so nothing on the live site loses its address. What
   changes is the framing: each one now sits under a practice rather than
   standing on its own as the offer, and each page carries the client's own
   current description quoted verbatim as `legacy`, so the before and after
   are visible on the same screen.

   The field that does the work here is `notWhen`. A capability page that
   only argues for itself is a price list. These pages are willing to send
   the reader to a different capability, to a diagnostic, or away entirely —
   which is the difference between a consultancy that builds and a dev shop
   with a strategy page.
   ========================================================================== */

C.capabilities = [
  {
    slug: "mobile-development",
    n: "01",
    name: T("Mobile Application Development", "تطوير تطبيقات الجوال"),
    practice: "engineering",
    img: "case-3",
    legacy: T(
      "Transform your idea into a powerful, scalable mobile app that delivers exceptional user experiences and business results.",
      "حوّلوا فكرتكم إلى تطبيق جوال قوي وقابل للتوسّع يقدّم تجربة استخدام استثنائية ونتائج أعمال ملموسة."
    ),
    lede: T(
      "An app is a commitment to a release cycle, a store review queue and a second codebase to keep in step with the first. We build native and cross-platform apps where the phone is genuinely where the work happens, and we say so plainly when it is not.",
      "التطبيق التزام بدورة إصدار، وبطابور مراجعة في المتاجر، وبقاعدة شيفرة ثانية يجب إبقاؤها متسقة مع الأولى. نبني تطبيقات أصلية وهجينة حين يكون الهاتف هو مكان إنجاز العمل فعلاً، ونقول ذلك صراحةً حين لا يكون كذلك."
    ),
    when: [
      T(
        "Your customers or field teams complete the core task away from a desk, and a browser cannot reach the camera, the scanner or the location data you need.",
        "عملاؤكم أو فرقكم الميدانية يُنجزون المهمة الأساسية بعيداً عن المكتب، والمتصفح لا يصل إلى الكاميرا أو الماسح أو بيانات الموقع التي تحتاجونها."
      ),
      T(
        "Usage is frequent enough that an icon on the home screen changes behaviour, rather than sitting unopened.",
        "تكرار الاستخدام مرتفع بما يجعل وجود أيقونة على الشاشة الرئيسية يغيّر السلوك فعلاً، لا أن تبقى دون فتح."
      ),
      T(
        "You already run a commerce or service platform, and the app is a second surface on the same spine rather than a separate product.",
        "لديكم منصة تجارة أو خدمة قائمة، والتطبيق سطح ثانٍ على العمود نفسه لا منتج منفصل."
      ),
    ],
    notWhen: T(
      "If the app would mostly show what your website already shows, build a progressive web app instead: you save the review queue, the second codebase and roughly half the budget, and nothing your customers do actually changes.",
      "إن كان التطبيق سيعرض المحتوى ذاته الموجود في موقعكم، فابنوا تطبيق ويب تقدّمياً بدلاً منه؛ ستوفّرون طابور المراجعة وقاعدة الشيفرة الثانية ونحو نصف الميزانية، ولن يتغيّر شيء في سلوك عملائكم."
    ),
    includes: [
      T("Product definition and a scoped first release", "تعريف المنتج ونطاق إصدار أول محدَّد"),
      T("Native or React Native build for iOS and Android", "بناء أصلي أو بـ React Native لنظامي iOS وأندرويد"),
      T("Design system shared with your web surface", "نظام تصميم مشترك مع سطحكم على الويب"),
      T("App Store and Play Store submission, including review responses", "النشر في App Store و Play Store، بما فيه الردّ على المراجعة"),
      T("Crash reporting, analytics and the release pipeline", "تتبّع الأعطال والتحليلات وخط الإصدار"),
    ],
    stack: ["React Native", "Swift", "Kotlin", "Firebase", "Node.js", "AWS"],
    related: "bremod",
  },
  {
    slug: "web-development",
    n: "02",
    name: T("Website Development", "تطوير المواقع الإلكترونية"),
    practice: "engineering",
    img: "case-1",
    legacy: T(
      "Unlock your digital potential with custom-built, performance-optimized websites designed for conversion, scalability, and a seamless user experience.",
      "أطلقوا إمكاناتكم الرقمية عبر مواقع مخصّصة ومحسّنة الأداء، مصمَّمة للتحويل والتوسّع وتجربة مستخدم سلسة."
    ),
    lede: T(
      "A website is the part of your operating model customers can see. We build sites where content operations, search visibility and conversion are designed together, because a rebuild that only changes the appearance changes no number you report on.",
      "الموقع هو الجزء الظاهر للعملاء من نموذج تشغيلكم. نبني مواقع تُصمَّم فيها عمليات المحتوى والظهور في البحث والتحويل معاً، لأن إعادة بناء تغيّر المظهر وحده لا تغيّر أي رقم تقيسونه."
    ),
    when: [
      T(
        "The current site cannot be edited by the people who own the content, so it always describes last quarter's business.",
        "الموقع الحالي لا يستطيع تحريره من يملكون المحتوى، فيصف دائماً أعمال الربع الماضي."
      ),
      T(
        "You are entering a second market or a second language and the existing structure cannot carry it.",
        "تدخلون سوقاً ثانية أو لغة ثانية، والبنية الحالية عاجزة عن حملها."
      ),
      T(
        "Deals are stalling at procurement because the site reads as less rigorous than the firm behind it.",
        "تتعثّر الصفقات عند مرحلة المشتريات لأن الموقع يبدو أقل انضباطاً من الشركة التي يمثّلها."
      ),
    ],
    notWhen: T(
      "If the pipeline is thin but the site converts the traffic it does get, the problem sits upstream of the build. A Growth Systems Audit will find it in two weeks for a fraction of what a rebuild costs.",
      "إن كانت الفرص قليلة بينما يحوّل الموقع ما يصله من زيارات، فالمشكلة سابقة للبناء. تدقيق أنظمة النمو سيجدها خلال أسبوعين وبجزء من كلفة إعادة البناء."
    ),
    includes: [
      T("Information architecture and content model", "بنية المعلومات ونموذج المحتوى"),
      T("Bilingual English and Arabic build, both treated as primary", "بناء ثنائي اللغة بالعربية والإنجليزية، كلتاهما أساسية"),
      T("Design system and component library your team can extend", "نظام تصميم ومكتبة مكوّنات قابلة للتوسيع من فريقكم"),
      T("Editorial workflow and publishing governance", "سير العمل التحريري وحوكمة النشر"),
      T("Analytics, tagging and conversion instrumentation", "التحليلات والوسوم وقياس التحويل"),
    ],
    stack: ["Next.js", "TypeScript", "Drupal", "WordPress", "Vercel", "GA4"],
    related: "shumailas",
  },
  {
    slug: "software-development",
    n: "03",
    name: T("Custom Software Development", "تطوير البرمجيات المخصّصة"),
    practice: "digital-transformation",
    img: "case-2",
    legacy: T(
      "At WALQALUM, we specialize in building tailored software solutions that solve real business problems.",
      "في WALQALUM، نتخصّص في بناء حلول برمجية مصمَّمة خصيصاً لمعالجة مشكلات عمل حقيقية."
    ),
    lede: T(
      "Custom software is worth building when the process it supports is the thing you compete on. Everywhere else, configured off-the-shelf software costs less to own and survives staff turnover better.",
      "البرمجيات المخصّصة تستحق البناء حين تكون العملية التي تدعمها هي ما تتنافسون عليه. أما في ما عدا ذلك، فالبرمجيات الجاهزة المهيَّأة أقل كلفة في الملكية وأقدر على الصمود أمام تبدّل الموظفين."
    ),
    when: [
      T(
        "The process is a genuine differentiator and no vendor sells it, because nobody else runs the business this way.",
        "العملية تمثّل تميّزاً حقيقياً ولا يبيعها أي مورّد، لأن لا أحد غيركم يدير العمل بهذه الطريقة."
      ),
      T(
        "Three teams keep the same data in three spreadsheets and reconcile it by hand.",
        "ثلاثة فرق تحتفظ بالبيانات نفسها في ثلاثة جداول، وتُطابقها يدوياً."
      ),
      T(
        "A packaged system does eighty per cent of the job and the remaining twenty per cent is where the margin sits.",
        "نظام جاهز يؤدي ثمانين بالمئة من العمل، والعشرون بالمئة المتبقية هي موضع الهامش."
      ),
    ],
    notWhen: T(
      "If the requirement is still being described as “like SAP but simpler”, you do not have a software problem yet. You have an operating-model question, and a Transformation Blueprint should answer it before anyone writes a line of code.",
      "إن كانت المتطلبات لا تزال تُوصَف بعبارة «مثل SAP لكن أبسط»، فأنتم لا تواجهون مشكلة برمجية بعد، بل سؤالاً في نموذج التشغيل ينبغي أن يجيب عنه مخطّط التحول قبل أن يكتب أحد سطر شيفرة."
    ),
    includes: [
      T("Process and requirements definition tied to a business case", "تعريف العملية والمتطلبات مربوطاً بدراسة جدوى"),
      T("Solution architecture and integration design", "معمارية الحل وتصميم التكامل"),
      T("Build in releases, with a working system at each one", "بناء على دفعات، مع نظام عامل عند كل دفعة"),
      T("Data migration from the spreadsheets and systems it replaces", "ترحيل البيانات من الجداول والأنظمة التي يحلّ محلها"),
      T("Adoption plan, documentation and handover to your team", "خطة التبنّي والتوثيق والتسليم إلى فريقكم"),
    ],
    stack: ["TypeScript", "Node.js", "Java", "PostgreSQL", "Power Platform", "AWS"],
    related: "nectios",
  },
  {
    slug: "ai-and-machine-learning",
    n: "04",
    name: T("AI & Machine Learning", "الذكاء الاصطناعي وتعلّم الآلة"),
    practice: "ai-advisory",
    img: "post-1",
    legacy: T(
      "Unlock intelligent transformation with advanced Artificial Intelligence and Machine Learning solutions tailored to your industry needs.",
      "أطلقوا تحوّلاً ذكياً عبر حلول متقدمة في الذكاء الاصطناعي وتعلّم الآلة مصمَّمة وفق احتياجات قطاعكم."
    ),
    lede: T(
      "Models are the cheap part. The expensive parts are the data that feeds them, the decision they change, and the person accountable when they are wrong. We scope all three before anything gets built.",
      "النماذج هي الجزء الرخيص. الأجزاء المكلفة هي البيانات التي تغذّيها، والقرار الذي تغيّره، والشخص المسؤول حين تُخطئ. نحدّد الثلاثة قبل بناء أي شيء."
    ),
    when: [
      T(
        "A decision is made dozens of times a day on evidence that already exists in your systems, and the cost of being slightly wrong is bearable.",
        "قرار يُتخذ عشرات المرات يومياً استناداً إلى أدلة موجودة أصلاً في أنظمتكم، وكلفة الخطأ الطفيف فيه محتمَلة."
      ),
      T(
        "Expensive people spend a large share of the week reading documents to extract a handful of facts.",
        "كفاءات مرتفعة الأجر تقضي جزءاً كبيراً من أسبوعها في قراءة مستندات لاستخراج بضع معلومات."
      ),
      T(
        "You have a pilot that works and no route to putting it in front of real users.",
        "لديكم تجربة أولية ناجحة ولا طريق لوضعها بين يدي مستخدمين حقيقيين."
      ),
    ],
    notWhen: T(
      "If the data lives in email attachments and three systems that disagree with each other, a model will only automate the disagreement. Fix the data foundation first — it is usually the whole project, and we will scope it as one rather than sell you a pilot on top of it.",
      "إن كانت البيانات موزّعة بين مرفقات البريد وثلاثة أنظمة متضاربة، فلن يفعل النموذج سوى أتمتة التضارب. أصلحوا أساس البيانات أولاً — فهو عادةً المشروع كله، وسنحدّد نطاقه على هذا الأساس بدل أن نبيعكم تجربة أولية فوقه."
    ),
    includes: [
      T("Ranked use-case portfolio with cost of ownership", "محفظة حالات استخدام مُرتّبة مع تكلفة الملكية"),
      T("Data readiness review and a remediation plan", "مراجعة جاهزية البيانات وخطة معالجة الفجوات"),
      T("Evaluation harness with a defined quality bar", "منظومة تقييم بمعيار جودة محدَّد"),
      T("Retrieval or fine-tuning build with human review designed in", "بناء بالاسترجاع أو بالضبط الدقيق، مع مراجعة بشرية مُدمجة بالتصميم"),
      T("Monitoring, drift checks and a model governance policy", "المراقبة وكشف الانحراف وسياسة حوكمة النماذج"),
    ],
    stack: ["OpenAI", "Anthropic", "Azure AI Foundry", "AWS Bedrock", "LangGraph", "Snowflake", "dbt"],
    related: "hainok",
  },
  {
    slug: "drupal-development",
    n: "05",
    name: T("Drupal Development", "تطوير Drupal"),
    practice: "engineering",
    img: "case-4",
    legacy: T(
      "Drive results with Drupal, the robust open-source CMS built for scalability, flexibility, and enterprise-level performance.",
      "حقّقوا نتائج مع Drupal، نظام إدارة المحتوى المفتوح المصدر المبني للتوسّع والمرونة والأداء على مستوى المؤسسات."
    ),
    lede: T(
      "Drupal earns its keep when content is an operation rather than a page count: many editors, strict permissions, several languages, and a structure other systems read from. We run it as a platform, not as a website.",
      "يستحق Drupal كلفته حين يكون المحتوى عمليةً لا عدد صفحات: محرّرون كثر، وصلاحيات صارمة، ولغات متعددة، وبنية تقرأ منها أنظمة أخرى. ندير Drupal كمنصّة لا كموقع."
    ),
    when: [
      T(
        "Dozens of editors publish under approval workflows, and who may change what is a governance question.",
        "عشرات المحرّرين ينشرون ضمن مسارات اعتماد، ومسألة من يحقّ له تغيير ماذا مسألة حوكمة."
      ),
      T(
        "The same content has to serve a website, an app and a partner feed from one source.",
        "المحتوى نفسه يجب أن يخدم موقعاً وتطبيقاً وتغذية للشركاء من مصدر واحد."
      ),
      T(
        "You publish in Arabic and English as equals, with a different editorial team behind each.",
        "تنشرون بالعربية والإنجليزية على قدم المساواة، بفريقين تحريريين مختلفين."
      ),
    ],
    notWhen: T(
      "If one marketing team publishes a handful of pages a month, Drupal is more governance than you will ever use. WordPress or a headless CMS will cost less to run and far less to hire for.",
      "إن كان فريق تسويق واحد ينشر بضع صفحات شهرياً، فإن Drupal حوكمة أكثر مما ستستخدمون. وسيكون WordPress أو نظام محتوى منفصل الواجهة أقل كلفة في التشغيل وأقل بكثير في التوظيف."
    ),
    includes: [
      T("Content model and taxonomy design", "تصميم نموذج المحتوى والتصنيفات"),
      T("Custom module and theme development", "تطوير وحدات وقوالب مخصّصة"),
      T("Multilingual and right-to-left configuration", "إعداد تعدّد اللغات ودعم الكتابة من اليمين إلى اليسار"),
      T("Editorial roles, workflow and approval design", "تصميم أدوار التحرير ومسارات الاعتماد"),
      T("Version upgrade path and security maintenance", "مسار ترقية الإصدارات وصيانة الأمن"),
    ],
    stack: ["Drupal", "PHP", "MySQL", "Composer", "React", "AWS"],
    related: "securance-catcher-sites",
  },
  {
    slug: "shopify-development",
    n: "06",
    name: T("Shopify Development", "تطوير Shopify"),
    practice: "engineering",
    img: "case-5",
    legacy: T(
      "Drive more sales with the world's leading eCommerce platform by leveraging our custom Shopify development and design services.",
      "حقّقوا مبيعات أعلى مع منصة التجارة الإلكترونية الأولى عالمياً عبر خدماتنا في تطوير وتصميم Shopify."
    ),
    lede: T(
      "Shopify is the right default for most direct-to-consumer commerce, and anything else needs an argument rather than an assumption. Our work usually sits in the parts Shopify leaves open: merchandising logic, integrations, and the operational tail behind an order.",
      "Shopify هو الخيار الافتراضي الصحيح لمعظم التجارة الموجّهة للمستهلك، وأي بديل يحتاج إلى تبرير لا إلى افتراض. عملنا غالباً في ما يتركه Shopify مفتوحاً: منطق العرض التجاري، والتكاملات، والذيل التشغيلي خلف كل طلب."
    ),
    when: [
      T(
        "You sell physical products and want payment, tax and fulfilment plumbing to be somebody else's responsibility.",
        "تبيعون منتجات مادية وتريدون أن تكون آليات الدفع والضريبة والتنفيذ مسؤولية جهة أخرى."
      ),
      T(
        "Your merchandising team should be able to launch a campaign without a developer in the path.",
        "ينبغي أن يطلق فريق العرض التجاري حملة دون وجود مطوّر في المسار."
      ),
      T(
        "The storefront needs to talk to an ERP, a warehouse or a loyalty system that Shopify does not know about.",
        "يحتاج المتجر أن يتحدث إلى نظام موارد أو مستودع أو برنامج ولاء لا يعرفه Shopify."
      ),
    ],
    notWhen: T(
      "If the catalogue is small and revenue comes from negotiated B2B contracts rather than checkout, a storefront rebuild is the wrong spend. The constraint is demand generation and quoting, and that belongs to Growth & Demand Systems.",
      "إن كان الكتالوج صغيراً وإيراداتكم تأتي من عقود متفاوض عليها مع الشركات لا من سلة الشراء، فإعادة بناء المتجر إنفاق في غير محلّه. القيد هو توليد الطلب والتسعير، وهذا من اختصاص أنظمة النمو والطلب."
    ),
    includes: [
      T("Theme development or a Shopify Plus build against your brand system", "تطوير قالب أو بناء على Shopify Plus وفق نظام هويتكم"),
      T("Custom app and API integration work", "تطوير تطبيقات مخصّصة وأعمال تكامل عبر الواجهات البرمجية"),
      T("Catalogue, pricing and promotion architecture", "بنية الكتالوج والتسعير والعروض الترويجية"),
      T("Checkout, subscription and payment configuration", "إعداد الدفع والاشتراكات وطرق السداد"),
      T("Migration from the existing platform with URLs and order history preserved", "الترحيل من المنصة الحالية مع الحفاظ على الروابط وسجل الطلبات"),
    ],
    stack: ["Shopify", "Liquid", "Hydrogen", "Shopify Functions", "Node.js", "Klaviyo"],
    related: "pnrm",
  },
  {
    slug: "it-infrastructure-and-cloud",
    n: "07",
    name: T("IT Infrastructure & Cloud Services", "البنية التحتية لتقنية المعلومات وخدمات السحابة"),
    practice: "engineering",
    img: "post-2",
    legacy: T(
      "At WALQALUM, we provide robust, scalable, and secure IT infrastructure and cloud solutions to support your digital transformation journey.",
      "في WALQALUM، نوفّر بنية تحتية وحلولاً سحابية متينة وقابلة للتوسّع وآمنة لدعم رحلة تحوّلكم الرقمي."
    ),
    lede: T(
      "Infrastructure work is judged on two numbers: what it costs each month, and how long you are down when something fails. We design against both, then hand over something your team can operate without calling us.",
      "يُحكم على أعمال البنية التحتية برقمين: كم تكلّف شهرياً، وكم تتوقفون حين يقع عطل. نصمّم للرقمين معاً، ثم نسلّم شيئاً يستطيع فريقكم تشغيله دون الاتصال بنا."
    ),
    when: [
      T(
        "The cloud bill is growing faster than the business and nobody can attribute it to a workload.",
        "فاتورة السحابة تنمو أسرع من الأعمال، ولا أحد يستطيع نسبتها إلى أحمال تشغيل بعينها."
      ),
      T(
        "You are moving off ageing on-premise hardware and cannot afford a single hard cutover.",
        "تنتقلون من أجهزة محلية متقادمة ولا تحتملون تحوّلاً مفاجئاً دفعة واحدة."
      ),
      T(
        "Recovery has never been tested, and the answer to “how long would we be down” is a guess.",
        "لم تُختبر خطة التعافي قط، والإجابة عن سؤال «كم سنتوقف؟» تخمين."
      ),
    ],
    notWhen: T(
      "If the application itself is the bottleneck, moving it to a bigger instance buys a few months and a larger invoice. The architecture has to change first, and that is engineering work rather than a migration.",
      "إن كان التطبيق نفسه هو عنق الزجاجة، فنقله إلى خادم أكبر يشتري بضعة أشهر وفاتورة أعلى. المعمارية هي ما يجب أن يتغيّر أولاً، وذلك عمل هندسي لا عملية ترحيل."
    ),
    includes: [
      T("Architecture review and target-state design", "مراجعة المعمارية وتصميم الحالة المستهدفة"),
      T("Migration plan with a rollback at every step", "خطة ترحيل مع إمكان التراجع عند كل خطوة"),
      T("Infrastructure as code and environment parity", "البنية التحتية كشيفرة وتطابق البيئات"),
      T("Cost allocation, tagging and a monthly optimisation cadence", "توزيع التكلفة والوسم ودورة تحسين شهرية"),
      T("Backup, recovery and incident runbooks, tested rather than written", "النسخ الاحتياطي والتعافي وأدلة الاستجابة للحوادث، مُختبَرة لا مكتوبة فقط"),
    ],
    stack: ["AWS", "Azure", "Terraform", "Kubernetes", "Docker", "Cloudflare", "Datadog"],
    related: "nectios",
  },
  {
    slug: "data-intelligence-and-cybersecurity",
    n: "08",
    name: T("Data Intelligence & Cybersecurity", "ذكاء البيانات والأمن السيبراني"),
    practice: "ai-advisory",
    img: "case-7",
    legacy: T(
      "At WALQALUM, we help businesses harness the power of data while safeguarding digital assets from evolving threats.",
      "في WALQALUM، نساعد الشركات على الاستفادة من قوة بياناتها مع حماية أصولها الرقمية من التهديدات المتغيّرة."
    ),
    lede: T(
      "These sit together because they are the same question asked twice: who can see your data, and can you trust what it tells you. We build the reporting layer and the controls that protect it as one piece of work.",
      "يقع الأمران معاً لأنهما السؤال نفسه مطروحاً مرتين: من يستطيع رؤية بياناتكم، وهل تثقون بما تقوله. نبني طبقة التقارير والضوابط التي تحميها كعمل واحد."
    ),
    when: [
      T(
        "Leadership meetings begin with an argument about whose number is the correct one.",
        "تبدأ اجتماعات القيادة بجدال حول أي الأرقام هو الصحيح."
      ),
      T(
        "A client or a regulator has asked for evidence of controls you cannot currently produce.",
        "طلب عميل أو جهة رقابية دليلاً على ضوابط لا تستطيعون إنتاجه اليوم."
      ),
      T(
        "You are about to put data in front of a model or a partner and cannot say precisely what is in it.",
        "أنتم على وشك وضع بيانات أمام نموذج أو شريك، ولا تستطيعون تحديد ما تحتويه بدقة."
      ),
    ],
    notWhen: T(
      "If you need a dashboard by the end of the month, do not start a warehouse programme. A scoped report straight off the source system answers the question now, and it tells you whether the warehouse is worth building at all.",
      "إن كنتم تحتاجون لوحة مؤشرات قبل نهاية الشهر، فلا تبدأوا ببرنامج مستودع بيانات. تقرير محدَّد النطاق من النظام المصدر يجيب على السؤال الآن، ويخبركم إن كان المستودع يستحق البناء أصلاً."
    ),
    includes: [
      T("Data warehouse and semantic layer with agreed definitions", "مستودع بيانات وطبقة دلالية بتعريفات متفق عليها"),
      T("Reporting and self-service analytics for named decisions", "تقارير وتحليلات ذاتية الخدمة لقرارات محدَّدة"),
      T("Access control, data classification and audit trail", "ضبط الوصول وتصنيف البيانات ومسار التدقيق"),
      T("Security assessment against SOC 2 and ISAE 3402 expectations", "تقييم أمني وفق متطلبات SOC 2 و ISAE 3402"),
      T("Monitoring and a tested incident response plan", "المراقبة وخطة استجابة للحوادث مُختبَرة"),
    ],
    stack: ["Snowflake", "dbt", "Power BI", "Looker Studio", "Microsoft Sentinel", "Cloudflare"],
    related: "securance",
  },
];
