import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { puzzleAtom } from "../state";
import ApiClient from "../api/client";
import GameField from "../components/GameField";
import LoadingAnimation from "./loading/LoadingAnimation";

const PuzzlePage = () => {
    const { id } = useParams();

    const setPuzzleState = useSetRecoilState(puzzleAtom);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function getPuzzleById() {
            const response = await ApiClient.get<any>(`/puzzles/${id}`);
            setPuzzleState(response);
            setLoaded(true);
        }

        getPuzzleById();
    }, [id]);

    return (
        <StyledPuzzlePage>
            {!loaded ? <LoadingAnimation /> : <GameField />}
        </StyledPuzzlePage>
    );
};

export default PuzzlePage;

const StyledPuzzlePage = styled.div`
    display: flex;
    height: 80vh;
`;