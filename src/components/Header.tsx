import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import { localeLabels, supportedLocales, type Locale } from "@/i18n/config";
import { localizedPath, switchLocalePath } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { ArrowUpRightIcon } from "./Icons";

export function Header({
  dictionary,
  locale,
  currentPath,
}: {
  dictionary: Dictionary;
  locale: Locale;
  currentPath: string;
}) {
  const links = [
    {
      label: dictionary.navigation.howItWorks,
      href: localizedPath(locale, "#how-it-works"),
    },
    {
      label: dictionary.navigation.talent,
      href: localizedPath(locale, "#talent"),
    },
    {
      label: dictionary.navigation.companies,
      href: localizedPath(locale, "#companies"),
    },
    {
      label: dictionary.navigation.community,
      href: localizedPath(locale, "#community"),
    },
    {
      label: dictionary.navigation.exploreTalent,
      href: localizedPath(locale, "/talent"),
    },
  ];

  const languageSwitcher = (
    <div
      className="locale-switcher inline-flex items-center p-[3px] [border-width:1px] [border-style:solid] border-[#d9e1e0] rounded-[11px] bg-white [box-shadow:0_6px_18px_rgba(47,52,54,.05)]"
      role="group"
      aria-label={dictionary.language.label}
    >
      {supportedLocales.map((item) => (
        <Link
          href={switchLocalePath(currentPath, item)}
          key={item}
          lang={item}
          hrefLang={item}
          aria-current={locale === item ? "page" : undefined}
          title={
            item === "es"
              ? dictionary.language.spanish
              : dictionary.language.english
          }
        >
          {localeLabels[item]}
        </Link>
      ))}
    </div>
  );

  return (
    <header className="site-header sticky top-0 z-[100] [background:rgba(255,255,255,.86)] [backdrop-filter:blur(18px)] [border-bottom:1px_solid_rgba(47,52,54,.08)] mobile:[background:rgba(255,255,255,.98)] mobile:[backdrop-filter:none]">
      <div className="page-container site-header__inner w-[min(1180px,calc(100%_-_40px))] mx-auto h-[78px] flex items-center gap-[28px] header-fit:gap-[18px] mobile:w-[calc(100%_-_32px)] mobile:h-[66px] mobile:max-w-full mobile:mx-auto mobile:gap-[12px] compact:w-[calc(100%_-_28px)]">
        <Link
          href={localizedPath(locale)}
          className="brand-link flex items-center mr-auto"
          aria-label={dictionary.accessibility.home}
        >
          <Image
            src="/brand/logo-horizontal-gradient.svg"
            alt="TechToJob"
            width={210}
            height={48}
            priority
          />
        </Link>

        <nav
          className="desktop-nav flex items-center gap-[24px] header-fit:gap-[16px] tablet:hidden"
          aria-label={dictionary.accessibility.mainNavigation}
        >
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="locale-switcher-wrap locale-switcher-wrap--desktop flex items-center flex-[0_0_auto] tablet:hidden">
          {languageSwitcher}
        </div>

        <a
          className="button button--primary header-cta inline-flex items-center justify-center gap-[10px] min-h-[44px] [padding:0_20px] rounded-[14px] font-bold text-[.93rem] [border-width:1px] [border-style:solid] border-[transparent] [transition:.2s_ease] bg-brand-mint text-brand-dark [box-shadow:0_10px_30px_rgba(132,192,191,.22)] px-[16px] header-fit:px-[13px] tablet:hidden motion-reduce:[transition:none]!"
          href={siteConfig.discordUrl}
          target="_blank"
          rel="noreferrer"
        >
          {dictionary.navigation.join}
          <ArrowUpRightIcon />
        </a>

        <details className="mobile-nav hidden tablet:block tablet:ml-auto">
          <summary
            className="menu-button hidden tablet:flex tablet:ml-auto tablet:w-[44px] tablet:h-[44px] tablet:[border-width:1px] tablet:[border-style:solid] tablet:border-[#dce4e3] tablet:bg-white tablet:rounded-[12px] tablet:items-center tablet:justify-center tablet:flex-col tablet:gap-[5px] mobile:w-[42px] mobile:h-[42px] mobile:flex-[0_0_42px]"
            aria-label={dictionary.accessibility.openMenu}
          >
            <span />
            <span />
          </summary>
          <div className="mobile-menu hidden tablet:block tablet:max-h-0 tablet:overflow-hidden tablet:bg-white tablet:[transition:max-height_.25s] tablet:absolute tablet:left-0 tablet:right-0 tablet:top-[100%] tablet:[box-shadow:0_20px_40px_rgba(47,52,54,.08)]">
            <nav
              className="page-container mobile-menu__inner w-[min(1180px,calc(100%_-_40px))] mx-auto tablet:grid tablet:gap-[16px] tablet:[padding:20px_0_26px] mobile:w-[calc(100%_-_32px)] mobile:max-w-full mobile:mx-auto mobile:[padding:18px_0_24px] mobile:gap-[14px] compact:w-[calc(100%_-_28px)]"
              aria-label={dictionary.accessibility.mainNavigation}
            >
              {links.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
              <div className="locale-switcher-wrap locale-switcher-wrap--mobile hidden items-center flex-[0_0_auto] tablet:flex tablet:mt-[2px]">
                {languageSwitcher}
              </div>
              <a
                className="button button--primary inline-flex items-center justify-center gap-[10px] min-h-[50px] [padding:0_20px] rounded-[14px] font-bold text-[.93rem] [border-width:1px] [border-style:solid] border-[transparent] [transition:.2s_ease] bg-brand-mint text-brand-dark [box-shadow:0_10px_30px_rgba(132,192,191,.22)] motion-reduce:[transition:none]!"
                href={siteConfig.discordUrl}
                target="_blank"
                rel="noreferrer"
              >
                {dictionary.navigation.join}
                <ArrowUpRightIcon />
              </a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
