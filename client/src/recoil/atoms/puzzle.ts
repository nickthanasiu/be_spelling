import { atom, selector } from 'recoil';
import ApiClient from '../../api/client';
import { RankingType } from '../../components/status/Progress';

export interface PuzzleState {
    date: string;
    maxScore: number;
    wordCount: number;
    rankings: { name: RankingType; threshold: number }[];
    centerLetter: string;
    letters: string[];
    pangrams: string[];
    words: string[];
};

export const puzzleSelector = selector<PuzzleState>({
    key: 'puzzleSelector',
    get: async (): Promise<PuzzleState> => {
        return await ApiClient.get('/puzzles');
    },
    set: ({ set, get }, newData) => {
        const currState = get(puzzleAtom);
        const newState = { ...currState, ...newData };

        set(puzzleAtom, newState);
    },
});

export const puzzleAtom = atom<any>({
    key: 'puzzleAtom',
    default: puzzleSelector
});

export const lettersSelector = selector<string[]>({
    key: 'lettersSelector',
    get: ({ get }) => {
        const { puzzle } = get(puzzleAtom);

        return puzzle.letters;
    }
});

export const lettersAtom = atom<string[]>({
    key: 'lettersAtom',
    default: lettersSelector
});

export const centerLetterSelector = selector({
    key: 'centerLetterSelector',
    get: ({ get }) => {
        const { puzzle } = get(puzzleAtom);

        return puzzle.centerLetter;
    }
});
