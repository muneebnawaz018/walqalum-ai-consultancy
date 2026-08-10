/* ==========================================================================
   Content, part 4 — the pages the live site has that the rebrand had not yet
   covered: Our Partners, Life at WalQalum, Privacy Policy, Terms.

   Everything marked `needsInput: true` is scaffolding around content only
   WalQalum can supply. It is labelled in the interface rather than invented,
   for the same reason the case-study metrics are still dashes.

   ⚠ The two legal pages are STRUCTURE, not legal advice. They are written to
   the right shape for a firm operating across the UAE, Pakistan and
   Australia — which means three privacy regimes — but every clause needs a
   lawyer before it goes near production.
   ========================================================================== */

C.partners = {
  lead: T(
    "We build on other people's platforms. Which ones, and how deeply, is a decision that shapes what your systems cost to run for the next five years — so it is worth being explicit about where our experience actually is.",
    "نبني على منصّات غيرنا. وأيّها نختار وإلى أي عمق، قرارٌ يحدّد تكلفة تشغيل أنظمتكم للسنوات الخمس القادمة — لذا من الأفضل أن نكون صريحين بشأن أين تقع خبرتنا فعلياً."
  ),
  platformsHeading: T("Platforms we build on", "المنصّات التي نبني عليها"),
  platformsNote: T(
    "Depth of experience, stated plainly. Formal partner tier and certification status is being confirmed and will be shown here once verified — we would rather leave it blank than imply a status we cannot evidence.",
    "عمق الخبرة، بصراحة. يجري التحقق من مستوى الشراكة الرسمية والاعتمادات وستُعرض هنا بعد توثيقها — نفضّل تركها فارغة على الإيحاء بمكانة لا نستطيع إثباتها."
  ),
  platforms: [
    { name: "AWS", area: T("Cloud & infrastructure", "السحابة والبنية التحتية"), note: T("Primary cloud across every platform we run.", "السحابة الأساسية لكل منصّة نشغّلها.") },
    { name: "Drupal", area: T("Enterprise CMS", "إدارة محتوى المؤسسات"), note: T("Ten years of build and content-governance work.", "عشر سنوات في البناء وحوكمة المحتوى.") },
    { name: "Shopify", area: T("Commerce", "التجارة الإلكترونية"), note: T("Storefront, theme and app-layer builds.", "بناء الواجهات والقوالب وطبقة التطبيقات.") },
    { name: "Odoo", area: T("ERP", "تخطيط موارد المؤسسات"), note: T("Implementation and rescue of stalled programmes.", "التنفيذ وإنقاذ البرامج المتعثّرة.") },
    { name: "Microsoft", area: T("Dynamics & Power Platform", "دايناميكس ومنصة باور"), note: T("Process automation inside existing estates.", "أتمتة العمليات داخل الأنظمة القائمة.") },
    { name: "OpenAI · Anthropic", area: T("Model providers", "مزوّدو النماذج"), note: T("Production integrations with human review designed in.", "تكاملات إنتاجية مع مراجعة بشرية مُصمَّمة ضمنها.") },
    { name: "Snowflake · dbt", area: T("Data platform", "منصة البيانات"), note: T("Warehousing and the semantic layer above it.", "المستودعات والطبقة الدلالية فوقها.") },
    { name: "HubSpot", area: T("CRM & lifecycle", "إدارة العملاء ودورة الحياة"), note: T("Demand systems and attribution.", "أنظمة الطلب والإسناد.") },
  ],
  alliancesHeading: T("Alliances", "التحالفات"),
  alliancesNeedsInput: T(
    "Named referral and delivery partners will be listed here. WalQalum to confirm which relationships are formal and can be published.",
    "ستُدرج هنا أسماء شركاء الإحالة والتنفيذ. على WalQalum تأكيد أي علاقات رسمية يمكن نشرها."
  ),
  workWithUsHeading: T("Working with us", "العمل معنا"),
  models: [
    {
      h: T("Referral", "إحالة"),
      p: T("You have a client with a problem outside your scope. We take the engagement, you keep the relationship, and the commercial terms are agreed before anyone speaks to the client.", "لديكم عميل بمشكلة خارج نطاقكم. نتولّى الارتباط، وتحتفظون بالعلاقة، وتُتفق الشروط التجارية قبل أن يتحدث أحد مع العميل."),
    },
    {
      h: T("White-label delivery", "تنفيذ بعلامتكم"),
      p: T("We deliver under your name, to your standards, invisible to your client. Common where an agency has won consulting work it cannot staff.", "ننفّذ باسمكم ووفق معاييركم، دون ظهور أمام عميلكم. شائع حين تفوز وكالة بعمل استشاري لا تملك طاقمه."),
    },
    {
      h: T("Joint delivery", "تنفيذ مشترك"),
      p: T("Two firms, one plan, one accountable lead named at the start. We are equally willing for that lead to be yours.", "شركتان، خطة واحدة، وقائد واحد مسؤول يُسمّى منذ البداية. ولا مانع لدينا أن يكون ذلك القائد منكم."),
    },
  ],
};

