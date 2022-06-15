import styled from 'styled-components';
import { useRecoilValueLoadable } from 'recoil';
import ProgressBar from './ProgressBar';
import { puzzleState } from '../../recoil/atoms/puzzle';

function Progress() {
    const loadable = useRecoilValueLoadable(puzzleState);
    const puzzle = loadable.contents?.puzzle;
    const maxScore = puzzle?.maxScore;
    const rankings = puzzle?.rankings;
    const ranking = 'Beginner';

    return (
        <StyledProgress>
            <Ranking>
                {ranking}
            </Ranking>
            <ProgressBar />
        </StyledProgress>
    );
}

export default Progress;

const StyledProgress = styled.div`
    margin: 12px 12px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Ranking = styled.div`
    font-weight: bold;
`;