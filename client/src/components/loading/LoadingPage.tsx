import { useState, Dispatch, ReactElement, SetStateAction } from "react";
import { useRecoilValueLoadable } from "recoil";
import styled from "styled-components";
import { puzzleAtom } from "../../state";
import LoadingAnimation from "./LoadingAnimation";
import ApiClient from "../../api/client";

interface ILoadingPageProps {
    updateGameStarted: Dispatch<SetStateAction<boolean>>;
}

interface IPuzzleSelectMenuProps {
    options: { _id: string, date: Date }[]
}

const PuzzleMenu = ({ options }: IPuzzleSelectMenuProps) => {
    const [selectedPuzzleId, setSelectedPuzzleId] = useState('');

    const handleChange = (e: any) => {
        setSelectedPuzzleId(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        const response = await ApiClient.get(`/puzzles/${selectedPuzzleId}`);
        console.log('@@@ API response :: ', response);
    };

    return (
        <form onSubmit={handleSubmit}>
            <select name="puzzles" id="puzzles" defaultValue="" onChange={handleChange}>
                <option value="" disabled>Select date</option>

                {options.map((option) => {
                    const date = new Date(option.date);
                    const formattedDate = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

                    return (
                        <option value={option._id}>{formattedDate}</option>
                    )
                })}
            </select>

            <button type="submit" disabled={selectedPuzzleId === ''}>Submit</button>
        </form>
    );
};

function LoadingPage({ updateGameStarted }: ILoadingPageProps): ReactElement {
    const { state, contents } = useRecoilValueLoadable(puzzleAtom);
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
                    <PuzzleMenu options={contents.puzzle_options} />
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