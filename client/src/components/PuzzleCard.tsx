import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Hive from "./controls/Hive";
import { PuzzleResponse } from "../../../server/shared/types";
import React from "react";

interface Props {
    puzzle: PuzzleResponse;
}

const PuzzleCard = ({ puzzle }: Props) => {
    
    const [isHovered, setIsHovered] = useState(false);

    const navigate = useNavigate();

    const { _id, date, centerLetter, letters, pangrams, words, rankings } = puzzle;

    const wordCount = pangrams.length + words.length;
    const genius = rankings.find((ranking: any) => ranking.name === 'Genius'); // Add type for rankings
    const queenBee = rankings.find((ranking: any) => ranking.name === 'Queen Bee');

    const toggleHovered = () => {
        setIsHovered(!isHovered);
    };

    const handlePlayButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate(`/puzzles/${_id}`);
    };

    return (
        <StyledPuzzleCard onMouseEnter={toggleHovered} onMouseLeave={toggleHovered}>
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
            <HoverDisplay isHovered={isHovered}>
                <PlayButton onClick={handlePlayButtonClick}>
                    Play
                </PlayButton>
            </HoverDisplay>
        </StyledPuzzleCard>
    );
};

export default PuzzleCard;

const PlayButton = styled.button`
    background-color: #f7da21;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    width: 150px;
    padding: 15px;
    font-weight: 700;
`;

const HoverDisplay = styled.div<{ isHovered: boolean }>`
    display: ${({ isHovered }) => isHovered ? 'flex' : 'none' };
    position: absolute;
    background-color: rgba(0, 0, 0, .5);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    justify-content: center;
    align-items: center;

    cursor: default;
`

const StyledPuzzleCard = styled.div`
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    cursor: pointer;
    min-width: 200px;
    position: relative;
`;

// Helpers

function formatDate(dateString: string) {

    const date = new Date(dateString);
    const formatted = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return formatted;
}