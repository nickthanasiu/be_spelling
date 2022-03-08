import { ensureUpperCase } from "../utils/ensureUpperCase";
import { LetterType } from "../recoil/atoms/input";
import lettersList from '../data/letters.json';

export const useLetterValidation = (character: string): LetterType => {
    const { centerLetter, letters } = lettersList;

    const isCenterLetter = ensureUpperCase(character) === centerLetter;
    const isValid = letters.includes(ensureUpperCase(character));
 
    return {
        character,
        isCenterLetter,
        isValid: isCenterLetter || isValid
    };
}