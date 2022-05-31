import React from 'react';
import styled, { css } from 'styled-components';
import { useBackspace } from '../../hooks/useBackspace';
import { useShuffleLetters } from '../../hooks/useShuffleLetters';

interface HiveActionButtonProps {
    actionType: 'SUBMIT' | 'DELETE' | 'SHUFFLE';
    children?: string;
}

function HiveActionButton({ actionType, children }: HiveActionButtonProps) {
    const submitWord = () => {
        console.log('@@@ SUBMIT');
    };

    const backspace = useBackspace();
    const shuffle = useShuffleLetters();

    const onClick: React.MouseEventHandler<HTMLElement> = () => {
        const clickAction = actionType === 'SUBMIT' ? submitWord
            : actionType === 'DELETE' ? backspace
            : shuffle;

        clickAction();
    };

    return (
        <StyledHiveActionButton actionType={actionType} onClick={onClick}>
            {children}
        </StyledHiveActionButton>
    );
}

const StyledHiveActionButton = styled.div<HiveActionButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
    width: 5.5em;
    min-width: 5.5em;
    height: 3em;
    background-color: white;
    font-size: 1em;
    margin: 0 8px;
    color: #333;
    border: 1px solid #dcdcdc;
    border-radius: 2.5em;
    letter-spacing: 0.01em;
    user-select: none;
    cursor: pointer;

    ${({ actionType }) => actionType === 'SHUFFLE' && css`
        background: url(https://www.nytimes.com/games-assets/v2/assets/shuffle.svg) center no-repeat;
        background-size: 60%;
        height: 3em;
        width: 3em;
        min-width: 3em;
    `}
`;

export default HiveActionButton;