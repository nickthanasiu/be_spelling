import { LetterObj, InvalidInputMessage } from "../state/types";

type InputValidation = {
    isValid: boolean;
    errorMessage: InvalidInputMessage | "";
}

export const validateInput = (input: LetterObj[]): InputValidation => {
    const hasEnoughLetters = input.length >= 4;
    const allValidLetters = input.every(letter => letter.isValid);

    return {
        isValid: hasEnoughLetters && allValidLetters,
        errorMessage: !hasEnoughLetters ? "Too short" : !allValidLetters ? "Bad letters" : "",
    };
};