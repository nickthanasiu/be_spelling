import styled from 'styled-components';
import MessageBox from "./MessageBox";
import HiveInput from "./HiveInput";
import Hive from "./Hive";
import HiveActions from "./HiveActions";
import { useRecoilValueLoadable } from 'recoil';
import { puzzleState } from '../../recoil/atoms/puzzle';

const Loading = () => <>Loading...</>;

function Controls() {
    const { state, contents } = useRecoilValueLoadable(puzzleState);
    const loading = state === 'loading';

    return loading ? <Loading /> : (
        <StyledControlsWrapper>
            <StyledControls>
                <MessageBox />
                <HiveInput />
                <Hive puzzle={contents.puzzle} />
                <HiveActions />
            </StyledControls> 
        </StyledControlsWrapper>
    );
}

const StyledControlsWrapper = styled.div`
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
