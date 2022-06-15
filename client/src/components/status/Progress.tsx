import styled from 'styled-components';
import { useRecoilValueLoadable } from 'recoil';
import ProgressBar from './ProgressBar';
import { puzzleState } from '../../recoil/atoms/puzzle';

function Progress() {
    const loadable = useRecoilValueLoadable(puzzleState);
    const puzzle = loadable.contents?.puzzle;
    const maxScore = puzzle?.maxScore;
    const rankings = puzzle?.rankings;

    // @TODO :: Should come from recoil selector. Not hard-coded
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
    padding-right: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Ranking = styled.div`
    min-width: 80px;
    font-weight: bold;
    display: flex;
    align-items: center;
`;