import { useRecoilState, useSetRecoilState } from 'recoil';
import { inputState } from "../recoil/atoms/input";
import { messageBoxAtom } from '../recoil/atoms/messageBox';
import { validateInput } from '../utils/validateInput';

export const useSubmitWord = () => {
    const [inputVal, setInputVal] = useRecoilState(inputState);
    const setMessageBoxState = useSetRecoilState(messageBoxAtom);

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
        const { isValid, errorMessage } = validateInput(inputVal);

        if (!isValid) {
            showErrorMessage(errorMessage);
            delay(1000, hideMessageBox);
            return;
        }

        console.log('@@@ CHECK IF WORD VALID');
    };

    return submit;
};