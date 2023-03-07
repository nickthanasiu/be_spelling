import { atom, selectorFamily } from 'recoil';
import { answersById } from './foundWords';
import { puzzleAtom } from './puzzle';

export const totalScoreSelector = selectorFamily({
    key: 'totalScoreSelector',
    get: (puzzleId: string) => ({ get }) => {

        // Score should be derived from answers

        const answers = get(answersById(puzzleId));
        const { pangrams } = get(puzzleAtom);

        const totalScore = deriveTotalScoreFromWordsList(answers, pangrams);
  
        return totalScore;
    }
});

export const totalScoreAtom = atom({
    key: 'totalScoreAtom',
    default: totalScoreSelector
});

export const prevWordScoreAtom = atom({
    key: 'prevWordScoreAtom',
    default: 1
});


// Helpers

function calculateScore(wordLength: number, isPangram: boolean = false) {
    const score = isPangram ? wordLength + 7
        : wordLength > 4 ? wordLength
        : 1;

    return score;
}

export function deriveTotalScoreFromWordsList(answers: string[], pangrams: string[]) {

    const score = answers
        .map((answer) => {
            const isPangram = pangrams.includes(answer);
            const score = calculateScore(answer.length, isPangram);
            
            return score;
        })
        .reduce((prev, curr) => prev + curr, 0);

        return score;
}