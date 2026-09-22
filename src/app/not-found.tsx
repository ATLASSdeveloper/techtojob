import Link from "next/link";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export default async function NotFound() {
  const dictionary = await getDictionary(defaultLocale);
  return (
    <main className="not-found">
      <div>
        <span className="eyebrow">404</span>
        <h1>{dictionary.common.notFoundTitle}</h1>
        <p>{dictionary.common.notFoundDescription}</p>
        <Link href="/talent" className="button button--primary">{dictionary.common.exploreTalent}</Link>
      </div>
    </main>
  );
}
