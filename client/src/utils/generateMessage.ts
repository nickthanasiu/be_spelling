import { useRecoilValue } from 'recoil';
import { inputState } from '../recoil/atoms/input';

export function generateMessage() {

   // @TODO :: add missing center letter message
    // Is input invalid?
    const getErrorMessage = () => {};
    let isInputInvalid = true;

    // is word invalid?

    // Ok good, let's get valid word message
    const getSuccessMessage = (wordLength: number, isPangram?: boolean): SuccessMessage => {
        return isPangram ? 'Pangram!' // Pangram
            : wordLength > 6 ? 'Awesome!' // 7+ letter word
            : wordLength > 4 ? 'Nice!' // 5 or 6 letter word
            : 'Good!'; // 4 letter word
    };
    //return isInputInvalid ? getErrorMessage() : isWordInValid ? getInvalidWordMessage() : getSuccessMessage();
}

type InvalidInputMessage = "Too short" | "Bad letters";
type InvalidWordMessage = "Not in word list" | "Already found";
export type ErrorMessage = InvalidInputMessage | InvalidWordMessage;
export type SuccessMessage = "Pangram!" | "Good!" | "Nice!" | "Awesome!";

const appendScore = (message: string, score: number) => `${message} +${score}!`;

/*
export function getMessage(word: string, score?: number): InvalidInputMessage | InvalidWordMessage | ValidWordMessage {
    
    const validWordMessage = (wordLength: number, isPangram?: boolean): ValidWordMessage => {
        return isPangram ? 'Pangram!' // Pangram
            : wordLength > 6 ? 'Awesome!' // 7+ letter word
            : wordLength > 4 ? 'Nice!' // 5 or 6 letter word
            : 'Good!'; // 4 letter word
    };

    return validWordMessage(word.length);
}*/

function useValidateInput(input: string) {
    const inputVal = useRecoilValue(inputState);
    const hasEnoughLetters = input.length >= 4;
    const allValidLetters = inputVal.every(letter => letter.isValid);

    return {
        isInputValid: hasEnoughLetters && allValidLetters,
    };
}
/**
 * 
 * POSSIBLE OUTCOMES
 * 
 * 1) Input invalid: !isInputValid
 *  -Show message
 *  -
 * 
 * 2) Word invalid: !isWordValid
 *  -Show message
 * 
 * 3) Word valid: isPangram, isWord
 *   -Show message
 *   -Update word list
 *      SELECTOR :: Total words found
 *   -Update score
 *      SELECTOR :: Update ranking based on score
 * 
 *  useWordValidator()
 *      useInputValidator()
 *          useErrorMessageGenerator()
 * 
 *      useMessageGenerator()
 *          useScoreGenerator()
 */ 

// If input valid: check if word/pangram, ELSE: generate message, show error message
        // If pangram: success(), ELSE: check if word
        // If word: success(), ELSE: generate message, show message
        // success(): generate message, generate score, show message, add score to total, add word to found words list