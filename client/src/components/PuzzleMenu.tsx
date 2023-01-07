import { useState, useEffect } from "react";
import styled from "styled-components";
import PuzzleCard from "./PuzzleCard";
import { device } from "../styles/device";
import { type PuzzleResponse } from "../../../server/shared/types";
import { Button } from "./Button";
import ApiClient from '../api/client';
import LoadingAnimation from "./loading/LoadingAnimation";


type PuzzleApiResponse = {
    puzzles: PuzzleResponse[];
    nextCursor: string;
};

const PuzzleMenu = (props: any) => {

    const [puzzles, setPuzzles] = useState<PuzzleResponse[]>([]);
    const [nextCursor, setNextCursor] = useState('');

    const [loadingMore, setLoadingMore] = useState(false    );

    useEffect(() => {
        async function fetchInitialPuzzles() {
            const response = await ApiClient.get<{ puzzles: PuzzleResponse[], nextCursor: string}>('/puzzles');
            setPuzzles(response.puzzles);
            setNextCursor(response.nextCursor);
        }

        fetchInitialPuzzles();
    }, []);


    const loadMorePuzzles = async () => {
        setLoadingMore(true);

        const response = await ApiClient.get<PuzzleApiResponse>(`/puzzles?cursor=${nextCursor}`);
       
        setPuzzles(prevPuzzles => [
            ...prevPuzzles,
            ...response.puzzles
        ]);

        setNextCursor(response.nextCursor);

        setLoadingMore(false);
    };
    



    if (!puzzles.length) { // @TODO: Replace loading animation with skeleton grid
        return (
            <LoadingAnimation />
        );
    }

    const SeeMore = () => loadingMore ? <LoadingAnimation /> : (
        <div style={{ marginTop: '40px' }}>
            <Button onClick={loadMorePuzzles}>
                See More
            </Button>
        </div>
    );

    return (
        <>
            <StyledPuzzleMenu>
                {puzzles.map(puzzle => <PuzzleCard key={puzzle._id} puzzle={puzzle} />)}
            </StyledPuzzleMenu> 
            {nextCursor && <SeeMore />}
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

