"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import { siteConfig } from "@/lib/site";
import { ArrowUpRightIcon } from "./Icons";

export function Header({ dictionary }: { dictionary: Dictionary }) {
  const [open, setOpen] = useState(false);

  const links = [
    { label: dictionary.navigation.howItWorks, href: "/#how-it-works" },
    { label: dictionary.navigation.talent, href: "/#talent" },
    { label: dictionary.navigation.companies, href: "/#companies" },
    { label: dictionary.navigation.community, href: "/#community" },
    { label: dictionary.navigation.exploreTalent, href: "/talent" },
  ];

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand-link" aria-label="TechToJob, inicio">
          <Image src="/brand/logo-horizontal-gradient.svg" alt="TechToJob" width={210} height={48} priority />
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {links.map((link) => (
            <Link href={link.href} key={link.href}>{link.label}</Link>
          ))}
        </nav>

        <a className="button button--primary header-cta" href={siteConfig.discordUrl} target="_blank" rel="noreferrer">
          {dictionary.navigation.join}
          <ArrowUpRightIcon />
        </a>

        <button className={`menu-button ${open ? "is-open" : ""}`} type="button" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu ${open ? "is-open" : ""}`}>
        <div className="container mobile-menu__inner">
          {links.map((link) => (
            <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}</Link>
          ))}
          <a className="button button--primary" href={siteConfig.discordUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            {dictionary.navigation.join}
            <ArrowUpRightIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
