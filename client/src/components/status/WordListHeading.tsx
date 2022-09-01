import { Dispatch, SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { wordListPreviewSelector } from '../../state';
import { device } from '../../styles/device';

interface IWordListHeadingProps {
    expanded: boolean;
    setExpanded: Dispatch<SetStateAction<boolean>>
}

function WordListHeading({ expanded, setExpanded }: IWordListHeadingProps) {
    const placeholder = <li style={{ color: 'gray' }}>Your words...</li>;
    const wordListPreview = useRecoilValue(wordListPreviewSelector);
    const wordCount = wordListPreview.length;
    const previewContent = !wordCount ? placeholder : wordListPreview.map(word => <li>{word}</li>);

    return (
        <StyledWordListHeading onClick={() => setExpanded(!expanded)}>
            <div className="wordlist-heading-container">
                <WordCount expanded={expanded}>
                    You have found {wordCount} word{wordCount !== 1 ? 's' : ''}
                </WordCount>
                <PreviewWrapper expanded={expanded}>
                    <ul>
                        {previewContent}
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

    @media (min-width: ${device.desktop}) {
        pointer-events: none;
    }
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

    @media (min-width: ${device.desktop}) {
        top: 0;
        opacity: 1;
    }
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

    @media (min-width: ${device.desktop}) {
        top: 0;
        opacity: 0;
    }

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
    background-color: #242424;
    box-shadow: 0px 0px 20px 5px #242424;

    @media (min-width: ${device.desktop}) {
        display: none;
    }

    .toggle-icon {
        border: solid #fff;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 4px;
        margin-top: --4px;

        transform: rotate(45deg);
    }
`;

export default WordListHeading;