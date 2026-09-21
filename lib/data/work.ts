export const EN = {
  navWork:"Work", navServices:"Services", navPricing:"Pricing", navContact:"Contact", ctaNav:"Start a project",
  eyebrow:"Selected work — 02 projects",
  title:"Systems we shipped.",
  lede:"Two live builds. Both run in production today, both bilingual, both handling real money.",
  nextTitle:"Your project could be third.",
  nextLede:"Send a brief and we reply within one working day with scope, timeline and a fixed price."
};

export const AR: typeof EN = {
  navWork:"أعمالنا", navServices:"خدماتنا", navPricing:"الأسعار", navContact:"تواصل", ctaNav:"ابدأ مشروعك",
  eyebrow:"أعمال مختارة — ٠٢ مشروع",
  title:"أنظمة أطلقناها.",
  lede:"مشروعان مباشران. كلاهما يعمل في الإنتاج اليوم، وكلاهما ثنائي اللغة، ويتعامل مع أموال حقيقية.",
  nextTitle:"مشروعك قد يكون الثالث.",
  nextLede:"أرسل موجزاً ونرد خلال يوم عمل واحد بالنطاق والجدول الزمني وسعر ثابت."
};

const LIGHT = { bg:"#EAE6DC", fg:"#17140F", body:"rgba(23,20,15,.64)", muted:"rgba(23,20,15,.66)",
  stripe:"rgba(23,20,15,.07)", chip:"rgba(23,20,15,.16)", btnBg:"#17140F", btnFg:"#F3F0E9" };
const DARK = { bg:"#14110D", fg:"#F3F0E9", body:"rgba(243,240,233,.66)", muted:"rgba(243,240,233,.58)",
  stripe:"rgba(243,240,233,.08)", chip:"rgba(243,240,233,.2)", btnBg:"#F3F0E9", btnFg:"#17140F" };

export type Project = typeof LIGHT & {
  name: string;
  year: string;
  href?: string;
  shot: string;
  logo: string;
  /** Logo height as a share of the image panel. */
  logoSize: string;
  desc: string;
  tags: string[];
  cta: string;
};

export const PROJECTS: { en: Project[]; ar: Project[] } = {
  en:[
    { ...LIGHT, name:"MiniRue", year:"2026", href:"/work/minirue", logo:"/brand/minirue-ink.png", logoSize:"34%",
      shot:"MiniRue storefront screenshot",
      desc:"Original cosmetics and perfumes in luxury packaging. Storefront, multi-category catalogue, image pipeline, Trustpilot verification and Instapay checkout.",
      tags:["E-commerce","Next.js","SEO","Trustpilot"], cta:"Read the case study" },
    { ...DARK, name:"5argny", year:"2026", logo:"/brand/5argny.png", logoSize:"42%",
      btnBg:"rgba(243,240,233,.12)", btnFg:"rgba(243,240,233,.7)",
      shot:"5argny booking flow screenshot",
      desc:"Tours and travel operator. Trip catalogue, enquiry-to-booking flow and an Arabic-first interface. Details to confirm with you.",
      tags:["Booking","Arabic RTL","Payments"], cta:"Case study coming" }
  ],
  ar:[
    { ...LIGHT, name:"MiniRue", year:"2026", href:"/work/minirue", logo:"/brand/minirue-ink.png", logoSize:"34%",
      shot:"لقطة شاشة متجر MiniRue",
      desc:"مستحضرات تجميل وعطور أصلية بتغليف فاخر. متجر إلكتروني، كتالوج متعدد الأقسام، معالجة للصور، توثيق Trustpilot، ودفع عبر InstaPay.",
      tags:["تجارة إلكترونية","Next.js","سيو","Trustpilot"], cta:"اقرأ دراسة الحالة" },
    { ...DARK, name:"5argny", year:"2026", logo:"/brand/5argny.png", logoSize:"42%",
      btnBg:"rgba(243,240,233,.12)", btnFg:"rgba(243,240,233,.7)",
      shot:"لقطة شاشة مسار الحجز 5argny",
      desc:"شركة رحلات وسفر. كتالوج للرحلات، ومسار من الاستفسار إلى الحجز، وواجهة عربية أولاً. التفاصيل بحاجة للتأكيد.",
      tags:["حجز","عربي RTL","مدفوعات"], cta:"دراسة الحالة قريباً" }
  ]
};
