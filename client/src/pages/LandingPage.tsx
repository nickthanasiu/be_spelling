import { useState, useEffect } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import { allPuzzlesAtom } from '../state/puzzle';
import LoadingAnimation from '../components/loading/LoadingAnimation';
import PuzzleMenuContainer from '../components/PuzzleMenuContainer';
import { type PuzzleResponse } from '../../../server/shared/types';
import { PuzzlesApiResponse } from '../state/puzzle';
import ApiClient from '../api/client';

const LandingPage = () => {
    //const { state, contents } = useRecoilValueLoadable<PuzzlesApiResponse>(allPuzzlesAtom);
    //const loading = state === 'loading';
    const [puzzlesData, setPuzzlesData] = useState<PuzzlesApiResponse>();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await ApiClient.get<PuzzlesApiResponse>('/puzzles');
            setPuzzlesData(response);
            setLoading(false);
        })();
    }, []);

    if (isLoading || !puzzlesData) {
        return (
            <StyledLandingPage>
                <LoadingAnimation />
            </StyledLandingPage>
        );
    }
    
    return (
        <StyledLandingPage>
            <ContentContainer>
                <h1>Be Spelling</h1>
                <h2>
                    Archive of old
                    <a href='https://www.nytimes.com/puzzles/spelling-bee' target="_blank" rel="noopener noreferrer">
                        &nbsp;NYT Spelling Bee&nbsp;
                    </a>
                    puzzles, so you can revisit favorites or play those you missed.
                </h2>

                <PuzzleMenuContainer puzzlesApiData={puzzlesData} />
          
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
