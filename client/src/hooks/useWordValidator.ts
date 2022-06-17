import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { foundWordsAtom } from '../recoil/atoms/foundWords';
import { puzzleAtom } from '../recoil/atoms/puzzle';
import { InvalidWordMessage } from '../recoil/atoms/messageBox';

interface IWordValidation {
    isValid: boolean;
    errorMessage: InvalidWordMessage | "";
    isPangram: boolean;
}

export const useWordValidator = () => {
    const foundWords = useRecoilValue(foundWordsAtom);
    const puzzleLoadable = useRecoilValueLoadable(puzzleAtom);

    const puzzle = puzzleLoadable.contents.puzzle;
    const pangrams = puzzle.pangrams;
    const words = puzzle.words;
    const centerLetter = puzzle.centerLetter;

    const wordValidator = (word: string): IWordValidation => {
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