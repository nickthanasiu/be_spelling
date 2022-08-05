import { useRecoilValue } from "recoil";
import { foundWordsAtom, puzzleAtom } from "../state";
import { InvalidWordMessage } from "../state/types";

interface WordValidation {
    isValid: boolean;
    errorMessage: InvalidWordMessage | "";
    isPangram: boolean;
}

export const useWordValidator = () => {
    const foundWords = useRecoilValue(foundWordsAtom);
    const puzzle = useRecoilValue(puzzleAtom);
    const pangrams = puzzle.pangrams;
    const words = puzzle.words;
    const centerLetter = puzzle.centerLetter;

    const wordValidator = (word: string): WordValidation => {
        const isAlreadyFound = foundWords.includes(word);
        const isPangram = pangrams.includes(word);
        const isInWordList = isPangram || words.includes(word);
        const hasCenterLetter = word.toLowerCase().includes(centerLetter.toLowerCase());
    
        return {
            isValid: hasCenterLetter && !isAlreadyFound && isInWordList,
            errorMessage: !hasCenterLetter ? "Missing center letter" : isAlreadyFound ? "Already found" : !isInWordList ? "Not in word list" : "",
            isPangram
        };
    };
    
    return wordValidator;
};