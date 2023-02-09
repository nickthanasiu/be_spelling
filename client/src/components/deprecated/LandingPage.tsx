import { useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import { allPuzzlesAtom } from '../../state/puzzle';
import LoadingAnimation from '../loading/LoadingAnimation';
import PuzzleMenuContainer from './PuzzleMenuContainer';
import { type PuzzleResponse } from '../../../../server/shared/types';
import { PuzzlesApiResponse } from '../../state/puzzle';
import ApiClient from '../../api/client';

const LandingPage = () => {
    //const { state, contents } = useRecoilValueLoadable<PuzzlesApiResponse>(allPuzzlesAtom);
    //const loading = state === 'loading';


    return (
        <StyledLandingPage>
            <ContentContainer>


                {/**<PuzzleMenuContainer puzzlesApiData={puzzlesData} /> */}
          
            </ContentContainer>
        </StyledLandingPage>
    );
};

export default LandingPage;

const StyledLandingPage = styled.div`
    
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
    padding: 15px;
    padding-bottom: 50px;

    h1, h2 {
        text-align: left;
    }

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
