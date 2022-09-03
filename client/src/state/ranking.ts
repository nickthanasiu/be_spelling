import { atom, selector } from "recoil";
import { totalScoreAtom } from "./score";
import { puzzleAtom } from "./puzzle";
import { PuzzleRankingLevel } from "../../../server/shared/types";

export const rankingSelector = selector<PuzzleRankingLevel>({
    key: 'rankingSelector',
    get: ({ get }) => {
        const totalScore = get(totalScoreAtom);
        const { rankings } = get(puzzleAtom);

        // Get index of the first ranking level beyond current score
        const nextRankingIndex = rankings.findIndex(ranking => totalScore < ranking.threshold);

        // Get current ranking level by selecting the ranking at index just before above index
        const currentRankingIndex = nextRankingIndex - 1;

        return rankings[currentRankingIndex].name;
    }
});

export const rankingAtom = atom({
    key: 'rankingAtom',
    default: rankingSelector
});