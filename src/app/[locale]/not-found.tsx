"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { en } from "@/i18n/dictionaries/en";
import { es } from "@/i18n/dictionaries/es";
import { isLocale } from "@/i18n/config";
import { localizedPath } from "@/i18n/routing";

export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = isLocale(params.locale) ? params.locale : "es";
  const dictionary = locale === "en" ? en : es;

  return (
    <main className="not-found">
      <div>
        <span className="eyebrow">404</span>
        <h1>{dictionary.common.notFoundTitle}</h1>
        <p>{dictionary.common.notFoundDescription}</p>
        <Link href={localizedPath(locale, "/talent")} className="button button--primary">
          {dictionary.common.exploreTalent}
        </Link>
      </div>
    </main>
  );
}
