import { atom } from 'recoil';

export interface LetterObj {
    letter: string;
    isValid: boolean;
    isCenterLetter: boolean;
}

export const inputState = atom<LetterObj[]>({
    key: 'inputState',
    default: [] 
});