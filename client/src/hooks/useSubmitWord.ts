import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { inputState } from "../recoil/atoms/input";
import { messageBoxAtom } from '../recoil/atoms/messageBox';
import { inputAsString } from '../recoil/selectors/input';
import { validateInput } from '../utils/validateInput';
import { useWordValidator } from './useWordValidator';

export type SuccessMessage = "Pangram!" | "Good!" | "Nice!" | "Awesome!";


export const useSubmitWord = () => {
    console.log('@@@ useSubmitWord');
    const [inputVal, setInputVal] = useRecoilState(inputState);
    const inputValAsString = useRecoilValue(inputAsString);
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
        const inputValidation = validateInput(inputVal);

        if (!inputValidation.isValid) {
            showErrorMessage(inputValidation.errorMessage);
            return;
        }

        const wordValidation = validateWord(inputValAsString);

        if (!wordValidation.isValid) {
            showErrorMessage(wordValidation.errorMessage);
            return;
        }

        // If input is valid and word is valid, we can add the word to foundWordsList
        

        // Generate message
        const successMessage = getSuccessMessage(inputValAsString.length, wordValidation.isPangram);
        showSuccessMessage(successMessage);

        // Calculate store
    };

    return submit;
};