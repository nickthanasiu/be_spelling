import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { RankingType } from '../components/status/Progress';
import { puzzleState } from '../recoil/atoms/puzzle';
import { totalScoreAtom } from '../recoil/atoms/score';

// @TODO :: Maybe instead of a hook, this could be a recoil selector??
export const useRanking = (): RankingType => {
    const userScore = useRecoilValue(totalScoreAtom);
    const loadable = useRecoilValueLoadable(puzzleState);
    const puzzle = loadable.contents?.puzzle;

    const rankings = puzzle?.rankings;

    const [rankingIdx, setRankingIdx] = useState(0);

    const nextRanking = rankings[rankingIdx + 1];

    useEffect(() => {
        if (userScore >= nextRanking.threshold) {
            setRankingIdx(rankingIdx + 1);
        }
    }, [userScore]);

    return rankings[rankingIdx].name;
};