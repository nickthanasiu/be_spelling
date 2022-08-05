import { atom, selector } from "recoil";
import { InputState } from "./types";

export const inputAtom = atom<InputState>({
    key: 'inputAtom',
    default: [] as InputState
});

export const inputStringSelector = selector({
    key: 'inputAsString',
    get: ({get}) => {
        const inputState = get(inputAtom);

        // Return string of characters derived from inputState array
        return inputState.map(letterObj => letterObj.letter)
                .join('')
                .toLowerCase();
    }   
});

export const inputTouchedAtom = atom<boolean>({
    key: 'inputTouchedAtom',
    default: false
});
