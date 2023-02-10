import { useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { puzzleAtom, foundWordsAtom } from "../state";
import ApiClient from "../api/client";
import GameField from "../components/GameField";
import LoadingAnimation from "../components/loading/LoadingAnimation";
import BigHeading from "../components/BigHeading";
import { Link } from "react-router-dom";

const PuzzlePage = () => {
    const { id } = useParams();

    const [puzzle, setPuzzle] = useRecoilState(puzzleAtom);
    const [loaded, setLoaded] = useState(false);
    const clearFoundWordsList = useResetRecoilState(foundWordsAtom);

    useEffect(() => {
        async function getPuzzleById() {
            const response = await ApiClient.get<any>(`/puzzles/${id}`);
            setPuzzle(response);
            setLoaded(true);
        }

        getPuzzleById();

        return () => {
            // Reset foundWords atom when leaving puzzle page
            clearFoundWordsList();
        };
    }, [id]);

    const formattedDate =new Date(puzzle.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    });

    return (
        <div>
            <div style={{ padding: '24px 82px', borderBottom: '1px solid #bfbfbf' }}>
                <BigHeading>
                    <Link to="/">
                        Be Spelling
                    </Link>
                    <span style={{ fontSize: '24px', fontWeight: 300, fontFamily: 'sans-serif', marginLeft: '16px' }}>
                        {puzzle?.date && formattedDate}
                    </span>
                </BigHeading>
            </div>
            {!loaded ? <LoadingAnimation /> : <GameField />}
        </div>
    );
};

export default PuzzlePage;
