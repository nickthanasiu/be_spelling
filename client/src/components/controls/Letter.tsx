import styled from 'styled-components';
import { LetterType } from '../../recoil/atoms/input';


interface LetterProps {
    letter: LetterType
}

function Letter({ letter }: LetterProps) {
    return (
        <StyledLetter letter={letter}>{letter.character}</StyledLetter>
    )
}

export default Letter;

const yellow = '#f7da21';
const lightGray = '#dcdcdc';

const StyledLetter = styled.span<LetterProps>`
    color: ${props => props.letter.isCenterLetter ? yellow : props.letter.isValid ? "#000" : lightGray };
    font-size: 2em;
    font-weight: bold;
    text-transform: uppercase;
`;