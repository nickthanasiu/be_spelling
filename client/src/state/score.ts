import { atom } from 'recoil';

export const totalScoreAtom = atom({
    key: 'totalScoreAtom',
    default: 0
});

export const prevWordScoreAtom = atom({
    key: 'prevWordScoreAtom',
    default: 1
});