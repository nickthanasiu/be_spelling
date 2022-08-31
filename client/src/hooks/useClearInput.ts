import { useSetRecoilState } from "recoil";
import { inputAtom } from "../state";

export const useClearInput = () => {
    const setInputState = useSetRecoilState(inputAtom);

    const clearInput = () => {
        setInputState([]);
    };

    return clearInput;
};