import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { foundWordsAtom } from '../recoil/atoms/foundWords';
import { inputState } from "../recoil/atoms/input";
import { messageBoxAtom } from '../recoil/atoms/messageBox';
import { prevWordScoreAtom, totalScoreAtom } from '../recoil/atoms/score';
import { inputAsString } from '../recoil/selectors/input';
import { validateInput } from '../utils/validateInput';
import { useWordValidator } from './useWordValidator';

export type SuccessMessage = "Pangram!" | "Good!" | "Nice!" | "Awesome!";

// @TODO :: Refactor
export const useSubmitWord = () => {
    const [inputVal, setInputVal] = useRecoilState(inputState);
    const newWord = useRecoilValue(inputAsString);
    const [foundWordsList, setFoundWordsList] = useRecoilState(foundWordsAtom);
    const setMessageBoxState = useSetRecoilState(messageBoxAtom);
    const validateWord = useWordValidator();
    const setPrevWordScore = useSetRecoilState(prevWordScoreAtom);
    const [totalScore, setTotalScore] = useRecoilState(totalScoreAtom);

    const delay = (ms: number, cb: () => any) => {
        setTimeout(() => {
            cb();
        }, ms);
    };

    const hideMessageBox = () => {
        setMessageBoxState({
            visible: false,
            message: '',
            isError: false,
            isPangram: false
        });
    };

    const showMessageBox = (message: any, isError: boolean, isPangram: boolean) => {
        setMessageBoxState({
            visible: true,
            message,
            isError,
            isPangram,
        });

        delay(1000, hideMessageBox);
    };

    const showErrorMessage = (errorMessage: any) => {
        showMessageBox(errorMessage, true, false);
    };

    const showSuccessMessage = (successMessage: any, isPangram: boolean) => {
        showMessageBox(successMessage, false, isPangram);
    };

    const getSuccessMessage = (wordLength: number, isPangram?: boolean): SuccessMessage => {
        return isPangram ? 'Pangram!' // Pangram
            : wordLength > 6 ? 'Awesome!' // 7+ letter word
            : wordLength > 4 ? 'Nice!' // 5 or 6 letter word
            : 'Good!'; // 4 letter word
    };

    const calculatePrevWordsScore = (newWord: string, isPangram: boolean): number => {
        if (isPangram) {
            return newWord.length + 7;
        }

        if (newWord.length > 4) {
            return newWord.length;
        }

        return 1;
    };

    const submit = () => {
        // Do not attempt to submit input if empty
        if (!inputVal.length) return;

        // Clear input before anything else
        setInputVal([]);

        const inputValidation = validateInput(inputVal);

        if (!inputValidation.isValid) {
            showErrorMessage(inputValidation.errorMessage);
            return;
        }

        const wordValidation = validateWord(newWord);

        if (!wordValidation.isValid) {
            showErrorMessage(wordValidation.errorMessage);
            return;
        }

        // If input is valid and word is valid, we can add the word to foundWordsList
        setFoundWordsList([...foundWordsList, newWord]);

        // Calculate score and update prevWordScore state
        const prevWordScore = calculatePrevWordsScore(newWord, wordValidation.isPangram);
        setPrevWordScore(prevWordScore);

        // Use prevWordScore to update totalScore
        setTotalScore(totalScore + prevWordScore);

        // Generate message
        const successMessage = getSuccessMessage(newWord.length, wordValidation.isPangram);
        showSuccessMessage(successMessage, wordValidation.isPangram);
    };

    return submit;
};