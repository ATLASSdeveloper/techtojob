"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import { localeLabels, supportedLocales, type Locale } from "@/i18n/config";
import { localizedPath, switchLocalePath } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { ArrowUpRightIcon } from "./Icons";

export function Header({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: dictionary.navigation.howItWorks, href: localizedPath(locale, "#how-it-works") },
    { label: dictionary.navigation.talent, href: localizedPath(locale, "#talent") },
    { label: dictionary.navigation.companies, href: localizedPath(locale, "#companies") },
    { label: dictionary.navigation.community, href: localizedPath(locale, "#community") },
    { label: dictionary.navigation.exploreTalent, href: localizedPath(locale, "/talent") },
  ];

  const languageSwitcher = (
    <div className="locale-switcher" aria-label={dictionary.language.label}>
      {supportedLocales.map((item) => (
        <Link
          href={switchLocalePath(pathname, item)}
          key={item}
          lang={item}
          hrefLang={item}
          aria-current={locale === item ? "page" : undefined}
          title={item === "es" ? dictionary.language.spanish : dictionary.language.english}
        >
          {localeLabels[item]}
        </Link>
      ))}
    </div>
  );

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href={localizedPath(locale)} className="brand-link" aria-label={dictionary.accessibility.home}>
          <Image src="/brand/logo-horizontal-gradient.svg" alt="TechToJob" width={210} height={48} priority />
        </Link>

        <nav className="desktop-nav" aria-label={dictionary.accessibility.mainNavigation}>
          {links.map((link) => (
            <Link href={link.href} key={link.href}>{link.label}</Link>
          ))}
        </nav>

        <div className="locale-switcher-wrap locale-switcher-wrap--desktop">{languageSwitcher}</div>

        <a className="button button--primary header-cta" href={siteConfig.discordUrl} target="_blank" rel="noreferrer">
          {dictionary.navigation.join}
          <ArrowUpRightIcon />
        </a>

        <button
          className={`menu-button ${open ? "is-open" : ""}`}
          type="button"
          aria-label={open ? dictionary.accessibility.closeMenu : dictionary.accessibility.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu ${open ? "is-open" : ""}`}>
        <div className="container mobile-menu__inner">
          {links.map((link) => (
            <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}</Link>
          ))}
          <div className="locale-switcher-wrap locale-switcher-wrap--mobile">{languageSwitcher}</div>
          <a className="button button--primary" href={siteConfig.discordUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            {dictionary.navigation.join}
            <ArrowUpRightIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
