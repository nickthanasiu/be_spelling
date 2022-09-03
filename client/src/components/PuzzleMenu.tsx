import styled from "styled-components";
import PuzzleCard from "./PuzzleCard";
import { type PuzzleResponse } from "../../../server/shared/types";

interface Props {
    puzzles: PuzzleResponse[]
}

const PuzzleMenu = ({ puzzles }: Props) => {

    return (
        <StyledPuzzleMenu>
            {puzzles.map((puzzle) => <PuzzleCard puzzle={puzzle} /> )}
        </StyledPuzzleMenu>
    );
};

export default PuzzleMenu;

const StyledPuzzleMenu = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 25px;
    column-gap: 10px;
    margin-top: 25px;
`;
