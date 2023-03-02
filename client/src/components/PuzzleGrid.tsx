import styled from "styled-components";
import usePuzzleQuery, { QueryParams } from "../hooks/usePuzzleQuery";
import { device } from "../styles/device";
import LoadingAnimation from "./loading/LoadingAnimation";
import PuzzleCard from "./PuzzleCard";
import LoadMoreButton from "./LoadMoreButton";

interface Props {
    filterParams: QueryParams; 
};

const PuzzleGrid = ({ filterParams }: Props) => {

    const { isLoading, isError, data, loadMore } = usePuzzleQuery(filterParams);

    if (!data || isLoading) { // @TODO: Replace loading animation with skeleton grid: ;
        return (
            <LoadingAnimation />
        );
    }

    if (isError) {
        return (
            <p>There was a problem loading puzzles. Please refresh page to try again</p>
        );
    }


    const { puzzles, nextCursor } = data;

    return (
        <Container>
            <Grid>
                {puzzles.map(puzzle => <PuzzleCard key={puzzle._id} puzzle={puzzle} />)}
            </Grid>

            {nextCursor && (
                <ButtonWrapper>
                    <LoadMoreButton onClick={loadMore}>Load More</LoadMoreButton>
                </ButtonWrapper>
            )}
        </Container>
    );
};

export default PuzzleGrid;

const Container = styled.div`
    width: 100%;
`;

const Grid = styled.div`
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

const ButtonWrapper = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: center;
`;

export type ValueOf<T> = T[keyof T];
