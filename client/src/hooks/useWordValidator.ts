import { useRecoilValue } from 'recoil';
import { foundWordsAtom, puzzleAtom, type InvalidWordMessage } from "../state";

interface WordValidator {
    isValid: boolean;
    errorMessage: InvalidWordMessage | "";
    isPangram: boolean;
}

export const useWordValidator = () => {
    const foundWords = useRecoilValue(foundWordsAtom);
    const { centerLetter, pangrams, words } = useRecoilValue(puzzleAtom);

    const wordValidator = (word: string): WordValidator => {
        const isAlreadyFound = foundWords.includes(word);
        const isPangram = pangrams.includes(word);
        const isInWordList = isPangram || words.includes(word);
        const isMissingCenterLetter = !word.includes(centerLetter);
    
        return {
            isValid: !isMissingCenterLetter && !isAlreadyFound && isInWordList,
            errorMessage: isMissingCenterLetter ? "Missing center letter" : isAlreadyFound ? "Already found" : !isInWordList ? "Not in word list" : "",
            isPangram
        };
    };
    
    return wordValidator;
};