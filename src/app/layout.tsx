import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/site";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary(defaultLocale);
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    openGraph: {
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      type: "website",
      locale: "es_EC",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const dictionary = await getDictionary(defaultLocale);

  return (
    <html lang="es" className={sora.variable}>
      <body>
        <Header dictionary={dictionary} />
        {children}
        <Footer dictionary={dictionary} />
      </body>
    </html>
  );
}
