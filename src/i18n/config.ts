export const supportedLocales = ["es", "en"] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "es";

export function isLocale(value: string | undefined | null): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export const localeLabels: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};
