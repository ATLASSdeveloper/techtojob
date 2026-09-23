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
    <main className="not-found min-h-[65vh] grid place-items-center text-center [padding:60px_20px]">
      <div>
        <span className="eyebrow inline-flex items-center gap-[8px] uppercase tracking-[.14em] text-[.75rem] font-bold text-[#547b79] mobile:text-[.68rem] mobile:tracking-[.12em]">
          404
        </span>
        <h1>{dictionary.common.notFoundTitle}</h1>
        <p>{dictionary.common.notFoundDescription}</p>
        <Link
          href={localizedPath(locale, "/talent")}
          className="button button--primary inline-flex items-center justify-center gap-[10px] min-h-[50px] [padding:0_20px] rounded-[14px] font-bold text-[.93rem] [border-width:1px] [border-style:solid] border-[transparent] [transition:.2s_ease] bg-brand-mint text-brand-dark [box-shadow:0_10px_30px_rgba(132,192,191,.22)] motion-reduce:[transition:none]!"
        >
          {dictionary.common.exploreTalent}
        </Link>
      </div>
    </main>
  );
}
