import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { inputState, LetterObj } from '../../recoil/atoms/input';
import { inputWord } from '../../recoil/selectors/input';
import { useBackspace, useKeyPressListener, useShuffleLetters } from '../../hooks/customHooks';
import { createLetterObj } from '../../utils/createLetterObj';

import Letter from './Letter';
import { messageBoxState, MessageBoxMessage } from '../../recoil/atoms/messageBox';

function isCharacterLetter(char: string): boolean {
    return char.length === 1 && (/[a-zA-Z]/).test(char);
}

function HiveInput() {
    const [inputVal, setInputVal] = useRecoilState(inputState);
    const inputValAsString = useRecoilValue(inputWord);
    const [foundWordsList, setFoundWordsList] = useState([] as string[]);
    const showMessageBox = useSetRecoilState(messageBoxState);
    const backspace = useBackspace();
    const shuffle = useShuffleLetters();

    const clearInput = () => setInputVal([]);

    const addToFoundWordsList = (word: string) => {
        setFoundWordsList([...foundWordsList , word]);
    };

    const showMessage = (message: MessageBoxMessage) => {
        showMessageBox({
            visible: true,
            message,
            isError: true
        });
        
        clearInput();
        delay(1000, hideMessage);
    };

    const delay = (ms: number, cb: () => any) => {
        setTimeout(() => {
            cb();
        }, ms);
    };

    const hideMessage = () => {
        showMessageBox({
            visible: false,
            message: '',
            isError: false
        });
    };

    const submitWord = () => {

        function useWordValidator(word: string) {
            return {
                isValid: true,
                message: ''          
            }
        }
    
        const { message } = useWordValidator(inputValAsString);

        showMessage('Not in word list');
    };

    const keyPressHandler = ({ key }: React.KeyboardEvent<Window>) => {
        /*
            Keys to listen for

            * Letters
            * Enter (Submit word)
            * Backspace
            * Spacebar (shuffle letters)
        */

        if (key === ' ' || key === 'Spacebar') {
            shuffle();
            return;
        } else if (key === 'Backspace') {
            backspace();
            return;
        } else if (key === 'Enter') {
            submitWord();
            return;
        } else if (isCharacterLetter(key)) {
            const newLetterObj = createLetterObj(key);
            setInputVal([...inputVal, newLetterObj]);
        }
    };

    useKeyPressListener(keyPressHandler);


    // @TODO :: Handle input too long. Show error message 'Too long' once input hits 20
    // Also, font should start getting smaller @ 15 characters

    return (
        <StyledInput className='hive-input'>
            <span className="hive-input-content">
                {inputVal.map((letterObj: LetterObj) => (
                    <Letter letterObj={letterObj} />
                ))}
            </span>
        </StyledInput>
    );
}

const StyledInput = styled.div`
    width: 290px;
    height: 40px;
    border: none;
`;

export default HiveInput;