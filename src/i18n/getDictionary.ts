import type { Locale } from "./config";

const dictionaries = {
  es: () => import("./dictionaries/es").then((module) => module.es),
  en: () => import("./dictionaries/en").then((module) => module.en),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
