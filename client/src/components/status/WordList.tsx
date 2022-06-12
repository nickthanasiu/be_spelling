import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { foundWordsAtom } from '../../recoil/atoms/foundWords';
import WordListHeading from './WordListHeading';
import WordListDrawer from './WordListDrawer';

function WordList() {
    const [expanded, toggleExpanded] = useState(false);
    const wordList = useRecoilValue(foundWordsAtom);

    return (
        <StyledWordList onClick={() => toggleExpanded(!expanded)}>
            <WordListHeading expanded={expanded} wordList={wordList} />
            <WordListDrawer expanded={expanded} wordList={wordList} />
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