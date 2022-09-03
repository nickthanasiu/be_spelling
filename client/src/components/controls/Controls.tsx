import styled from 'styled-components';
import MessageBox from "./MessageBox";
import HiveInput from "./HiveInput";
import HiveContainer from "./HiveContainer";
import HiveActions from "./HiveActions";

function Controls() {
    return (
        <StyledControlsWrapper>
            <StyledControls>
                <MessageBox />
                <HiveInput />
                <HiveContainer />
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
