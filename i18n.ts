import "server-only";

export const locales = ["en", "ar"] as const;
export const defaultLocale = "en";

export type Locale = (typeof locales)[number];

const dictionaries: Record<Locale, () => Promise<any>> = {
  en: () => import("./content/en/en.json").then((module) => module.default),
  ar: () => import("./content/ar/ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
