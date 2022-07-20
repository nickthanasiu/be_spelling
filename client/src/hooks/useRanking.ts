import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { PuzzleRankingLevel } from '../../../shared/types';
import { puzzleAtom } from '../recoil/atoms/puzzle';
import { totalScoreAtom } from '../recoil/atoms/score';

export const useRanking = (): PuzzleRankingLevel => {

    const userScore = useRecoilValue(totalScoreAtom);
    const puzzleState = useRecoilValue(puzzleAtom);
    const [rankingIdx, setRankingIdx] = useState(0);

    const { rankings } = puzzleState;

    const nextRanking = rankings[rankingIdx + 1];

    useEffect(() => {
        if (userScore >= nextRanking.threshold) {
            setRankingIdx(rankingIdx + 1);
        }
    }, [userScore]);

    return rankings[rankingIdx].name;
};