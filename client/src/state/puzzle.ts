import { atom, selector } from "recoil";
import { PuzzleState } from "./types";
import { PuzzleResponse } from '../../../server/shared/types';

export interface PuzzlesApiResponse {
    puzzles: PuzzleResponse[];
    nextCursor: string;
}

export interface PuzzlesState {
    byId: { [key: string]: PuzzleState },
    allIds: string[]
}

export const puzzlesAtom = atom({
    key: 'puzzlesAtom',
    default: {} as PuzzlesState
});


export const puzzleAtom = atom({
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
