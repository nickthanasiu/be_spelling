import { useState } from 'react';
import styled from 'styled-components';
import WordListHeading from './WordListHeading';
import WordListDrawer from './WordListDrawer';

function WordList() {
    const [expanded, setExpanded] = useState(false);

    return (
        <StyledWordList>
            <WordListHeading expanded={expanded} setExpanded={setExpanded} />
            <WordListDrawer expanded={expanded} />
        </StyledWordList>
    );
}

const StyledWordList = styled.div`
    border-radius: 6px;
    border: 1px solid #dcdcdc;
    overflow: hidden;
    margin: 12px;

    li {
        max-width: 200px;
        padding-right: 7px;
        text-transform: capitalize;
    }
`;

export default WordList;