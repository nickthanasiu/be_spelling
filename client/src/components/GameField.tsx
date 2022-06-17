import styled from 'styled-components';
import Status from './status/Status';
import Controls from './controls/Controls';
import { PuzzleState } from '../recoil/atoms/puzzle';

function GameField({ puzzle }: { puzzle: PuzzleState }) {
    return (
        <StyledGameField>
            <Status />
            <Controls puzzle={puzzle} />
        </StyledGameField>
    )
}

export default GameField;

const StyledGameField = styled.div``;