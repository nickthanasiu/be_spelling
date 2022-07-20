import { atom } from 'recoil';

export type AddPuzzleFormState = {
    date: string,
    centerLetter: string,
    letters: string,
    pangrams: string,
    words: string,
}

export const addPuzzleFormAtom = atom<AddPuzzleFormState>({
    key: 'addPuzzleFormAtom',
    default: {
        date: '',
        centerLetter: '',
        letters: '',
        pangrams: '',
        words: '',
    }
});
