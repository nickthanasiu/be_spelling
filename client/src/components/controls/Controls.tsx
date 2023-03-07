import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { foundWordsListExpandedAtom } from '../../state/foundWords';
import MessageBox from "./MessageBox";
import HiveInput from "./HiveInput";
import HiveActions from "./HiveActions";
import { PuzzleState } from '../../state';
import HiveCell from './HiveCell';

function Controls({ puzzle }: { puzzle: PuzzleState }) {
    const foundWordsListExpanded = useRecoilValue(foundWordsListExpandedAtom);
    const { letters, centerLetter } = puzzle;

    return (
        <StyledControlsWrapper>
            <StyledControls expanded={foundWordsListExpanded}>

                <MessageBox />

                <HiveInput />

                <StyledHiveWrapper>
                    <StyledHive>
                        <HiveCell letter={centerLetter} isCenter />
                        {letters.map((letter, i) => (
                            <HiveCell key={i} letter={letter} />
                        ))}
                    </StyledHive>
                </StyledHiveWrapper>

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

const StyledControls = styled.div<{ expanded: boolean}>`
    width: 80vw;
    max-width: 290px;
    z-index: 3;
    padding-bottom: 45px;

    opacity: ${props => props.expanded ? 0 : 1};

    position: relative;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledHiveWrapper = styled.div`
    width: 90%;
    margin: 25px auto;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;
const StyledHive = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 103.92305%;
`;

export default Controls;
