import { atom, selector } from 'recoil';

export type LetterObj = {
    letter: string;
    isValid: boolean;
    isCenterLetter: boolean;
}

export const inputAtom = atom<LetterObj[]>({
    key: 'inputAtom',
    default: [] as LetterObj[]
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
