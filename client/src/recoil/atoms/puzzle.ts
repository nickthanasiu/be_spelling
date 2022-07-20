import { atom, selector } from 'recoil';
import { PuzzleRanking } from "../../../../shared/types";

export interface PuzzleState {
    date: string;
    centerLetter: string;
    letters: string[];
    pangrams: string[];
    words: string[];
    rankings: PuzzleRanking[];
};

export const puzzleAtom = atom<PuzzleState>({
    key: 'puzzleAtom',
    default: {} as PuzzleState
});

export const lettersSelector = selector<string[]>({
    key: 'lettersSelector',
    get: ({ get }) => {
        const puzzle = get(puzzleAtom);

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
        const puzzle = get(puzzleAtom);

        return puzzle.centerLetter;
    }
});
