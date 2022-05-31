import { useSetRecoilState } from "recoil";
import { inputState } from "../recoil/atoms/input";

export const useClearInput = () => {
    const setInputVal = useSetRecoilState(inputState);

    const clearInput = () => {
        setInputVal([]);
    };

    return clearInput;
};