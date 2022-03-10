import { ensureLowerCase, checkEquality } from "../utils/ensureLowerCase";
import { LetterObj } from "../recoil/atoms/input";
import lettersList from '../data/letters.json';

export const createLetterObj = (letter: string): LetterObj => {
    const { centerLetter, letters } = lettersList;

    const isCenterLetter = checkEquality(letter, centerLetter);
    const isValid = letters.includes(ensureLowerCase(letter));
 
    return {
        letter,
        isCenterLetter,
        isValid: isCenterLetter || isValid
    };
}