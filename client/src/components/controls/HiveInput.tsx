import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { inputState, LetterObj } from '../../recoil/atoms/input';
import { inputAsString } from '../../recoil/selectors/input';
import { useCreateLetterObj } from '../../hooks/useCreateLetterObj';
import { useBackspace } from '../../hooks/useBackspace';
import { useShuffleLetters } from '../../hooks/useShuffleLetters';
import { useKeyPressListener } from '../../hooks/useKeyPressListener';
import { useSubmitWord } from '../../hooks/useSubmitWord';

import Letter from './Letter';
import { messageBoxAtom, TMessageBoxMessage } from '../../recoil/atoms/messageBox';

function isCharacterLetter(char: string): boolean {
    return char.length === 1 && (/[a-zA-Z]/).test(char);
}

function HiveInput() {
    const [inputVal, setInputVal] = useRecoilState(inputState);
    const inputString = useRecoilValue(inputAsString);
    const [foundWordsList, setFoundWordsList] = useState([] as string[]);
    const showMessageBox = useSetRecoilState(messageBoxAtom);
    const createLetterObj = useCreateLetterObj();
    const backspace = useBackspace();
    const shuffle = useShuffleLetters();
    const submit = useSubmitWord();

    const clearInput = () => setInputVal([]);

    const addToFoundWordsList = (word: string) => {
        setFoundWordsList([...foundWordsList , word]);
    };

    const showMessage = (message: TMessageBoxMessage) => {
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

    /*
    const _submitWord = () => {

        function useWordValidator(word: string) {
            return {
                isValid: true,
                message: ''          
            }
        }
    
        //const { message } = useWordValidator(inputValAsString);

        //showMessage('Not in word list');
    };

    */
    const keyPressHandler = ({ key }: React.KeyboardEvent<Window>) => {
        /*
            Keys to listen for

            * Spacebar (shuffle letters)
            * Backspace
            * Enter (Submit word)
            * Letters
        */

        if (key === ' ' || key === 'Spacebar') {
            shuffle();
            return;
        } else if (key === 'Backspace') {
            backspace();
            return;
        } else if (key === 'Enter') {
            clearInput();
            submit();
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
    display: flex;
    justify-content: center;
`;

export default HiveInput;