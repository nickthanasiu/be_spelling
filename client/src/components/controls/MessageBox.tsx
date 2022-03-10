import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { messageBoxState } from '../../recoil/atoms/messageBox';

function MessageBox() {
    const { visible, message, style } = useRecoilValue(messageBoxState);

    return (
        <>
            {visible && (
                <StyledErrorMessageBox>
                    {message}
                </StyledErrorMessageBox>
            )}
        </>
    );
}

export default MessageBox;

const StyledErrorMessageBox = styled.div`
    background-color: #000;
    color: #fff;
    height: 30px;
    width: fit-content;
    border-radius: 3px;
`;