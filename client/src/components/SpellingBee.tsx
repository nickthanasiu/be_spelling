import styled from 'styled-components';
import Status from './status/Status';
import Controls from './controls/Controls';

function SpellingBeeWrapper() {
    return (
        <StyledSpellingBeeWrapper>
            <Status />
            <Controls />
        </StyledSpellingBeeWrapper>
    );
}

const StyledSpellingBeeWrapper = styled.div`
    flex-grow: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: stretch;
`;

export default SpellingBeeWrapper;