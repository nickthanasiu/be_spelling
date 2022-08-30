import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import ApiClient from "../api/client";
import { puzzleAtom } from "../recoil/atoms/puzzle";
import GameField from "../components/GameField";
import type { PuzzleResponse } from "../../../shared/types";

const PuzzlePage = () => {
    const { id } = useParams();

    const setPuzzleState = useSetRecoilState(puzzleAtom);

    useEffect(() => {
        async function getPuzzleById() {
            const response = await ApiClient.get<{ puzzle: PuzzleResponse }>(`/puzzles/${id}`);
            setPuzzleState(response.puzzle);
        }

        getPuzzleById();
    }, [id]);

    return (
        <GameField />
    );
};

export default PuzzlePage;