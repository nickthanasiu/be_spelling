import { useRecoilValue, useRecoilState } from "recoil";
import { puzzleAtom } from "../state";
import { answersById, gamesAtom } from "../state/foundWords";

const useUpdateFoundWordsState = (puzzleId: string) => {

    //const [foundWordsList, setFoundWordsList] = useRecoilState(foundWordsAtom);
    const [games, setGames] = useRecoilState(gamesAtom);
    const [answers, setAnswers] = useRecoilState(answersById(puzzleId));


 
    return (wordToAdd: string) => {

        //const nextFoundWordsState = [...foundWordsList, wordToAdd];

        //setFoundWordsList(nextFoundWordsState);

        setGames({
            ...games,
            [puzzleId]: {
                answers: [...answers]
            }
        });

        //persistPuzzleState("words", nextFoundWordsState);
    };
};

export default useUpdateFoundWordsState;