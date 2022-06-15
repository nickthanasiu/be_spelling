import { atom } from 'recoil';

export const totalScoreAtom = atom<number>({
    key: 'totalScoreAtom',
    default: 0
});

export const prevWordScoreAtom = atom<number>({
    key: 'prevWordScoreAtom',
    default: 1
});