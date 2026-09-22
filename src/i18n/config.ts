export const supportedLocales = ["es"] as const;
export type Locale = (typeof supportedLocales)[number];
export const defaultLocale: Locale = "es";
