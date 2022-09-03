import { useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import { allPuzzlesAtom } from '../state/puzzle';
import LoadingAnimation from './loading/LoadingAnimation';
import PuzzleMenu from "./PuzzleMenu";
import { PuzzleResponse } from '../../../server/shared/types';

const LandingPage = () => {
    const { state, contents } = useRecoilValueLoadable<PuzzleResponse[]>(allPuzzlesAtom);
    const loading = state === 'loading';
    
    return (
        <StyledLandingPage>
            {loading ? <LoadingAnimation /> : (
                <ContentContainer>

                    <h1>Be Spelling</h1>
                    <h2>
                        Archive of old
                        <a href='https://www.nytimes.com/puzzles/spelling-bee' target="_blank" rel="noopener noreferrer">
                            &nbsp;NYT Spelling Bee&nbsp;
                        </a>
                        puzzles, so you can revisit favorites or play those you missed.
                    </h2>


                    <PuzzleMenu puzzles={contents} />
          
                </ContentContainer>
            )}
        </StyledLandingPage>
    );
};

export default LandingPage;

const StyledLandingPage = styled.div`
    width: 100vw;
    height: 100vh;
    
    color: #fff;
    display: flex;
    justify-content: center;
`;

const ContentContainer = styled.div`
    width: 100%;
    max-width: 800px;
    height: fit-content;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    h1 {
        font-size: 36px;
        margin: 0;
        color: #f7da21;
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