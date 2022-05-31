import { atom } from 'recoil';

export const foundWordsAtom = atom<string[]>({
    key: 'foundWordsAtom',
    default: []
});