import { useRecoilState } from 'recoil';
import { inputState } from "../recoil/atoms/input";

export const useBackspace = () => {
    const [inputVal, setInputVal] = useRecoilState(inputState);

    function backspace() {
        setInputVal([...inputVal.slice(0, -1)]);
    }

    return backspace;
};