C.careers = {
  lead: T(
    "Forty-odd people across three countries. Small enough that the person who wins the work is usually the person who does it — which is the whole argument this firm makes to clients, and it only holds if it is true internally too.",
    "نحو أربعين شخصاً في ثلاث دول. صغيرون بما يكفي لأن يكون من يفوز بالعمل هو نفسه من ينفّذه غالباً — وهي الحجّة التي تقوم عليها هذه الشركة أمام عملائها، ولا تصحّ إلا إذا صحّت داخلياً أيضاً."
  ),
  truthsHeading: T("What it is actually like", "كيف هو الأمر فعلاً"),
  truths: [
    {
      h: T("You will talk to clients", "ستتحدثون مع العملاء"),
      p: T("Engineers here sit in the room where the problem gets defined, not just the one where it gets built. Some people find that energising and some find it exhausting. Worth knowing which you are before applying.", "المهندسون هنا يجلسون في الغرفة التي تُعرَّف فيها المشكلة، لا في غرفة التنفيذ وحدها. البعض يجد ذلك محفّزاً والبعض يجده مرهقاً. من الأفضل أن تعرفوا أيّهما أنتم قبل التقديم."),
    },
    {
      h: T("The work is varied, sometimes uncomfortably", "العمل متنوّع، وأحياناً بدرجة غير مريحة"),
      p: T("A firm this size does not have a bench of specialists. You will work across sectors and stacks. That is the fastest way to get good, and the slowest way to get deep.", "شركة بهذا الحجم لا تملك فريق تخصّصات جاهزاً. ستعملون عبر قطاعات وتقنيات مختلفة. وهذا أسرع طريق لإتقان العمل، وأبطأ طريق للتعمّق."),
    },
    {
      h: T("Three time zones", "ثلاث مناطق زمنية"),
      p: T("Gulf, Pakistan and Australia. We overlap deliberately rather than expecting anyone to live on someone else's clock, but some meetings are early and some are late.", "الخليج وباكستان وأستراليا. نتقاطع بقصد بدل أن نطلب من أحد العيش على ساعة غيره، لكن بعض الاجتماعات مبكّرة وبعضها متأخّر."),
    },
    {
      h: T("We write things down", "نوثّق ما نقرّره"),
      p: T("Decisions, not status. If a choice cannot survive being written in a paragraph someone else can read, it usually was not a decision.", "نوثّق القرارات لا الحالة. فإذا لم يصمد اختيارٌ مكتوباً في فقرة يقرؤها غيرك، فغالباً لم يكن قراراً."),
    },
  ],
  hiringHeading: T("How we hire", "كيف نوظّف"),
  hiring: [
    { n: "01", h: T("A conversation", "محادثة"), p: T("Thirty minutes on what you have built and what you want next. No panel, no puzzles.", "ثلاثون دقيقة عمّا بنيتموه وما تريدونه تالياً. بلا لجنة ولا ألغاز.") },
    { n: "02", h: T("A real problem", "مشكلة حقيقية"), p: T("A scoped exercise drawn from work we have actually done, paid if it takes more than two hours.", "تمرين محدّد مأخوذ من عمل نفّذناه فعلاً، مدفوع إن تجاوز ساعتين.") },
    { n: "03", h: T("Meet the team", "لقاء الفريق"), p: T("Including at least one person who is not in your discipline. They are the ones you will have to explain your work to.", "بمن فيهم شخص واحد على الأقل من خارج تخصّصكم. فهم من ستشرحون لهم عملكم.") },
    { n: "04", h: T("Offer", "عرض"), p: T("Within a week of the last conversation, with the band stated openly. We do not negotiate against another candidate's number.", "خلال أسبوع من آخر محادثة، مع ذكر النطاق المالي بوضوح. ولا نساوم مقابل رقم مرشّح آخر.") },
  ],
  rolesHeading: T("Open roles", "الوظائف المتاحة"),
  rolesNeedsInput: T(
    "Live vacancies will be listed here. WalQalum to supply current openings, locations and bands.",
    "ستُدرج الشواغر الحالية هنا. على WalQalum تزويدنا بالوظائف المتاحة ومواقعها ونطاقاتها."
  ),
  speculative: T(
    "Nothing listed that fits? Write to us anyway. Tell us what you would want to work on rather than what you have done — the second is on your CV already.",
    "لا يوجد ما يناسبكم؟ راسلونا على أي حال. أخبرونا بما تودّون العمل عليه بدل ما أنجزتموه — فالثاني موجود في سيرتكم أصلاً."
  ),
};

