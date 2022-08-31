import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { centerLetterSelector, lettersAtom } from '../../state';
import HiveCell from './HiveCell';

const Hive = () => {
    const letters = useRecoilValue(lettersAtom);
    const centerLetter = useRecoilValue(centerLetterSelector);
    
    return (
        <StyledHiveWrapper>
            <StyledHive className="hive">
                <HiveCell letter={centerLetter} isCenter />
                {letters.map((letter, i) => (
                    <HiveCell key={i} letter={letter} />
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
