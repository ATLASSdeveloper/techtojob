import type { Metadata } from "next";
import { headers } from "next/headers";
import { Sora } from "next/font/google";
import "./globals.css";
import { defaultLocale, isLocale } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.name,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const requestedLocale = requestHeaders.get("x-techtojob-locale");
  const locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  return (
    <html lang={locale} className={sora.variable}>
      <body>{children}</body>
    </html>
  );
}
