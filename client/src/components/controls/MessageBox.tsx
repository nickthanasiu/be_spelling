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

    padding: 0 10px;
    display: flex;
    align-items: center;

    position: absolute;
    top: -50px;
    left: 50%;
    transform: translate(-50%, 0);
`;

export default MessageBox;
