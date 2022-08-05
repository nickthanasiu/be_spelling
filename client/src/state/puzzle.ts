import { atom, selector } from "recoil";
import ApiClient from "../api/client";
import { PuzzleOption } from "../../../shared/types";
import { PuzzleState } from "./types";


export const puzzleOptionsSelector = selector<PuzzleOption[]>({
    key: 'puzzleOptionsSelector',
    get: async (): Promise<PuzzleOption[]> => {
        return await ApiClient.get('/puzzles');
    },
    set: ({ set, get }, data) => {
        const currState = get(puzzleOptionsAtom);
        const nextState = { ...currState, ...data };
        set(puzzleOptionsAtom, nextState);
    }
});

export const puzzleOptionsAtom = atom<PuzzleOption[]>({
    key: 'puzzleOptionsAtom',
    default: puzzleOptionsSelector
});

export const puzzleAtom = atom<PuzzleState>({
    key: 'puzzleAtom',
    default: {} as PuzzleState
});

export const lettersSelector = selector({
    key: 'lettersSelector',
    get: ({ get }) => {
        const { letters } = get(puzzleAtom);

        return letters;
    }
});

export const lettersAtom = atom<string[]>({
    key: 'lettersAtom',
    default: lettersSelector
});

export const centerLetterSelector = selector({
    key: 'centerLetterSelector',
    get: ({ get }) => {
        const { centerLetter } = get(puzzleAtom);

        return centerLetter;
    }
});
