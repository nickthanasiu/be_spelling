import styled from 'styled-components';
import ProgressBar from './ProgressBar';
import { useRanking } from '../../hooks/useRanking';

// @TODO :: Should this go elsewhere??
export type RankingType = 
    'Beginner' | 'Good Start' | 'Moving Up' | 'Good' | 
    'Solid' | 'Nice' | 'Great' | 'Amazing' | 'Genius' | 'Queen Bee';

function Progress() {
    const ranking = useRanking();

    return (
        <StyledProgress>
            <Ranking>
                {ranking}
            </Ranking>
            <ProgressBar ranking={ranking} />
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