import type { Dictionary } from "./en";

/**
 * The site's own words, in Arabic.
 *
 * What is here is interface vocabulary — navigation, buttons, column headings —
 * where the Arabic term is standard and not a matter of voice.
 *
 * What is *not* here is anything that reads as marketing: the footer's
 * description of the firm is the firm's own positioning, and a translation of
 * it is a copywriting decision rather than a lookup. Those keys are typed as
 * required, so they cannot simply be forgotten; they carry the English text
 * until someone who writes in the firm's voice replaces them. Every such key is
 * marked `NEEDS ARABIC` below — that comment is the checklist.
 */
export const ar: Dictionary = {
  nav: {
    home: "الرئيسية",
    about: "من نحن",
    industries: "القطاعات",
    work: "أعمالنا",
    insights: "رؤى",
    contact: "اتصل بنا",
  },
  actions: {
    startProject: "ابدأ مشروعًا",
    allWork: "كل الأعمال",
    allInsights: "كل الرؤى",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    toggleSound: "تبديل صوت الواجهة",
    toggleTheme: "تبديل السمة الفاتحة والداكنة",
    switchLanguage: "تغيير اللغة",
  },
  footer: {
    /* NEEDS ARABIC — the firm's positioning line. */
    about:
      "An AI consultancy and engineering agency. Fifteen years of production software under everything we ship.",
    links: "روابط",
    explore: "استكشف",
    contact: "تواصل",
    available: "متاحون لمشاريع جديدة",
    rights: "جميع الحقوق محفوظة.",
    privacy: "الخصوصية",
    terms: "الشروط",
  },
};
