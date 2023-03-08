import { selectorFamily } from "recoil";
///import { totalScoreSelector } from "./score";
import { currentPuzzleAtom } from "./puzzle";
import { PuzzleRanking, PuzzleRankingLevel } from "../../../server/shared/types";

/*
export const rankingSelector = selectorFamily<PuzzleRankingLevel, any>({
    key: 'rankingSelector',
    get: (puzzleId: string) => ({ get }) => {
        const totalScore = get(totalScoreSelector(puzzleId));
        const { rankings } = get(currentPuzzleAtom);

        const ranking = deriveRankingFromScore(totalScore, rankings);

        return ranking;
    }
});

*/

export function deriveRankingFromScore(score: number, rankings: any[]) {

    // Get index of the first ranking level beyond current score
    const nextRankingIndex = rankings.findIndex(ranking => score < ranking.threshold);

    // Get current ranking level by selecting the ranking at index just before above index
    const currentRankingIndex = nextRankingIndex - 1;

    return rankings[currentRankingIndex].name;
}