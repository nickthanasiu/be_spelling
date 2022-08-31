import { useRecoilState } from 'recoil';
import { inputAtom } from "../state";

export const useBackspace = () => {
    const [inputState, setInputState] = useRecoilState(inputAtom);

    function backspace() {
        setInputState([...inputState.slice(0, -1)]);
    }

    return backspace;
};