import { useRecoilState, useRecoilValue } from "recoil";
import { centerLetterSelector, inputAtom, lettersSelector, type LetterObj } from "../state";

const useCreateLetterObj = () => {

    const letters = useRecoilValue(lettersSelector);
    const centerLetter = useRecoilValue(centerLetterSelector);

    const createLetterObj = (letter: string): LetterObj => {
        
        // Make sure letter is capitalized before comparing, as letters stored in db are capitalized
        letter = letter.toUpperCase();

        const isCenterLetter = letter === centerLetter;
        const isInLettersList = letters.includes(letter);

        return {
            letter,
            isCenterLetter: isCenterLetter,
            isValid: isCenterLetter || isInLettersList,
        };

    };

    return createLetterObj;
};

export const useUpdateInputState = () => {

    const [inputState, setInputState] = useRecoilState(inputAtom);
    const createLetterObj = useCreateLetterObj();

    const updateInputState = (val: string) => {

        // Create letterObj from character value
        const letterObj = createLetterObj(val);

        // Add new letterObj to inputState array
        const newState = [...inputState, letterObj];

        // Set new state
        setInputState(newState);
    };

    return updateInputState;
};