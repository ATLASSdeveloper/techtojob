import type { Locale } from "./config";
import { localizedPath } from "./routing";

export function getLanguageAlternates(locale: Locale, path = "/") {
  return {
    canonical: localizedPath(locale, path),
    languages: {
      es: localizedPath("es", path),
      en: localizedPath("en", path),
      "x-default": localizedPath("es", path),
    },
  };
}

export function getOpenGraphLocale(locale: Locale) {
  return locale === "es" ? "es_EC" : "en_US";
}
