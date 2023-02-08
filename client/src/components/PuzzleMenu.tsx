import { useState, useEffect } from "react";
import styled from "styled-components";
import PuzzleCard from "./PuzzleCard";
import { device } from "../styles/device";
import { type PuzzleResponse } from "../../../server/shared/types";
import { PuzzlesApiResponse } from "../state/puzzle";
import ApiClient from '../api/client';
import LoadingAnimation from "./loading/LoadingAnimation";
import LoadMoreButton from "./LoadMoreButton";

type PuzzleApiResponse = {
    puzzles: PuzzleResponse[];
    nextCursor: string;
};

const PuzzleMenu = () => {

    const [puzzleData, setPuzzleData] = useState<PuzzlesApiResponse>();

    useEffect(() => {
        (async function() {
            const response = await ApiClient.get<PuzzlesApiResponse>(`/puzzles`);
            setPuzzleData(response);
        })();
    }, []);
      
    if (!puzzleData) { // @TODO: Replace loading animation with skeleton grid: ;
        return (
            <LoadingAnimation />
        );
    }

    const { puzzles, nextCursor } = puzzleData;

    const loadMorePuzzles = async () => {
        try {
            const response = await ApiClient.get<PuzzlesApiResponse>(`/puzzles?cursor=${nextCursor}`);

            setPuzzleData({
                puzzles: [...puzzleData.puzzles, ...response.puzzles],
                nextCursor: response.nextCursor
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <StyledPuzzleMenu>
                {puzzles.map(puzzle => <PuzzleCard key={puzzle._id} puzzle={puzzle} />)}
            </StyledPuzzleMenu> 
            {nextCursor && <LoadMoreButton onClick={loadMorePuzzles}>Load More</LoadMoreButton>}
        </>
    );
};

export default PuzzleMenu;

const StyledPuzzleMenu = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    row-gap: 25px;
    column-gap: 10px;
    margin-top: 25px;

    @media (min-width: ${device.desktop}) {
        grid-template-columns: repeat(2, 1fr);
    }
`;
