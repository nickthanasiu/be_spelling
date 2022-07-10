import { atom } from 'recoil';

export type TAddPuzzleFormState = {
    date: string,
    centerLetter: string,
    letters: string,
    pangrams: string,
    words: string,
}

export const addPuzzleFormAtom = atom<TAddPuzzleFormState>({
    key: 'addPuzzleFormAtom',
    default: {
        date: '',
        centerLetter: '',
        letters: '',
        pangrams: '',
        words: '',
    }
});
