import Link from "next/link";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { localizedPath } from "@/i18n/routing";

export default async function NotFound() {
  const dictionary = await getDictionary(defaultLocale);

  return (
    <main className="not-found">
      <div>
        <span className="eyebrow">404</span>
        <h1>{dictionary.common.notFoundTitle}</h1>
        <p>{dictionary.common.notFoundDescription}</p>
        <Link href={localizedPath(defaultLocale, "/talent")} className="button button--primary">
          {dictionary.common.exploreTalent}
        </Link>
      </div>
    </main>
  );
}
