import { useState } from "react";
import { loadLocalStorageState } from "../utils/localStorage";
import PuzzleMenu from "./PuzzleMenu";
import InProgressMenu from "./InProgressMenu";
import { Button } from "./Button";

import { type PuzzleResponse } from "../../../server/shared/types";

interface Props {
    puzzles: PuzzleResponse[];
}

const PuzzleMenuContainer = ({ puzzles }: Props) => {
    
    const [showNewPuzzles, setShowNewPuzzles] = useState(false);

    const { clientHasPuzzlesInProgress, inProgressPuzzleIds } = checkForInProgressPuzzles();

    if (!clientHasPuzzlesInProgress) {
        return (
            <PuzzleMenu puzzles={puzzles} />
        );
    }


    const inProgressPuzzles = puzzles.filter((puzzle) => {

        return inProgressPuzzleIds.includes(puzzle._id);
    });

    const untouchedPuzzles = puzzles.filter((puzzle) => {
        return !inProgressPuzzleIds.includes(puzzle._id);
    });

    const tryNewButton = (
        <Button onClick={() => setShowNewPuzzles(true)}>
            Try a new puzzle
        </Button>
    );

    const newMenuContainer = (
        <>
            <h2 style={{ color: '#f7da21' }}>Pick a new puzzle</h2>
            <PuzzleMenu puzzles={untouchedPuzzles} />
        </>
    );

    return (
        <>
            <InProgressMenu puzzles={inProgressPuzzles} />

            <div style={{ width: '100%', marginTop: '50px' }}>
                {!showNewPuzzles ? tryNewButton : newMenuContainer}
            </div>
            
        </>
    );
};

export default PuzzleMenuContainer;


// Helpers

function checkForInProgressPuzzles() {

    const localStorageState = loadLocalStorageState();
    const inProgressPuzzleIds = Object.keys(localStorageState);

    return {
        clientHasPuzzlesInProgress: inProgressPuzzleIds.length > 0,
        inProgressPuzzleIds,
    }
}