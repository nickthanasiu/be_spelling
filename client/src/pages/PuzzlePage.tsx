import { useState, useEffect } from "react";
import { useSetRecoilState, useResetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { puzzleAtom, foundWordsAtom } from "../state";
import ApiClient from "../api/client";
import GameField from "../components/GameField";
import LoadingAnimation from "../components/loading/LoadingAnimation";

const PuzzlePage = () => {
    const { id } = useParams();

    const setPuzzleState = useSetRecoilState(puzzleAtom);
    const [loaded, setLoaded] = useState(false);
    const clearFoundWordsList = useResetRecoilState(foundWordsAtom);

    useEffect(() => {
        async function getPuzzleById() {
            const response = await ApiClient.get<any>(`/puzzles/${id}`);
            setPuzzleState(response);
            setLoaded(true);
        }

        getPuzzleById();

        return () => {
            // Reset foundWords atom when leaving puzzle page
            clearFoundWordsList();
        };
    }, [id]);

    return (
        <div>
            {!loaded ? <LoadingAnimation /> : <GameField />}
        </div>
    );
};

export default PuzzlePage;
