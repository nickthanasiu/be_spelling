import { useState, useEffect } from 'react';
import { useRecoilValue } from "recoil";
import { type PuzzleRankingLevel } from '../../../server/shared/types';
import { totalScoreAtom, puzzleAtom } from '../state';

// @TODO :: Maybe instead of a hook, this could be a recoil selector??
export const useRanking = (): PuzzleRankingLevel => {
    const userScore = useRecoilValue(totalScoreAtom);

    const puzzleState = useRecoilValue(puzzleAtom);

    const { rankings } = puzzleState;

    const [rankingIdx, setRankingIdx] = useState(0);

    const nextRanking = rankings[rankingIdx + 1];

    useEffect(() => {
        if (userScore >= nextRanking.threshold) {
            setRankingIdx(rankingIdx + 1);
        }
    }, [userScore]);

    return rankings[rankingIdx].name;
};