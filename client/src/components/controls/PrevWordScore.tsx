import styled from 'styled-components';

function PrevWordScore({ isError}: { isError: boolean }) {

    return (
        <>
            {!isError && <StyledPrevWordScore>+1</StyledPrevWordScore>}
        </>
    );
}

export default PrevWordScore;

const StyledPrevWordScore = styled.div`
    font-weight: bold;
    color: black;
    position: absolute;
    right: -30px;
`;