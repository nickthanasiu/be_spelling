import { useRecoilValue, useRecoilState } from "recoil";
import { foundWordsAtom, puzzleAtom } from "../state";
import { type LocalStoragePuzzleState, loadLocalStorageState, saveToLocalStorageState } from "../utils/localStorage";

export const usePersistPuzzleState = (puzzleId: string) => {

    return (
        propertyToUpdate: keyof LocalStoragePuzzleState, 
        updatedState: string[] // @TODO :: Update to allow for extending LocalStoragePuzzleState
    ) => {

        const localStorageState = loadLocalStorageState();

        const puzzleState = localStorageState[puzzleId] || {};

        const nextPuzzleState = {
            ...puzzleState,
            [propertyToUpdate]: updatedState
        };
       
        const nextLocalStorageState = {
            ...localStorageState,
            [puzzleId]: nextPuzzleState
        };

        saveToLocalStorageState(nextLocalStorageState);
    };
};

export const useUpdateFoundWordsState = () => {

    const [foundWordsList, setFoundWordsList] = useRecoilState(foundWordsAtom);
    const { _id: puzzleId } = useRecoilValue(puzzleAtom);
    const persistPuzzleState = usePersistPuzzleState(puzzleId);

    return (wordToAdd: string) => {

        const nextFoundWordsState = [...foundWordsList, wordToAdd];

        setFoundWordsList(nextFoundWordsState);

        persistPuzzleState("words", nextFoundWordsState);
    };
};