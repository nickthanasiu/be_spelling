import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { inputState, LetterType } from '../recoil/atoms/input';
import { inputWord } from '../recoil/selectors/input';
import { useKeyPressListener } from '../hooks/useKeyPressListener';
import { useLetterValidation } from '../hooks/useLetterValidation';
import wordList from '../data/wordList.json';

import Letter from '../components/Letter';

function isCharacterLetter(char: string): boolean {
    return char.length === 1 && (/[a-zA-Z]/).test(char);
}

function Input() {
    const [inputVal, setInputVal] = useRecoilState(inputState);
    const inputValAsString = useRecoilValue(inputWord);
    const [foundWordsList, setFoundWordsList] = useState([] as string[]);

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

        showMessage(message);
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

    return (
        <>
            <StyledInput>
                <span className="input-content">
                    {inputVal.map((letter: LetterType) => (
                        <Letter letter={letter} />
                   ))}
                </span>
             </StyledInput>
             <div>
                 <h3>Word List</h3>
                 <ul>
                    {foundWordsList.map(word => (
                        <li>{word}</li>
                    ))}
                 </ul>
             </div>
        </>
    );
}

const StyledInput = styled.div`
    width: 290px;
    height: 40px;
    border: none;
`;

export default Input;