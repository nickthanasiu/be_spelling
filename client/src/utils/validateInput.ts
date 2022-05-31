import { LetterObj } from "../recoil/atoms/input";

type InvalidInputMessage = "Too short" | "Bad letters";

interface IValidateInput {
    isValid: boolean;
    error: InvalidInputMessage | "";
}

export const validateInput = (input: LetterObj[]): IValidateInput => {
    const hasEnoughLetters = input.length >= 4;
    const allValidLetters = input.every(letter => letter.isValid);

    return {
        isValid: hasEnoughLetters && allValidLetters,
        error: !hasEnoughLetters ? "Too short" : !allValidLetters ? "Bad letters" : "",
    };
};