import styled from 'styled-components';
import { PuzzleState } from '../../recoil/atoms/puzzle';
import HiveCell from './HiveCell';

interface IHiveProps {
    puzzle: PuzzleState;
}

function Hive({ puzzle }: IHiveProps) {
    const { centerLetter, letters } = puzzle;
    
    return (
        <StyledHiveWrapper>
            <StyledHive className="hive">
                <HiveCell letter={centerLetter} isCenter />
                {letters.map((letter: any) => (
                    <HiveCell key={letters.indexOf(letter)} letter={letter} />
                ))}
            </StyledHive>
        </StyledHiveWrapper>
    )
}

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

export default Hive;
