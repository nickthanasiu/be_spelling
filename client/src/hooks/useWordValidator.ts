import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { foundWordsAtom } from '../recoil/atoms/foundWords';
import { puzzleState } from '../recoil/atoms/puzzle';

export type TInvalidWordMessage = "Not in word list" | "Already found";

interface IWordValidation {
    isValid: boolean;
    errorMessage: TInvalidWordMessage | "";
}

export const useWordValidator = () => {
    const foundWords = useRecoilValue(foundWordsAtom);
    const puzzleLoadable = useRecoilValueLoadable(puzzleState);

    const puzzle = puzzleLoadable.contents.puzzle;
    const pangrams = puzzle.pangrams;
    const words = puzzle.words;

    const wordValidator = (word: string): IWordValidation => {
        const isAlreadyFound = foundWords.includes(word);
        const isInWordList = pangrams.includes(word) || words.includes(word);
    
        return {
            isValid: !isAlreadyFound && isInWordList,
            errorMessage: isAlreadyFound ? "Already found" : !isInWordList ? "Not in word list" : ""
        };
    };
    
    return wordValidator;
};