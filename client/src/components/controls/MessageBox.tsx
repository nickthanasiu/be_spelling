import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { messageBoxAtom } from '../../recoil/atoms/messageBox';
import PrevWordScore from './PrevWordScore';

function MessageBox() {
    const { visible, message, isError } = useRecoilValue(messageBoxAtom);

    return (
        <StyledMessageBox>
            {visible && (
                <Message isError={isError}>
                    <span>{message}</span>
                    <PrevWordScore isError={isError} />
                </Message>
            )}
        </StyledMessageBox>
    );
}

const StyledMessageBox = styled.div`
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translate(-50%, 0);
`;

const Message = styled.div<{ isError: boolean }>`
    font-weight: 500;
    height: 30px;
    width: fit-content;
    border-radius: 5px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    position: relative;
    
    background-color: white;
    color: black;
    border: 1px solid lightgray;

    ${({ isError }) => isError && css`
        background-color: black;
        color: white;
        border: 1px solid black;
    `};
`;

export default MessageBox;
