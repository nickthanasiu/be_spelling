import { useRecoilState, useSetRecoilState } from 'recoil';
import { inputState } from "../recoil/atoms/input";
import { messageBoxAtom } from '../recoil/atoms/messageBox';
import { validateInput } from '../utils/validateInput';

export const useSubmitWord = () => {
    const [inputVal, setInputVal] = useRecoilState(inputState);
    const showMessageBox = useSetRecoilState(messageBoxAtom);

    function submit() {
        const { isValid, error } = validateInput(inputVal);

        if (!isValid) {
            showMessageBox({
                visible: true,
                message: error,
                isError: true
            });
            return;
        }

        console.log('@@@ CHECK IF WORD VALID');
    }

    return submit;
};