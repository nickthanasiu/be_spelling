import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { puzzleAtom, PuzzleState } from "../state";
import ApiClient from "../api/client";
import GameField from "../components/GameField";
import LoadingAnimation from "../components/loading/LoadingAnimation";
import BigHeading from "../components/BigHeading";
import { Link } from "react-router-dom";

interface Props {
    id: string;
}

const PuzzlePage = ({ id }: Props) => {

    const [puzzle, setPuzzle] = useState<PuzzleState>();
    
    useEffect(() => {
        async function getPuzzleById() {
            const response = await ApiClient.get<any>(`/puzzles/${id}`);
            setPuzzle(response);
        }

        getPuzzleById();
    }, [id]);

    
    const formattedDate = !puzzle?.date ? '' : new Date(puzzle.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    });

    return (
        <StyledPuzzlePage>
            <header>
                <BigHeading>
                    <Link to="/">
                        Be Spelling
                    </Link>
                    <span className="date">
                        {puzzle?.date && formattedDate}
                    </span>
                </BigHeading>
            </header>
            {!puzzle ? <LoadingAnimation /> : <GameField puzzle={puzzle} />}
        </StyledPuzzlePage>
    );
};

export default () => {
    const { id } = useParams();

    if (!id) return <></>;

    console.log('ID ', id);

    return <PuzzlePage id={id} />;
};

const StyledPuzzlePage = styled.div`

    header {
        padding: 24px 82px;
        border-bottom: 1px solid #bfbfbf;
    }

    .date {
        font-size: 24px;
        font-weight: 300;
        font-family: sans-serif;
        margin-left: 16px;
    }

`;
