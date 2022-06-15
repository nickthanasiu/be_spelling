import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { scoreAtom } from '../../recoil/atoms/score';

function ProgressBar() {
    const userScore = useRecoilValue(scoreAtom);

    return (
        <StyledProgressBar>
            {userScore}
        </StyledProgressBar>
    );
}

export default ProgressBar;

const StyledProgressBar = styled.div`
    border: 1px solid black;
`;