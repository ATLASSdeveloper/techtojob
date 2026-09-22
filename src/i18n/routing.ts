import type { Locale } from "./config";

export function localizedPath(locale: Locale, path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("mailto:") || path.startsWith("tel:")) {
    return path;
  }

  if (path.startsWith("#")) {
    return `/${locale}${path}`;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function switchLocalePath(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && (segments[0] === "es" || segments[0] === "en")) {
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  }

  return localizedPath(nextLocale, pathname);
}
