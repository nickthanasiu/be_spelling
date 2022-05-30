import { useRecoilValue } from 'recoil';
import { ensureLowerCase, checkEquality } from "../utils/ensureLowerCase";
import { LetterObj } from "../recoil/atoms/input";
import { puzzleState } from '../recoil/atoms/puzzle';

export const useCreateLetterObj = () => {
    console.log('@@@ CALLING useCreateLetterObj');
    const createLetterObj = (letter: string): LetterObj => {
        const centerLetter = 'o';
        const { letters } = useRecoilValue(puzzleState);
    
        const isCenterLetter = checkEquality(letter, centerLetter);
        const isValid = letters.includes(ensureLowerCase(letter));
     
        return {
            letter,
            isCenterLetter,
            isValid: isCenterLetter || isValid
        };
    }

    return createLetterObj;
};