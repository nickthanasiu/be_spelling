import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { type InvalidWordMessage } from "../state";
import { currentPuzzleAtom } from '../state/puzzle';
import { answersById } from '../state/answers';

interface WordValidator {
    isValid: boolean;
    errorMessage: InvalidWordMessage | "";
    isPangram: boolean;
}

export const useWordValidator = () => {
    const { id: puzzleId } = useParams();
    const foundWords = useRecoilValue(answersById(puzzleId as string));
    //const { centerLetter, pangrams, words } = useRecoilValue(currentPuzzleAtom);
    const { centerLetter, pangrams, words } = { centerLetter: 'Z', pangrams: ['Octopus'], words: ['poop', 'pee'] };

    const wordValidator = (word: string): WordValidator => {

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