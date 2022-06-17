import { useState } from 'react';
import LoadingPage from './loading/LoadingPage';
import GameField from './GameField';

function SpellingBeeContainer() {
    const [gameStarted, updateGameStarted] = useState(false);

    return !gameStarted ? <LoadingPage updateGameStarted={updateGameStarted} /> : <GameField />;
}

export default SpellingBeeContainer;