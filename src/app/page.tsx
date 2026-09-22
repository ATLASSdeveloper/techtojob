import { LandingPage } from "@/features/landing/LandingPage";
import { featuredTalent } from "@/data/talents";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export default async function HomePage() {
  const dictionary = await getDictionary(defaultLocale);
  return <LandingPage dictionary={dictionary} featuredTalent={featuredTalent} />;
}
