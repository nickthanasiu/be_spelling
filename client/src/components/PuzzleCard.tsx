import styled from "styled-components";
import Hive from "./controls/Hive";
import { PuzzleResponse } from "../../../server/shared/types";

interface Props {
    puzzle: PuzzleResponse;
}

const PuzzleCard = ({ puzzle }: Props) => {

    const { date, centerLetter, letters, pangrams, words, rankings } = puzzle;

    const wordCount = pangrams.length + words.length;
    const genius = rankings.find((ranking: any) => ranking.name === 'Genius'); // Add type for rankings
    const queenBee = rankings.find((ranking: any) => ranking.name === 'Queen Bee');

    return (
        <StyledPuzzleCard>
            <div style={{ marginBottom: '10px' }}>
                <b>
                    {formatDate(date)}
                </b>
            </div>
            <div>
                <div style={{ width: '100%' }}>
                    <div style={{ pointerEvents: 'none', width: '70%', margin: 'auto' }}>
                        <Hive centerLetter={centerLetter} letters={letters} />
                    </div>
                </div>
                            
                <div style={{ textAlign: 'left', fontSize: '14px', fontWeight: '500' }}>
                    <div>
                        <span>Words: </span>
                        <span>{wordCount}</span>
                    </div>
                    <div>
                        <span>Genius: </span>
                        <span>{genius.threshold}</span>
                    </div>
                    <div>
                        <span>Queen Bee: </span>
                        <span>{queenBee.threshold}</span>
                    </div>
                </div>
            </div>
        </StyledPuzzleCard>
    );
};

export default PuzzleCard;

const StyledPuzzleCard = styled.div`
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    cursor: pointer;
    min-width: 200px;
`;

// Helpers

function formatDate(dateString: string) {

    const date = new Date(dateString);
    const formatted = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return formatted;
}