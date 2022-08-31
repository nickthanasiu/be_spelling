import styled from 'styled-components';
import ProgressBar from './ProgressBar';
import { useRanking } from '../../hooks/useRanking';

const Progress = () => {
    const ranking = useRanking();

    return (
        <StyledProgress>
            <Ranking>
                {ranking}
            </Ranking>
            <ProgressBar />
        </StyledProgress>
    );
};

export default Progress;

const StyledProgress = styled.div`
    margin: 24px 12px;
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