import { atom, selectorFamily } from "recoil";
import { PuzzleState } from "./types";
import { PuzzleResponse } from '../../../server/shared/types';
import ApiClient from '../api/client';

export interface PuzzlesApiResponse {
    puzzles: PuzzleResponse[];
    nextCursor: string;
}

export const puzzlesAtom = atom({
    key: 'puzzlesAtom',
    default: null
});


export const currentPuzzleAtom = atom<PuzzleState | undefined>({
    key: 'puzzleAtom',
    default: undefined
});

export const puzzleQueryById = selectorFamily({
    key: 'currentPuzzleQuery',
    get: (puzzleId: string) => async () => {
        const response = await ApiClient.get<PuzzleState>(`/puzzles/${puzzleId}`);
        return response;
    }
});

/*

export const lettersSelector = selector<string[]>({
    key: 'lettersSelector',
    get: ({ get }) => {
        const puzzle = get(currentPuzzleAtom);

        return puzzle?.letters;
    }
});

export const lettersAtom = atom<string[]>({
    key: 'lettersAtom',
    default: lettersSelector
});

export const centerLetterSelector = selector({
    key: 'centerLetterSelector',
    get: ({ get }) => {
        const puzzle = get(currentPuzzleAtom);

        return puzzle.centerLetter;
    }
});

*/
