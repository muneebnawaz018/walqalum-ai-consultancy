/**
 * Privacy and terms, in the artifact's page-head and prose shapes. The artifact
 * linked both from the footer but never drew them.
 *
 * The wording describes what this site actually does — the contact form, the
 * absence of tracking — rather than boilerplate. It still needs a lawyer's read
 * before launch.
 */
export function Legal({ doc }: { doc: "privacy" | "terms" }) {
  const content = doc === "privacy" ? PRIVACY : TERMS;

  return (
    <section className="view" data-route={doc}>
      <div className="pagehead">
        <div className="wrap">
          <span className="eyebrow mono reveal" data-en={content.eyebrow.en} data-ar={content.eyebrow.ar}>
            {content.eyebrow.en}
          </span>
          <h1 className="display reveal" data-en={content.title.en} data-ar={content.title.ar}>
            {content.title.en}
          </h1>
          <p className="reveal" data-en={content.lede.en} data-ar={content.lede.ar}>
            {content.lede.en}
          </p>
        </div>
      </div>

      <section className="band">
        <div className="wrap">
          {content.sections.map((s) => (
            <div className="prose reveal" key={s.h.en}>
              <h3 data-en={s.h.en} data-ar={s.h.ar}>
                {s.h.en}
              </h3>
              <div className="body">
                {s.p.map((para) => (
                  <p key={para.en} data-en={para.en} data-ar={para.ar}>
                    {para.en}
                  </p>
                ))}
              </div>
            </div>
          ))}
          <p className="mono" style={{ marginTop: 40 }}>
            Last updated: February 2026
          </p>
        </div>
      </section>
    </section>
  );
}

const PRIVACY = {
  eyebrow: { en: "Privacy", ar: "الخصوصية" },
  title: { en: "What we collect, and what we don't.", ar: "ما نجمعه، وما لا نجمعه." },
  lede: {
    en: "Short version: the contact form, and nothing else. No analytics, no advertising pixels, no cookies for tracking.",
    ar: "باختصار: نموذج التواصل، ولا شيء غيره. لا تحليلات ولا بكسلات إعلانية ولا كوكيز للتتبّع.",
  },
  sections: [
    {
      h: { en: "The contact form", ar: "نموذج التواصل" },
      p: [
        {
          en: "When you send us a message we store your name, email address, company if you give one, the type of work you selected, and what you wrote. We use it to answer you and to keep track of the conversation.",
          ar: "حين ترسل رسالة نحتفظ باسمك وبريدك واسم شركتك إن ذكرته ونوع العمل الذي اخترته ونصّ رسالتك. نستخدمها للردّ عليك ولمتابعة المحادثة.",
        },
        {
          en: "We do not sell it, share it with advertisers, or add you to a mailing list you did not ask for.",
          ar: "لا نبيعها ولا نشاركها مع المعلنين ولا نضيفك إلى قائمة بريدية لم تطلبها.",
        },
      ],
    },
    {
      h: { en: "Tracking", ar: "التتبّع" },
      p: [
        {
          en: "This site sets no tracking cookies and runs no third-party analytics. The only thing kept in your browser is your language choice, so the site opens in the language you last read it in.",
          ar: "لا يضع هذا الموقع كوكيز تتبّع ولا يشغّل تحليلات من طرف ثالث. الشيء الوحيد المحفوظ في متصفّحك هو اختيارك للّغة، ليفتح الموقع باللغة التي قرأته بها آخر مرة.",
        },
      ],
    },
    {
      h: { en: "Where it lives", ar: "أين تُحفظ" },
      p: [
        {
          en: "Enquiries are stored in our own database, reachable only by the people who answer them. We keep them as long as the relationship is live, and delete them on request.",
          ar: "تُحفظ الطلبات في قاعدة بياناتنا، ولا يصل إليها إلا من يردّ عليها. نحتفظ بها ما دامت العلاقة قائمة، ونحذفها عند الطلب.",
        },
        {
          en: "To see what we hold about you, or to have it deleted, write to tafseel@walqalum.com.",
          ar: "لمعرفة ما لدينا عنك أو لطلب حذفه، راسلنا على tafseel@walqalum.com.",
        },
      ],
    },
  ],
};

const TERMS = {
  eyebrow: { en: "Terms", ar: "الشروط" },
  title: { en: "Terms of use.", ar: "شروط الاستخدام." },
  lede: {
    en: "These cover this website. The work itself is governed by the contract we sign with you, which takes precedence over anything here.",
    ar: "تغطي هذه الشروط الموقع. أمّا العمل نفسه فيحكمه العقد الموقّع معك، وهو المقدَّم على كل ما ورد هنا.",
  },
  sections: [
    {
      h: { en: "The content", ar: "المحتوى" },
      p: [
        {
          en: "Everything on this site, including text, design, code and images, belongs to WalQalum unless stated otherwise. You are welcome to read, quote and link to it. You may not republish it as your own.",
          ar: "كل ما في هذا الموقع، من نصوص وتصميم وشيفرة وصور، ملك لـ WalQalum ما لم يُذكر خلاف ذلك. يمكنك القراءة والاقتباس والربط. ولا يجوز إعادة نشره منسوبًا إليك.",
        },
      ],
    },
    {
      h: { en: "Case studies and figures", ar: "دراسات الحالة والأرقام" },
      p: [
        {
          en: "The outcomes described are drawn from real engagements. They describe what happened for that client, in that context, and are not a promise of the same result for you.",
          ar: "النتائج الموصوفة مأخوذة من ارتباطات حقيقية. تصف ما حدث لذلك العميل في سياقه، وليست وعدًا بالنتيجة نفسها لك.",
        },
      ],
    },
    {
      h: { en: "Products", ar: "المنتجات" },
      p: [
        {
          en: "Products listed on this site carry their own terms, agreed when you subscribe. Nothing here grants a licence to use them.",
          ar: "للمنتجات المدرجة هنا شروطها الخاصة التي يُتفق عليها عند الاشتراك. ولا يمنح هذا الموقع ترخيصًا لاستخدامها.",
        },
      ],
    },
    {
      h: { en: "Getting in touch", ar: "التواصل" },
      p: [
        {
          en: "Questions about any of this go to tafseel@walqalum.com.",
          ar: "أي استفسار عن هذه الشروط يُرسل إلى tafseel@walqalum.com.",
        },
      ],
    },
  ],
};
