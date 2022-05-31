import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { messageBoxAtom } from '../../recoil/atoms/messageBox';

function MessageBox() {
    const { visible, message } = useRecoilValue(messageBoxAtom);

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

const StyledErrorMessageBox = styled.div`
    background-color: #000;
    color: #fff;
    height: 30px;
    width: fit-content;
    border-radius: 3px;
`;

export default MessageBox;
