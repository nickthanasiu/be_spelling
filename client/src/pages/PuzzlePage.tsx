import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState,  } from "recoil";
import ApiClient from "../api/client";
import { puzzleAtom } from "../recoil/atoms/puzzle";
import GameField from "../components/GameField";
import LoadingAnimation from "../components/loading/LoadingAnimation";

const PuzzlePage = () => {
    const { id } = useParams();

    const [puzzleState, setPuzzleState] = useRecoilState(puzzleAtom);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function getPuzzleById() {
            const response = await ApiClient.get<any>(`/puzzles/${id}`);
            setPuzzleState(response.puzzle);
            setLoaded(true);
        }

        getPuzzleById();
    }, [id]);

    return !loaded ? <LoadingAnimation /> : <GameField />;
};

export default PuzzlePage;