import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { TPuzzleResponseObj } from "../../../shared/types";
import ApiClient from "../api/client";
import { puzzleAtom__NEW } from "../recoil/atoms/puzzle";
import GameField from "../components/GameField";

const PuzzlePage = () => {
    const { id } = useParams();

    const setPuzzleState = useSetRecoilState(puzzleAtom__NEW);

    useEffect(() => {
        async function getPuzzleById() {
            const response = await ApiClient.get<{ puzzle: TPuzzleResponseObj }>(`/puzzles/${id}`);
            setPuzzleState(response.puzzle);
        }

        getPuzzleById();
    }, [id]);

    return (
        <GameField />
    );
};

export default PuzzlePage;