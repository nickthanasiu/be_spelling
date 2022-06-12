import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { foundWordsAtom } from '../recoil/atoms/foundWords';
import { inputState } from "../recoil/atoms/input";
import { messageBoxAtom } from '../recoil/atoms/messageBox';
import { inputAsString } from '../recoil/selectors/input';
import { validateInput } from '../utils/validateInput';
import { useWordValidator } from './useWordValidator';

export type SuccessMessage = "Pangram!" | "Good!" | "Nice!" | "Awesome!";


export const useSubmitWord = () => {
    const inputVal = useRecoilValue(inputState);
    const newWord = useRecoilValue(inputAsString);
    const [foundWordsList, setFoundWordsList] = useRecoilState(foundWordsAtom);
    const setMessageBoxState = useSetRecoilState(messageBoxAtom);
    const validateWord = useWordValidator();

    const delay = (ms: number, cb: () => any) => {
        setTimeout(() => {
            cb();
        }, ms);
    };

    const hideMessageBox = () => {
        setMessageBoxState({
            visible: false,
            message: ''
        });
    };

    const showMessageBox = (message: any) => {
        setMessageBoxState({
            visible: true,
            message
        });

        delay(1000, hideMessageBox);
    };

    const showErrorMessage = (errorMessage: any) => {
        showMessageBox(errorMessage);
    };

    const showSuccessMessage = (successMessage: any) => {
        showMessageBox(successMessage);
    };

    const getSuccessMessage = (wordLength: number, isPangram?: boolean): SuccessMessage => {
        return isPangram ? 'Pangram!' // Pangram
            : wordLength > 6 ? 'Awesome!' // 7+ letter word
            : wordLength > 4 ? 'Nice!' // 5 or 6 letter word
            : 'Good!'; // 4 letter word
    };

    const submit = () => {
        // Do not attempt to submit input if empty
        if (!inputVal.length) return;

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

        // Generate message
        const successMessage = getSuccessMessage(newWord.length, wordValidation.isPangram);
        showSuccessMessage(successMessage);

        // Calculate score
    };

    return submit;
};