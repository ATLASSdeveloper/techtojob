import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

export function Footer({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Image src="/brand/logo-horizontal-negative.svg" width={220} height={52} alt="TechToJob" />
          <p className="footer-tagline">{dictionary.footer.tagline}</p>
          <p>{dictionary.footer.description}</p>
        </div>
        <div className="footer-links">
          <Link href={localizedPath(locale, "#how-it-works")}>{dictionary.navigation.howItWorks}</Link>
          <Link href={localizedPath(locale, "#talent")}>{dictionary.navigation.talent}</Link>
          <Link href={localizedPath(locale, "#companies")}>{dictionary.navigation.companies}</Link>
          <Link href={localizedPath(locale, "/talent")}>{dictionary.navigation.exploreTalent}</Link>
          <a href={siteConfig.discordUrl} target="_blank" rel="noreferrer">Discord</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {dictionary.footer.copyright}</span>
      </div>
    </footer>
  );
}
