import { useRecoilValueLoadable } from 'recoil';
import { LetterObj } from "../recoil/atoms/input";
import { puzzleState } from '../recoil/atoms/puzzle';

export const useCreateLetterObj = () => {
    const { contents } = useRecoilValueLoadable(puzzleState);
    const { letters, centerLetter } = contents.puzzle;

    const createLetterObj = (letter: string): LetterObj => {    
        const isCenterLetter = letter === centerLetter;
        const isValid = letters.includes(letter);
     
        return {
            letter,
            isCenterLetter,
            isValid: isCenterLetter || isValid
        };
    }

    return createLetterObj;
};