import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { isLocale, supportedLocales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const dictionary = await getDictionary(locale);
  const requestHeaders = await headers();
  const currentPath = requestHeaders.get("x-techtojob-pathname") ?? `/${locale}`;

  return (
    <>
      <Header dictionary={dictionary} locale={locale} currentPath={currentPath} />
      {children}
      <Footer dictionary={dictionary} locale={locale} />
    </>
  );
}
