import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { inputState, LetterType } from '../recoil/atoms/input';
import { useKeyPressListener } from '../hooks/useKeyPressListener';
import { useLetterValidation } from '../hooks/useLetterValidation';
import wordList from '../data/wordList.json';

import Letter from '../components/Letter';

function isCharacterLetter(char: string): boolean {
    // @TODO :: Shift, Tab, Caps Lock, Meta, are passing character validation
    return (/[a-zA-Z]/).test(char);
}

function Input() {
    const [inputVal, setInputVal] = useRecoilState(inputState);

    const submitWord = () => {
        /**/
        const { pangrams } = wordList;

        const word = inputVal.map(letter => letter.character)
            .join('')
            .toLowerCase();

        console.log('@@@ SUbMITING WORD :: ', word);
        const isPangram = pangrams.includes(word);

        console.log('@@@ isPangram :: ', isPangram);
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

        } else {
            return;
        }
    };

    useKeyPressListener(keyPressHandler);

    return (
        <StyledInput>
            <span className="input-content">
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

export default Input;