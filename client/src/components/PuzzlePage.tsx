import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { puzzleAtom } from "../state";
import ApiClient from "../api/client";
import GameField from "../components/GameField";
import LoadingAnimation from "./loading/LoadingAnimation";

const PuzzlePage = () => {
    const { id } = useParams();

    const [puzzleState, setPuzzleState] = useRecoilState(puzzleAtom);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function getPuzzleById() {
            const response = await ApiClient.get<any>(`/puzzles/${id}`);
            setPuzzleState(response);
            setLoaded(true);
        }

        getPuzzleById();
    }, [id]);

    return !loaded ? <LoadingAnimation /> : <GameField />;
};

export default PuzzlePage;