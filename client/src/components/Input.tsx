import React from 'react';
import { useRecoilState } from 'recoil';
import { inputState, LetterObj } from '../recoil/atoms/input';
import { ensureUpperCase } from '../utils/ensureUpperCase';
import { useKeyPressListener } from '../hooks/useKeyPressListener';
import lettersList from '../data/letters.json';

// @TODO :: ensureUpperCase can be achieved with css text-transform: uppercase


function useIsCharacterLetter(char: string): boolean {
    return (/[a-zA-Z]/).test(char);
}

/*
    -Input component loads
    -Add keyboard event listener to window
    -Key pressed
    -Check if key value is letter
    -if not, do nothing
    -if it is, create letter Object and setInputVal
*/

function useLetterValidation(letter: string): LetterObj {
    const { centerLetter, letters } = lettersList;

    const isCenterLetter = ensureUpperCase(letter) === centerLetter;
    const isValid = letters.includes(ensureUpperCase(letter));
 
    return {
        letter,
        isValid,
        isCenterLetter
    };
}

function Input() {
    const [inputVal, setInputVal] = useRecoilState(inputState);
 
    const keyPressHandler = ({ key }: React.KeyboardEvent<Window>) => {
        // Check if character is a letter
        const isCharacterLetter = useIsCharacterLetter(key);

        // Check if key value is a letter
        // If character is NOT a letter, do nothing
        if (!isCharacterLetter) return;

        const newLetterObj = useLetterValidation(key);

        setInputVal([...inputVal, newLetterObj]);
    };

    useKeyPressListener(keyPressHandler);

    const styles = {
        width: '290px',
        height: '40px',
        border: 'none',
    };

    const getLetterStyle = (letter: LetterObj) => ({
        color: letter.isCenterLetter ? 'yellow' : letter.isValid ? 'black' : 'lightgrey'
    });

    return (
        <div className="input">
            {/*<input 
                type="text" 
                placeholder="Type or click" 
                value={inputVal} 
                onChange={onChange}
                style={styles}
                autoFocus
            />*/}
            <span className="input-content">
                {/* List of letter <span> elements */}
                {inputVal.map((letter: LetterObj) => (
                    <span style={getLetterStyle(letter)}>
                        {letter.letter}
                    </span>
                ))}
            </span>
        </div>
    );
}

export default Input;