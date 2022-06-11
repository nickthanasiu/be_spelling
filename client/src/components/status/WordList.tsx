import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { foundWordsAtom } from '../../recoil/atoms/foundWords';

function WordList() {
    const [expanded, toggleExpanded] = useState(false);

    const wordList = useRecoilValue(foundWordsAtom);
    const wordCount = wordList.length;
    const foundsWordsListPreview = wordCount > 0 ? wordList : ['Your words...'];

    return (
        <StyledWordList onClick={() => toggleExpanded(!expanded)}>
            <WordListHeading>
                <div className="found-words-list__word-count">
                    You have found {wordCount} word{wordCount !== 1 ? 's' : ''}
                </div>
                <FoundWordsPreview>
                    <FoundsWordPreviewList>
                        {foundsWordsListPreview.map(word => <li>{word}</li>)}
                    </FoundsWordPreviewList>
                </FoundWordsPreview>
            </WordListHeading>

            <WordListDrawer className="wordlist-drawer" expanded={expanded}>
                <div className="wordlist-window">
                    <div className="wordlist-pag">
                        <ul className="wordlist-items-pag">
                            {wordList.map(word => <li>{word}</li>)}
                        </ul>
                    </div>
                </div>
            </WordListDrawer>

        </StyledWordList>
    );
}

const StyledWordList = styled.div`
    border-radius: 6px;
    border: 1px solid #dcdcdc;
    overflow: hidden;
    margin: 12px;
    padding: 0 20px;
`;

const WordListHeading = styled.div`
    position: relative;
    overflow: hidden;
    height: 45px;
    line-height: 45px;
`;

const FoundWordsPreview = styled.div`
    
    position: relative;
    transition: all 270ms ease;
`;

const FoundsWordPreviewList = styled.ul`
    margin: 0;
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    list-style: none;

    display: flex;



    & > li {
        max-width: 200px;
        padding-right: 7px;
        text-transform: capitalize;

        /*
        -webkit-animation: squishin 700ms ease;
        animation: squishin 700ms ease;
        */
    }
`;

const WordListDrawer = styled.div<{ expanded: boolean }>`
    overflow: hidden;
    max-height: ${props => props.expanded ? 'calc(var(--vh, 1vh) * 68)' : '0'};
    transition: max-height 200ms ease;
}


    & > .wordlist-window {
        position: relative;
        overflow: hidden;
        height: calc(var(--vh, 1vh) * 64);
    }

    & .wordlist-pag {
        position: relative;
        margin-left: 20px;
        display: flex;
        height: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        z-index: 0;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        scroll-margin: 0;
        scroll-behavior: smooth;
        overscroll-behavior: contain;
    }

    & .wordlist-items-pag {
        width: 100%;
        display: flex;
        flex-flow: column wrap;
        align-content: flex-start;
        height: calc(100% - 38px);
        padding: 20px 0 24px;
    }
`;

const WordListWindow = styled.div``;

export default WordList;