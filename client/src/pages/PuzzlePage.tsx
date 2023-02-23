import { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { puzzleAtom, foundWordsAtom, rankingSelector } from "../state";
import ApiClient from "../api/client";
import GameField from "../components/GameField";
import LoadingAnimation from "../components/loading/LoadingAnimation";
import BigHeading from "../components/BigHeading";
import { Link } from "react-router-dom";

const PuzzlePage = () => {
    const { id } = useParams();

    const [puzzle, setPuzzle] = useRecoilState(puzzleAtom);
    const [loaded, setLoaded] = useState(false);
    const ranking = useRecoilValue(rankingSelector);
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

    const formattedDate = new Date(puzzle.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    });



    const [displayModal, hideModal] = useDisplayGeniusModal();
    const [displayQueenBee, hideQueenBee] = useDisplayQueenBeeModal();

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
            {displayModal && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '600px', minHeight: '600px', backgroundColor: 'orange', zIndex: 1000000 }}>
                    <h1>GENIUS!!!!</h1>
                    <button type="button" onClick={hideModal}>Hide Modal</button>
                </div>
            )}

            {displayQueenBee && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '600px', minHeight: '600px', backgroundColor: 'orange', zIndex: 1000000 }}>
                    <h1>Queen Bee</h1>
                    <button type="button" onClick={hideQueenBee}>Hide Modal</button>
                </div>
            )}
        </div>
    );
};

export default PuzzlePage;

function useDisplayGeniusModal() {
    const [displayModal, setDisplayModal] = useState(false);
    const ranking = useRecoilValue(rankingSelector);
    const mostRecentRanking = useRef(ranking);


    useEffect(() => {
        console.log('mostRecent ', mostRecentRanking.current);
        console.log('ranking ', ranking);
        console.log(mostRecentRanking.current === ranking);
        if (mostRecentRanking.current !== ranking && ranking === "Genius") {
            setDisplayModal(true);
        }
        
        mostRecentRanking.current = ranking;
    }, [ranking]);

    const hideModal = () => {
        setDisplayModal(false);
    };

    return [displayModal, hideModal] as const;
}

function useDisplayQueenBeeModal() {
    const [displayQueenBee, setDisplayQueenBee] = useState(false);
    const ranking = useRecoilValue(rankingSelector);
    const mostRecentRanking = useRef(ranking);

    useEffect(() => {
        if (mostRecentRanking.current !== ranking && ranking === "Queen Bee") {
            setDisplayQueenBee(true);
        }

        mostRecentRanking.current = ranking;
    }, [ranking]);

    const hideQueenBee = () => {
        setDisplayQueenBee(false);
    };

    return [displayQueenBee, hideQueenBee] as const;
}