import styled from "styled-components";
import { PuzzleResponse } from "../../../server/shared/types";

interface Props {
    puzzles: PuzzleResponse[]
}

const PuzzleMenu = ({ puzzles }: Props) => {

    return (
        <StyledPuzzleMenu>
            {puzzles.map((puzzle) => (
                <PuzzleCard style={{ border: '1px solid black' }}>
                    <div>
                        <b>
                            {formatDate(puzzle.date)}
                        </b>
                    </div>
                </PuzzleCard>
            ))}
        </StyledPuzzleMenu>
    );
};

export default PuzzleMenu;

const StyledPuzzleMenu = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 25px;
    column-gap: 10px;
`;

const PuzzleCard = styled.div`
    padding: 10px;  
`;


// Helpers

function formatDate(dateString: string) {

    const date = new Date(dateString);
    const formatted = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return formatted;
}