/* --- legal ---------------------------------------------------------------
   Structure only. Written for a firm with UAE, Pakistan and Australian
   presence, which means the UAE PDPL, Australia's Privacy Act, and the GDPR
   wherever an EU client's data is processed. Needs counsel before launch. */
C.legal = {
  reviewNotice: T(
    "Template — structure and headings only. Every clause requires review by qualified counsel in the UAE, Pakistan and Australia before publication.",
    "نموذج — الهيكل والعناوين فقط. تتطلب كل فقرة مراجعة من مستشار قانوني مؤهّل في الإمارات وباكستان وأستراليا قبل النشر."
  ),
  privacy: {
    title: T("Privacy Policy", "سياسة الخصوصية"),
    updated: T("Last updated: to be set at publication", "آخر تحديث: يُحدَّد عند النشر"),
    lead: T(
      "WalQalum operates across three jurisdictions, so more than one privacy regime applies to the same enquiry. This page sets out what we collect, why, how long we keep it, and what you can ask us to do about it.",
      "تعمل WalQalum في ثلاث ولايات قضائية، ما يعني خضوع الاستفسار الواحد لأكثر من نظام خصوصية. تبيّن هذه الصفحة ما نجمعه ولماذا، ومدة احتفاظنا به، وما يمكنكم مطالبتنا به بشأنه."
    ),
    sections: [
      { h: T("Who we are", "من نحن"), p: T("The data controller, its registered address in New South Wales, its operating entities in the UAE and Pakistan, and the contact point for privacy enquiries.", "الجهة المتحكّمة بالبيانات، وعنوانها المسجّل في نيو ساوث ويلز، وكياناتها التشغيلية في الإمارات وباكستان، وجهة الاتصال لطلبات الخصوصية.") },
      { h: T("What we collect", "ما نجمعه"), p: T("Information you give us through the enquiry form, correspondence and engagement documents; information collected automatically through analytics and server logs; and information received from third parties such as enrichment or CRM tools.", "المعلومات التي تقدّمونها عبر نموذج الاستفسار والمراسلات ووثائق الارتباط؛ والمعلومات المجمّعة آلياً عبر التحليلات وسجلات الخادم؛ والمعلومات الواردة من أطراف ثالثة مثل أدوات الإثراء وإدارة العملاء.") },
      { h: T("Why we process it", "لماذا نعالجها"), p: T("Responding to enquiries, delivering engagements, meeting contractual and legal obligations, and improving how the site performs. The lawful basis for each purpose is stated separately where the GDPR applies.", "الرد على الاستفسارات، وتنفيذ الارتباطات، والوفاء بالالتزامات التعاقدية والقانونية، وتحسين أداء الموقع. ويُذكر الأساس القانوني لكل غرض على حدة حيثما تنطبق اللائحة الأوروبية.") },
      { h: T("Client confidential material", "مواد العملاء السرّية"), p: T("Material shared with us during a diagnostic or programme is governed by the engagement agreement and its confidentiality terms, not by this policy. Where AI tooling touches client material, the controls are set out in the engagement agreement.", "تخضع المواد المشاركة معنا خلال التشخيص أو البرنامج لاتفاقية الارتباط وشروط السرية فيها، لا لهذه السياسة. وحين تتعامل أدوات الذكاء الاصطناعي مع مواد العميل، تُحدَّد الضوابط في اتفاقية الارتباط.") },
      { h: T("Where data is held", "أين تُحفظ البيانات"), p: T("Hosting regions, the transfer mechanisms relied on when data leaves its region of origin, and the safeguards applied to each.", "مناطق الاستضافة، وآليات النقل المعتمدة حين تغادر البيانات منطقتها الأصلية، والضمانات المطبّقة على كل منها.") },
      { h: T("How long we keep it", "مدة الاحتفاظ"), p: T("Retention periods by category, and what triggers deletion.", "مدد الاحتفاظ حسب الفئة، وما الذي يُفعّل الحذف.") },
      { h: T("Your rights", "حقوقكم"), p: T("Access, correction, erasure, objection and portability, and how to exercise each. Rights differ by jurisdiction and the differences are set out rather than averaged.", "الوصول والتصحيح والمحو والاعتراض وقابلية النقل، وكيفية ممارسة كل منها. وتختلف الحقوق باختلاف الولاية القضائية، وتُبيَّن الفروق بدل تعميمها.") },
      { h: T("Cookies", "ملفات تعريف الارتباط"), p: T("Categories used, the consent mechanism, and how to change your choice later.", "الفئات المستخدمة، وآلية الموافقة، وكيفية تغيير اختياركم لاحقاً.") },
      { h: T("Complaints", "الشكاوى"), p: T("How to raise a concern with us, and the supervisory authority in each jurisdiction if you are not satisfied with our response.", "كيفية رفع شكوى إلينا، والجهة الرقابية في كل ولاية قضائية إن لم يرضكم ردّنا.") },
    ],
  },
  terms: {
    title: T("Terms & Conditions", "الشروط والأحكام"),
    updated: T("Last updated: to be set at publication", "آخر تحديث: يُحدَّد عند النشر"),
    lead: T(
      "These terms govern use of this website. They do not govern an engagement — that is done by a signed engagement agreement, and where the two disagree, the engagement agreement wins.",
      "تحكم هذه الشروط استخدام هذا الموقع. ولا تحكم الارتباطات — فتلك تحكمها اتفاقية ارتباط موقّعة، وعند التعارض تسود اتفاقية الارتباط."
    ),
    sections: [
      { h: T("Using this site", "استخدام هذا الموقع"), p: T("Permitted use, prohibited use, and the account terms that apply to any protected area such as the newsroom.", "الاستخدام المسموح والممنوع، وشروط الحسابات المطبّقة على أي منطقة محمية مثل لوحة المحتوى.") },
      { h: T("Content on this site", "المحتوى على هذا الموقع"), p: T("Published material is for general information. Nothing here is advice on your specific circumstances, and no client relationship is created by reading it or by sending an enquiry.", "المواد المنشورة للعلم العام. ولا شيء هنا استشارة لظروفكم الخاصة، ولا تنشأ علاقة عميل بقراءتها أو بإرسال استفسار.") },
      { h: T("Intellectual property", "الملكية الفكرية"), p: T("Ownership of the site, its content and its marks, and the limited licence granted to visitors.", "ملكية الموقع ومحتواه وعلاماته، والترخيص المحدود الممنوح للزوار.") },
      { h: T("Case studies and client names", "دراسات الحالة وأسماء العملاء"), p: T("Client names and outcomes are published only with written permission. Figures are published only where the client has confirmed them.", "لا تُنشر أسماء العملاء ونتائجهم إلا بإذن كتابي. ولا تُنشر الأرقام إلا بعد تأكيد العميل لها.") },
      { h: T("Third-party links", "روابط الأطراف الثالثة"), p: T("We are not responsible for external sites, and a link is not an endorsement.", "لسنا مسؤولين عن المواقع الخارجية، والرابط ليس تزكية.") },
      { h: T("Liability", "المسؤولية"), p: T("Limitations and exclusions to the extent permitted by the applicable law in each jurisdiction.", "التحديدات والاستثناءات بالقدر الذي يسمح به القانون المطبّق في كل ولاية قضائية.") },
      { h: T("Governing law", "القانون الحاكم"), p: T("The governing law and the forum for disputes, stated once and unambiguously.", "القانون الحاكم وجهة الفصل في النزاعات، مذكورين مرة واحدة ودون لبس.") },
      { h: T("Changes", "التعديلات"), p: T("How these terms may change and how a change is notified.", "كيفية تعديل هذه الشروط وكيفية الإشعار بالتعديل.") },
    ],
  },
};
