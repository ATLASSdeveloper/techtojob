import type { Locale } from "@/i18n/config";
import { getTalentBySlug } from "@/data/talents";

type TournamentResult = {
  winnerSlug: string;
  winningProjectId: string;
  confirmed: boolean;
};

// Replace this example when a tournament has an official, published result.
// Return null to display the usual featured talent until a result exists.
function getTournamentResult(): TournamentResult | null {
  return {
    winnerSlug: "sebastian-ilbay",
    winningProjectId: "techtojob-landing",
    confirmed: false,
  };
}

export function getLatestTournamentWinner(locale: Locale) {
  const result = getTournamentResult();
  if (!result) return null;

  const profile = getTalentBySlug(locale, result.winnerSlug);
  const project = profile?.projects.find(
    (item) => item.id === result.winningProjectId,
  );

  if (!profile || !project) {
    throw new Error("The tournament winner or winning project was not found");
  }

  return { profile, project, confirmed: result.confirmed };
}
