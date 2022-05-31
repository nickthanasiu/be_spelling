import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { inputState, LetterObj } from '../../recoil/atoms/input';
import { useCreateLetterObj } from '../../hooks/useCreateLetterObj';
import { useBackspace } from '../../hooks/useBackspace';
import { useShuffleLetters } from '../../hooks/useShuffleLetters';
import { useKeyPressListener } from '../../hooks/useKeyPressListener';
import { useSubmitWord } from '../../hooks/useSubmitWord';
import { isCharacterLetter } from '../../utils/isCharacterLetter';
import Letter from './Letter';


function HiveInput() {
    const [inputVal, setInputVal] = useRecoilState(inputState);

    const createLetterObj = useCreateLetterObj();
    const backspace = useBackspace();
    const shuffle = useShuffleLetters();
    const submit = useSubmitWord();

    const clearInput = () => setInputVal([]);

    

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