import styled from 'styled-components';
import MessageBox from "./MessageBox";
import HiveInput from "./HiveInput";
import Hive from "./Hive";
import HiveActions from "./HiveActions";
import { PuzzleState } from '../../recoil/atoms/puzzle';

interface IControlsProps {
    puzzle: PuzzleState;
}

function Controls({ puzzle }: IControlsProps) {
    return (
        <StyledControlsWrapper>
            <StyledControls>
                <MessageBox />
                <HiveInput />
                <Hive puzzle={puzzle} />
                <HiveActions />
            </StyledControls> 
        </StyledControlsWrapper>
    );
}

const StyledControlsWrapper = styled.div`
    margin-top: 50px;
    padding-top: 10px;

    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledControls = styled.div`
    width: 80vw;
    max-width: 290px;
    z-index: 3;
    padding-bottom: 45px;

    opacity: 1;
    transition: opacity 150ms 200ms ease;

    position: relative;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default Controls;
