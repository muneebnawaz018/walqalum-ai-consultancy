/**
 * The sectors we build AI for. One source for the home page band, the
 * industries page, the mega menu, the footer and the tab behaviour, so a new
 * sector is added once rather than in five places.
 */
export type Sector = {
  slug: string;
  name: string;
  nameAr: string;
  /** The sector in one sentence: what the AI has to cope with here. */
  lede: string;
  ledeAr: string;
  /** The three things we most often build for it. */
  uses: string[];
  usesAr: string[];
  /** Short constraints, rendered as chips. */
  tags: string[];
  tagsAr: string[];
};

export const SECTORS: Sector[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    nameAr: "الرعاية الصحية",
    lede: "Clinical copilots, triage and scheduling models, and patient-facing assistants, built where privacy and uptime are first-class requirements rather than afterthoughts.",
    ledeAr:
      "مساعدون سريريون ونماذج فرز وجدولة ومساعدون للمرضى، مبنيّة حيث تكون الخصوصية والاستمرارية متطلّبات أساسية لا أمرًا لاحقًا.",
    uses: [
      "No-show and triage risk models",
      "Clinical document extraction",
      "Patient assistants that escalate to a clinician",
    ],
    usesAr: [
      "نماذج مخاطر التغيّب والفرز",
      "استخراج المستندات السريرية",
      "مساعدون للمرضى يُحيلون إلى الطبيب",
    ],
    tags: ["PHI-safe", "Human in the loop", "Uptime SLAs"],
    tagsAr: ["حماية البيانات الصحية", "إنسان في الحلقة", "ضمان الاستمرارية"],
  },
  {
    slug: "finance",
    name: "Finance",
    nameAr: "التمويل",
    lede: "Risk scoring, document extraction and fraud detection, where every automated decision has to carry a reason a regulator will accept.",
    ledeAr:
      "تقييم مخاطر واستخراج مستندات وكشف احتيال، حيث يجب أن يحمل كل قرار آليّ سببًا يقبله المنظّم.",
    uses: ["Credit and fraud scoring", "KYC document extraction", "Reconciliation and month-end close"],
    usesAr: ["تقييم الائتمان والاحتيال", "استخراج مستندات اعرف عميلك", "التسوية والإقفال الشهري"],
    tags: ["Explainable", "Real-time", "Auditable"],
    tagsAr: ["قابل للتفسير", "لحظي", "قابل للتدقيق"],
  },
  {
    slug: "real-estate",
    name: "Real estate",
    nameAr: "العقارات",
    lede: "Valuation models, listing intelligence and document-heavy transactions, where one mispriced asset costs more than the whole system.",
    ledeAr:
      "نماذج تقييم وذكاء إعلانات ومعاملات مثقلة بالمستندات، حيث يكلّف أصلٌ واحد مُسعَّر خطأً أكثر من النظام كلّه.",
    uses: [
      "Automated valuation models",
      "Listing enrichment and search ranking",
      "Lease and contract extraction",
    ],
    usesAr: ["نماذج التقييم الآلي", "إثراء الإعلانات وترتيب البحث", "استخراج عقود الإيجار والبيع"],
    tags: ["Comparable-aware", "Geospatial", "Document AI"],
    tagsAr: ["مراعاة المقارنات", "بيانات جغرافية", "ذكاء المستندات"],
  },
  {
    slug: "retail",
    name: "Retail & commerce",
    nameAr: "التجزئة والتجارة",
    lede: "Demand forecasting, catalogue intelligence and recommendations, tuned to margin rather than to clicks.",
    ledeAr: "تنبّؤ بالطلب وذكاء كتالوج وتوصيات، مضبوطة على الهامش لا على النقرات.",
    uses: [
      "Demand and inventory forecasting",
      "Catalogue enrichment and deduplication",
      "Recommendations tuned to margin",
    ],
    usesAr: ["تنبّؤ بالطلب والمخزون", "إثراء الكتالوج وإزالة التكرار", "توصيات مضبوطة على الهامش"],
    tags: ["Margin-aware", "Multi-market", "Real-time"],
    tagsAr: ["مراعاة الهامش", "أسواق متعدّدة", "لحظي"],
  },
  {
    slug: "education",
    name: "Education",
    nameAr: "التعليم",
    lede: "Tutoring assistants, automated marking and content generation, grounded in your curriculum and measured on completion rather than sign-ups.",
    ledeAr:
      "مساعدو تدريس وتصحيح آليّ وتوليد محتوى، مبنيّة على منهجك ومُقاسة بالإتمام لا بالتسجيل.",
    uses: ["Adaptive tutoring", "Automated marking against a rubric", "Curriculum-grounded content"],
    usesAr: ["تدريس تكيّفي", "تصحيح آليّ وفق معايير", "محتوى مبنيّ على المنهج"],
    tags: ["Grounded answers", "Offline-first", "Scalable content"],
    tagsAr: ["إجابات موثّقة", "يعمل دون اتصال", "محتوى قابل للتوسّع"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    nameAr: "التصنيع",
    lede: "Vision inspection, demand forecasting and predictive maintenance, fed by telemetry pulled out of silos into one operational picture.",
    ledeAr:
      "فحص بالرؤية الحاسوبية وتنبّؤ بالطلب وصيانة استباقية، تُغذّيها قياسات تُنتزع من العزلة إلى صورة تشغيلية واحدة.",
    uses: ["Vision-based defect detection", "Predictive maintenance", "Yield and throughput forecasting"],
    usesAr: ["كشف العيوب بالرؤية الحاسوبية", "الصيانة الاستباقية", "تنبّؤ بالإنتاجية والمردود"],
    tags: ["Computer vision", "Predictive maintenance", "Edge + cloud"],
    tagsAr: ["رؤية حاسوبية", "صيانة استباقية", "الطرف والسحابة"],
  },
  {
    slug: "fintech",
    name: "Fintech",
    nameAr: "التقنية المالية",
    lede: "Payments, onboarding and embedded finance, where the model has to decide in the time it takes a screen to load and still be defensible afterwards.",
    ledeAr:
      "مدفوعات وتسجيل عملاء وتمويل مدمج، حيث على النموذج أن يقرّر في زمن تحميل الشاشة ويبقى قابلًا للدفاع عنه بعدها.",
    uses: [
      "Real-time transaction risk scoring",
      "Onboarding and identity verification",
      "Support and dispute agents",
    ],
    usesAr: ["تقييم مخاطر المعاملات لحظيًّا", "تسجيل العملاء والتحقّق من الهوية", "وكلاء الدعم والنزاعات"],
    tags: ["Sub-second", "PCI-aware", "Defensible decisions"],
    tagsAr: ["دون الثانية", "مراعاة معايير الدفع", "قرارات قابلة للدفاع"],
  },
  {
    slug: "legal",
    name: "Legal & professional",
    nameAr: "القانون والخدمات المهنية",
    lede: "Contract review, discovery and research assistants that cite their source, because an answer without a reference is worthless here.",
    ledeAr:
      "مراجعة عقود ومساعدو بحث واستكشاف يستشهدون بمصادرهم، لأن إجابة بلا مرجع لا قيمة لها هنا.",
    uses: ["Contract review and clause extraction", "Discovery and research assistants", "Matter and billing automation"],
    usesAr: ["مراجعة العقود واستخراج البنود", "مساعدو الاستكشاف والبحث", "أتمتة الملفات والفوترة"],
    tags: ["Citations required", "Privilege-aware", "Audit trail"],
    tagsAr: ["استشهاد إلزامي", "مراعاة السريّة", "أثر تدقيق"],
  },
];

/** "Sector 01" through "Sector 08", as the panel labels them. */
export const sectorLabel = (i: number) => `Sector ${String(i + 1).padStart(2, "0")}`;
export const sectorLabelAr = (i: number) => `القطاع ${String(i + 1).padStart(2, "0")}`;
