import { useRecoilValueLoadable } from "recoil";
import styled from "styled-components";
import { puzzleOptionsAtom } from "../state";
import LoadingAnimation from "./loading/LoadingAnimation";
import PuzzleSelectForm from "./PuzzleSelectForm";

const LandingPage = () => {
    const { state, contents } = useRecoilValueLoadable(puzzleOptionsAtom);
    const loading = state === 'loading';

    return (
        <StyledLandingPage>
            {loading ? <LoadingAnimation /> : (
                <ContentContainer>
                    <h1>Be Spelling</h1>
                    <h2>A clone of the&nbsp;
                        <a href='https://www.nytimes.com/puzzles/spelling-bee' target="_blank" rel="noopener noreferrer">
                            NYT Spelling Bee
                        </a>
                    </h2>
                    
                    <PuzzleSelectForm options={contents.puzzle_options} />
                </ContentContainer>
            )}
        </StyledLandingPage>
    );
};

export default LandingPage;

const StyledLandingPage = styled.div`
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