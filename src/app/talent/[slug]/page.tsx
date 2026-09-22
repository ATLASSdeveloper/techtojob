import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

export default async function LegacyTalentProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/${defaultLocale}/talent/${slug}`);
}
