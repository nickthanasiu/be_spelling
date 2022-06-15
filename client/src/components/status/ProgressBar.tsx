import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { totalScoreAtom } from '../../recoil/atoms/score';

function ProgressBar() {
    const userScore = useRecoilValue(totalScoreAtom);

    return (
        <StyledProgressBar>
            {userScore}
        </StyledProgressBar>
    );
}

export default ProgressBar;

const StyledProgressBar = styled.div`
    background-color: #f7da21;
    border-radius: 50%;
    padding: 5px;
`;