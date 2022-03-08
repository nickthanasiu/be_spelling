import { atom } from 'recoil';

// @TODO :: Rename this???
export interface LetterType {
    character: string;
    isValid: boolean;
    isCenterLetter: boolean;
}

export const inputState = atom({
    key: 'inputState',
    default: [] as LetterType[]
})