import { atom, selector } from 'recoil';

export const foundWordsAtom = atom<string[]>({
    key: 'foundWordsAtom',
    default: []
});

export const wordListPreviewSelector = selector({
    key: 'wordListPreviewSelector',
    get: ({ get }) => {
        const foundWords = get(foundWordsAtom);
        
        return [...foundWords].reverse();
    }
});

export const alphabetizedWordSelector = selector({
    key: 'alphabetizedWordSelector',
    get: ({ get }) => {
        const foundWords = get(foundWordsAtom);

        return [...foundWords].sort((a, b) => a.localeCompare(b));
    }
});