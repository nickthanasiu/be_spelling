import styled, { css } from 'styled-components';

interface IWordListHeadingProps {
    expanded: boolean;
    wordList: string[];
}

function WordListHeading({ expanded, wordList }: IWordListHeadingProps) {
    const wordCount = wordList.length;
    const placeholder = <li style={{ color: 'gray' }}>Your words...</li>;
    const wordlistPreview = !wordCount ? placeholder : wordList.map(word => <li>{word}</li>);

    return (
        <StyledWordListHeading>
            <div className="wordlist-heading-container">
                <WordCount expanded={expanded}>
                    You have found {wordCount} word{wordCount !== 1 ? 's' : ''}
                </WordCount>
                <PreviewWrapper expanded={expanded}>
                    <ul>
                        {wordlistPreview}
                    </ul>
                </PreviewWrapper>
                <Toggle>
                    <span className="toggle-icon"></span>
                </Toggle>
            </div>
        </StyledWordListHeading>
    );
}

const StyledWordListHeading = styled.div`
    position: relative;
    overflow: hidden;
    height: 45px;
    line-height: 45px;
`;

interface IExpandedProps {
    expanded: boolean;
}

const WordCount = styled.div<IExpandedProps>`
    display: flex;
    align-items: center;
    height: 45px;
    padding: 0 20px;
    position: relative;
    transition: all 270ms ease;

    top: -45px;
    opacity: 0;
    
    ${({ expanded }) => expanded && css`
        top: 0;
        opacity: 1;
    `}
`;

const PreviewWrapper = styled.div<IExpandedProps>`
    padding: 0 20px;
    position: relative;
    transition: all 270ms ease;
    
    top: -60px;

    ${({ expanded }) => expanded && css`
        top: 0;
        opacity: 0;
    `}

    & > ul {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        list-style: none;
        padding: 0;
        display: flex;
    }
`;

const Toggle = styled.div`
    width: 45px;
    height: 45px;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    box-shadow: 0px 0px 20px 5px #fff;

    .toggle-icon {
        display: block;
        position: relative;
        width: 18px;
        height: 18px;
        background: url(https://www.nytimes.com/games-assets/v2/assets/back.svg) center no-repeat;
        background-size: 50%;
        transform: rotate(270deg);
    }
`;

export default WordListHeading;