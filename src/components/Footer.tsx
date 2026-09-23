import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

export function Footer({
  dictionary,
  locale,
}: {
  dictionary: Dictionary;
  locale: Locale;
}) {
  return (
    <footer className="site-footer bg-brand-dark text-[#e8edec] [padding:72px_0_24px]">
      <div className="page-container footer-grid w-[min(1180px,calc(100%_-_40px))] mx-auto grid grid-cols-[1fr_auto] gap-[40px] mobile:w-[calc(100%_-_32px)] mobile:grid-cols-[1fr] mobile:max-w-full mobile:mx-auto mobile:gap-[30px] compact:w-[calc(100%_-_28px)]">
        <div className="footer-brand">
          <Image
            src="/brand/logo-horizontal-negative.svg"
            width={220}
            height={52}
            alt="TechToJob"
          />
          <p className="footer-tagline text-[1.5rem] font-[750] [margin:25px_0_5px] mobile:text-[1.3rem]">
            {dictionary.footer.tagline}
          </p>
          <p>{dictionary.footer.description}</p>
        </div>
        <div className="footer-links grid gap-[10px] min-w-[180px] mobile:min-w-0">
          <Link href={localizedPath(locale, "#how-it-works")}>
            {dictionary.navigation.howItWorks}
          </Link>
          <Link href={localizedPath(locale, "#talent")}>
            {dictionary.navigation.talent}
          </Link>
          <Link href={localizedPath(locale, "#companies")}>
            {dictionary.navigation.companies}
          </Link>
          <Link href={localizedPath(locale, "/talent")}>
            {dictionary.navigation.exploreTalent}
          </Link>
          <a href={siteConfig.discordUrl} target="_blank" rel="noreferrer">
            Discord
          </a>
        </div>
      </div>
      <div className="page-container footer-bottom w-[min(1180px,calc(100%_-_40px))] mx-auto [border-top:1px_solid_rgba(255,255,255,.1)] mt-[48px] pt-[22px] text-[#aeb8b7] text-[.72rem] mobile:w-[calc(100%_-_32px)] mobile:max-w-full mobile:mx-auto mobile:mt-[36px] compact:w-[calc(100%_-_28px)]">
        <span>
          © {new Date().getFullYear()} {dictionary.footer.copyright}
        </span>
      </div>
    </footer>
  );
}
