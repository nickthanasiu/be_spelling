import { useRecoilValue } from 'recoil';
import { lettersAtom, centerLetterSelector, type LetterObj } from '../state';

export const useCreateLetterObj = () => {
    const letters = useRecoilValue(lettersAtom);
    const centerLetter = useRecoilValue(centerLetterSelector);

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