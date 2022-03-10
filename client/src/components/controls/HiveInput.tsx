import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { inputState, LetterType } from '../../recoil/atoms/input';
import { inputWord } from '../../recoil/selectors/input';
import { useKeyPressListener } from '../../hooks/useKeyPressListener';
import { useLetterValidation } from '../../hooks/useLetterValidation';

import Letter from './Letter';
import { messageBoxState, MessageBoxState } from '../../recoil/atoms/messageBox';

function isCharacterLetter(char: string): boolean {
    return char.length === 1 && (/[a-zA-Z]/).test(char);
}

function HiveInput() {
    const [inputVal, setInputVal] = useRecoilState(inputState);
    const inputValAsString = useRecoilValue(inputWord);
    const [foundWordsList, setFoundWordsList] = useState([] as string[]);
    const showMessageBox = useSetRecoilState(messageBoxState);

    const clearInput = () => setInputVal([]);

    const addToFoundWordsList = (word: string) => {
        setFoundWordsList([...foundWordsList , word]);
    };

    const showMessage = (message: string) => {
        window.alert(message);
        clearInput();
    };

    const submitWord = () => {

        function useWordValidator(word: string) {
            return {
                isValid: true,
                message: ''          
            }
        }
    
        const { message } = useWordValidator(inputValAsString);

        showMessageBox({
            visible: true,
            message: 'Bad letters',
            style: 'error'
        });
    };

    const handleBackspace = () => {
        setInputVal([...inputVal.slice(0, -1)]);
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
            console.log('@@@ SPACEBAR');
            return;
        } else if (key === 'Backspace') {
            handleBackspace();
            return;
        } else if (key === 'Enter') {
            submitWord();
            return;
        } else if (isCharacterLetter(key)) {
            const newLetterObj = useLetterValidation(key);

            setInputVal([...inputVal, newLetterObj]);
        }
    };

    useKeyPressListener(keyPressHandler);


    // @TODO :: Handle input too long. Show error message 'Too long' once input hits 20
    // Also, font should start getting smaller @ 15 characters

    return (
        <StyledInput className='hive-input'>
            <span className="hive-input-content">
                {inputVal.map((letter: LetterType) => (
                    <Letter letter={letter} />
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