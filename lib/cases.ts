/**
 * The five case studies, lifted from the design artifact where they lived in a
 * JS object. Each renders through the artifact's case template.
 */
export type CaseStat = [value: string, label: string, labelAr: string];

export type CaseStudy = {
  cat: string; cat_ar: string; ind: string; ind_ar: string;
  svc: string; svc_ar: string; year: string; img: string;
  title: string; title_ar: string;
  ch: string; ch_ar: string; ap: string; ap_ar: string; out: string; out_ar: string;
  stats: CaseStat[];
};

export const CASES: Record<string, CaseStudy> = {
  "clinic":{ cat:'Healthcare', cat_ar:'الصحة', ind:'Healthcare network', ind_ar:'شبكة رعاية صحية', svc:'Applied ML · AI Product', svc_ar:'تعلّم آلي تطبيقي · منتج ذكاء اصطناعي', year:'2024', img:'ps180',
  "title":'Cutting clinic no-shows by a third with predictive scheduling', title_ar:'خفض تغيّب المرضى بمقدار الثلث عبر جدولة تنبّؤية',
  "ch":'A network of clinics was losing a real share of daily capacity to missed appointments. Slots sat empty while waitlists grew, and the front desk couldn’t fix it by hand.', ch_ar:'كانت شبكة عيادات تفقد حصّة حقيقية من طاقتها اليومية بسبب المواعيد الفائتة. مواعيد شاغرة بينما تطول قوائم الانتظار، ولا يستطيع الاستقبال إصلاح ذلك يدويًّا.',
  "ap":'We built a custom platform with an ML model that scores no-show risk per appointment and reallocates capacity in real time, overbooking intelligently only where the data supported it.', ap_ar:'بنينا منصّة مخصّصة بنموذج تعلّم آلي يُقيّم خطر التغيّب لكل موعد ويُعيد توزيع الطاقة لحظيًّا، بحجزٍ زائدٍ ذكيّ حيث تدعمه البيانات فقط.',
  "out":'Within two quarters no-shows fell by roughly a third and daily utilization rose materially, with no extra hiring and no longer clinic hours.', out_ar:'خلال ربعين انخفض التغيّب نحو الثلث وارتفع الاستخدام اليومي ماديًّا، دون توظيفٍ إضافي ولا تمديد ساعات العمل.',
  "stats":[['−32<span class="suf">%</span>','No-show rate','نسبة التغيّب'],['+18<span class="suf">%</span>','Daily utilization','الاستخدام اليومي'],['2q','To impact','حتى الأثر'],['0','Extra hires','توظيف إضافي']]},
  "lending":{ cat:'Finance', cat_ar:'المال', ind:'Lending provider', ind_ar:'جهة إقراض', svc:'Document AI · Risk Scoring', svc_ar:'ذكاء المستندات · تقييم المخاطر', year:'2023', img:'ps20',
  "title":'A lending back-office rebuilt for speed', title_ar:'مكتب إقراض خلفي أُعيد بناؤه للسرعة',
  "ch":'Manual, four-day credit reviews were quietly losing good borrowers to faster competitors, with no clear audit trail whenever a decision was questioned.', ch_ar:'كانت مراجعات ائتمان يدوية تستغرق أربعة أيام تُضيّع مقترضين جيّدين لصالح منافسين أسرع، دون أثرٍ واضحٍ للتدقيق كلّما اعتُرض على قرار.',
  "ap":'An extraction model reads each file, a risk model scores it, and an auditable engine routes genuine edge cases to a human, recording every decision with the reason behind it.', ap_ar:'نموذجُ استخراجٍ يقرأ كل ملف، ونموذجُ مخاطر يُقيّمه، ومحرّكٌ قابلٌ للتدقيق يُحيل الحالات الاستثنائية الحقيقية إلى إنسان، مُسجّلًا كل قرار مع سببه.',
  "out":'Same-day decisions became the norm, approvals sped up across the board, and every case now carries a complete, reviewable history.', out_ar:'صار القرار في اليوم نفسه هو القاعدة، وتسارعت الموافقات عمومًا، وأصبح لكل حالة سجلٌّ كاملٌ قابلٌ للمراجعة.',
  "stats":[['4→1<span class="suf">d</span>','Decision time','زمن القرار'],['+30<span class="suf">%</span>','Throughput','الإنتاجية'],['100<span class="suf">%</span>','Auditable','قابل للتدقيق'],['0','Rip-and-replace','استبدال كامل']]},
  "learning":{ cat:'Education', cat_ar:'التعليم', ind:'EdTech platform', ind_ar:'منصّة تعليمية', svc:'Adaptive Tutoring · Mobile', svc_ar:'تدريسٌ تكيّفي · جوال', year:'2023', img:'ps0',
  "title":'A learning app students actually finish', title_ar:'تطبيق تعليمي يُكمله الطلاب فعلًا',
  "ch":'Sign-ups looked healthy but completion was poor, and most learners were on slow or intermittent connections that the old app simply gave up on.', ch_ar:'بدت التسجيلات جيّدة لكن الإتمام كان ضعيفًا، وكان معظم المتعلّمين على اتصالات بطيئة أو متقطّعة استسلم لها التطبيق القديم ببساطة.',
  "ap":'We added an adaptive tutor that paces each learner from their own answers, and made the mobile app offline-first so a dropped connection never means lost progress.', ap_ar:'أضفنا مُعلّمًا تكيّفيًّا يضبط إيقاع كل متعلّم من إجاباته، وجعلنا التطبيق يعمل دون اتصال أولًا فلا يعني انقطاع الاتصال فقدان التقدّم.',
  "out":'Course completion climbed sharply and daily active use held steady well past the first week, on the same devices and networks as before.', out_ar:'ارتفع إتمام الدورات بشكلٍ حاد وظلّ الاستخدام اليومي ثابتًا إلى ما بعد الأسبوع الأول، على الأجهزة والشبكات نفسها.',
  "stats":[['+41<span class="suf">%</span>','Completion','الإتمام'],['×2','Day-7 retention','الاحتفاظ باليوم السابع'],['4.7','App rating','تقييم التطبيق'],['0','Connectivity blockers','عوائق الاتصال']]},
  "factory":{ cat:'Manufacturing', cat_ar:'التصنيع', ind:'Industrial group', ind_ar:'مجموعة صناعية', svc:'Predictive Maintenance · Data', svc_ar:'صيانة استباقية · بيانات', year:'2022', img:'banner',
  "title":'Live telemetry across three plants', title_ar:'قياسٌ حيّ عبر ثلاثة مصانع',
  "ch":'Each plant reported machine data in its own format and on its own schedule, so leadership never had a single, current picture of operations.', ch_ar:'كان كل مصنع يُبلّغ بيانات آلاته بتنسيقه الخاص وجدوله الخاص، فلم تحصل الإدارة قط على صورةٍ واحدة وحديثة للعمليات.',
  "ap":'We unified the feeds into one cloud data layer, then trained a failure model on it so alerts fire before a stoppage rather than after it.', ap_ar:'وحّدنا التدفّقات في طبقة بيانات سحابية واحدة، ثم درّبنا عليها نموذج أعطالٍ لتنطلق التنبيهات قبل التوقّف لا بعده.',
  "out":'Unplanned downtime dropped as teams caught issues early, and planning finally ran on one shared source of truth.', out_ar:'انخفض التوقّف غير المخطّط مع اكتشاف الفرق للمشكلات مبكرًا، وأخيرًا صار التخطيط يعتمد على مصدرٍ واحدٍ موثوق.',
  "stats":[['−26<span class="suf">%</span>','Unplanned downtime','التوقّف غير المخطّط'],['3→1','Data sources','مصادر البيانات'],['&lt;1<span class="suf">s</span>','Dashboard latency','زمن اللوحة'],['24/7','Monitoring','مراقبة']]},
  "shopify":{ cat:'Retail', cat_ar:'التجزئة', ind:'DTC brand', ind_ar:'علامة مباشرة للمستهلك', svc:'Demand Forecasting · Commerce', svc_ar:'تنبّؤ بالطلب · تجارة', year:'2022', img:'ps504',
  "title":'A Shopify replatform that doubled AOV', title_ar:'إعادة بناء شوبيفاي ضاعفت متوسّط قيمة الطلب',
  "ch":'A fast-growing brand had outgrown its theme: slow pages, a clumsy checkout, and no way to bundle products across two markets.', ch_ar:'تجاوزت علامةٌ سريعة النموّ قالبها: صفحاتٌ بطيئة، وصفحة دفعٍ مربكة، ولا وسيلة لتجميع المنتجات عبر سوقين.',
  "ap":'We rebuilt the storefront for speed, let a demand model pick the bundles, and streamlined checkout down to a single confident flow.', ap_ar:'أعدنا بناء الواجهة للسرعة، وتركنا نموذج طلبٍ يختار الحِزَم، وبسّطنا الدفع إلى مسارٍ واحدٍ واثق.',
  "out":'Average order value doubled, pages got dramatically faster, and the team can now launch new bundles without a developer.', out_ar:'تضاعف متوسّط قيمة الطلب، وصارت الصفحات أسرع بكثير، وبات الفريق يُطلق حِزَمًا جديدة دون مطوّر.',
  "stats":[['×2','Avg. order value','متوسّط الطلب'],['−48<span class="suf">%</span>','Load time','زمن التحميل'],['+22<span class="suf">%</span>','Conversion','التحويل'],['2','Markets live','أسواق فعّالة']]}
  };

export const CASE_IDS = Object.keys(CASES);
