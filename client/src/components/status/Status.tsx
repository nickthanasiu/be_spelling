import styled from 'styled-components';
import Progress from './Progress';
import WordList from './WordList';

function Status() {
    return (
        <StyledStatus>
            <Progress />
            <WordList />
        </StyledStatus>
    );
}

const StyledStatus = styled.div`
    
`;

export default Status;