import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { inputState } from "../recoil/atoms/input";
import { messageBoxAtom } from '../recoil/atoms/messageBox';
import { inputAsString } from '../recoil/selectors/input';
import { validateInput } from '../utils/validateInput';
import { useWordValidator } from './useWordValidator';


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

        console.log('@@@ GOOD JOB! Add word to found words');
    };

    return submit;
};