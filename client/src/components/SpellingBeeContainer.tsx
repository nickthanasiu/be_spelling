import { useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { puzzleState } from '../recoil/atoms/puzzle';
import LoadingPage from './loading/LoadingPage';
import GameField from './GameField';

function SpellingBeeContainer() {
    const [doneLoading, updateDoneLoading] = useState(false);

    const loadable = useRecoilValueLoadable(puzzleState);
    const { state, contents } = loadable;
    const loading = state === 'loading';

    return !doneLoading ? <LoadingPage loading={loading} updateDoneLoading={updateDoneLoading} /> : <GameField puzzle={contents.puzzle} />;
}

export default SpellingBeeContainer;