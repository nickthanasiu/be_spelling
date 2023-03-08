import { Dispatch, SetStateAction } from 'react';
import styled, { css } from 'styled-components';
import { device } from '../../styles/device';
import { useAnswers } from '../../hooks/useAnswers';

interface Props {
    expanded: boolean;
    setExpanded: Dispatch<SetStateAction<boolean>>
}

export default function WordListHeading({ expanded, setExpanded }: Props) {

    const answersPreview = useAnswers('reverse');
    const answersCount = answersPreview.length;

    return (
        <StyledWordListHeading onClick={() => setExpanded(!expanded)}>
            <div>
                <WordCount expanded={expanded}>
                    You have found {answersCount} word{answersCount !== 1 ? 's' : ''}
                </WordCount>
                <PreviewWrapper expanded={expanded}>
                    <ul>
                        {answersCount === 0
                            ? <PlaceHolder>Your words...</PlaceHolder>
                            : answersPreview.map(answer => <li key={answer}>{answer}</li>)
                        }
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

const PlaceHolder = styled.li`
    color: gray;
`;