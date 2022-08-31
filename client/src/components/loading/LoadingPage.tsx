import { Dispatch, ReactElement, SetStateAction } from "react";
import { useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import { puzzleAtom } from '../../recoil/atoms/puzzle';
import LoadingAnimation from './LoadingAnimation';

interface ILoadingPageProps {
    updateGameStarted: Dispatch<SetStateAction<boolean>>;
}

function LoadingPage({ updateGameStarted }: ILoadingPageProps): ReactElement {
    const { state } = useRecoilValueLoadable(puzzleAtom);
    const loading = state === 'loading';

    return (
        <StyledLoadingPage>
            {loading ? <LoadingAnimation /> : (
                <ContentContainer>
                    <h1>Be Spelling</h1>
                    <h2>A clone of the&nbsp;
                        <a href='https://www.nytimes.com/puzzles/spelling-bee' target="_blank" rel="noopener noreferrer">
                            NYT Spelling Bee
                        </a>
                    </h2>
                    <PlayButton onClick={() => updateGameStarted(true)}>Play</PlayButton>
                </ContentContainer>
            )}
        </StyledLoadingPage>
    );
}

export default LoadingPage;

const StyledLoadingPage = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #f7da21;
    color: black;

    display: flex;
    justify-content: center;
`;

const ContentContainer = styled.div`
    height: fit-content;
    margin-top: 100px;

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    h1 {
        font-size: 36px;
        margin: 0;
    }

    h2 {
        font-size: 20px;
        font-weight: 500;
        margin: 15px 0 25px;

        a {
            text-decoration: none;
            color: inherit;
        }
    }
`;

const PlayButton = styled.button`
    background-color: black;
    color: #fff;
    border: none;
    outline: none;
    width: 125px;
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
`;