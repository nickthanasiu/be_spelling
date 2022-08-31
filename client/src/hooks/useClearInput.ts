import { useSetRecoilState } from "recoil";
import { inputAtom } from "../recoil/atoms/input";

export const useClearInput = () => {
    const setInputState = useSetRecoilState(inputAtom);

    const clearInput = () => {
        setInputState([]);
    };

    return clearInput;
};