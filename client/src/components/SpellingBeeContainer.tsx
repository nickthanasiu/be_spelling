import styled from 'styled-components';
import Status from './status/Status';
import Controls from './controls/Controls';
import { puzzleState } from '../recoil/atoms/puzzle';
import { useRecoilValueLoadable } from 'recoil';

function SpellingBeeContainer() {
    const { state, contents } = useRecoilValueLoadable(puzzleState);
    const loading = state === 'loading';

    const Loading = () => <>Loading...</>;

    return loading ? <Loading /> : (
        <StyledSpellingBeeContainer>
            <Status />
            <Controls puzzle={contents.puzzle} />
        </StyledSpellingBeeContainer>
    );
}

const StyledSpellingBeeContainer = styled.div`
    flex-grow: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: stretch;
`;

export default SpellingBeeContainer;