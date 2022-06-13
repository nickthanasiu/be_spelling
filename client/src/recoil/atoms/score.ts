import { atom } from 'recoil';

export const scoreAtom = atom<number>({
    key: 'scoreAtom',
    default: 0
});

export const prevWordScoreAtom = atom<number>({
    key: 'prevWordScoreAtom',
    default: 1
});