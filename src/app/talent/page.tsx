import Link from "next/link";
import { talentProfiles } from "@/data/talents";
import { TalentCard } from "@/features/talent/TalentCard";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { ArrowRightIcon } from "@/components/Icons";

export default async function TalentDirectoryPage() {
  const dictionary = await getDictionary(defaultLocale);
  return (
    <main className="directory-page">
      <section className="directory-hero">
        <div className="container directory-hero__inner">
          <span className="eyebrow">{dictionary.talentDirectory.eyebrow}</span>
          <h1>{dictionary.talentDirectory.title}</h1>
          <p>{dictionary.talentDirectory.description}</p>
          <Link className="text-link" href="/">{dictionary.talentDirectory.backHome}<ArrowRightIcon /></Link>
        </div>
      </section>
      <section className="container directory-grid-wrap">
        <div className="directory-grid">
          {talentProfiles.map((profile) => <TalentCard profile={profile} dictionary={dictionary} key={profile.id} />)}
          <article className="coming-card"><span>+</span><h3>{dictionary.common.comingSoonTitle}</h3><p>{dictionary.common.comingSoonDescription}</p></article>
        </div>
      </section>
    </main>
  );
}
