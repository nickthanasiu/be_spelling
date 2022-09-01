import { atom, selector } from "recoil";
import ApiClient from "../api/client";
import { PuzzleState } from "./types";
import { PuzzleOption } from '../../../shared/types';

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
