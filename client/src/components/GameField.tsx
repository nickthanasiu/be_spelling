import styled from 'styled-components';
import { device } from '../styles/device';
import Controls from './controls/Controls';
import WordList from './status/WordList';
import ScoreMarker from './status/ScoreMarker';
import { PuzzleState } from '../state';
import { useRecoilValue } from 'recoil';
import { answersById } from '../state/foundWords';
import { deriveTotalScoreFromWordsList } from '../state/score';
import { deriveRankingFromScore } from '../state/ranking';

interface Props {
    puzzle: PuzzleState
}

function GameField({ puzzle }: Props) {

    const { _id: puzzleId, pangrams, rankings } = puzzle;
    console.log('PUZZLE ', puzzle);

    const answers = useRecoilValue(answersById(puzzleId));
    console.log('ANSWERS ', answers);
    const score = deriveTotalScoreFromWordsList(answers, pangrams);
    const ranking = deriveRankingFromScore(score, rankings);

    return (
        <StyledGameField>

            <Status>

                <Progress>  

                    <Ranking>
                        {ranking}
                    </Ranking>

                    <ProgressBar>

                        <Line>
                            {[...Array(9)].map((el, i) => <Dot key={i} />)}
                        </Line>

                        <ScoreMarker ranking={ranking} score={score} />

                    </ProgressBar>
                </Progress>

                <WordList />

            </Status>

            <Controls puzzle={puzzle} />

        </StyledGameField>
    )
}

export default GameField;

const StyledGameField = styled.div`

    @media (min-width: ${device.desktop}) {
        height: 100%;
        width: 100%;
        max-width: 1080px;
        margin: 0 auto;

        display: flex;
        flex-direction: row-reverse;
        flex-grow: 1;
    }
`;

const Status = styled.div`
    @media (min-width: ${device.desktop}) {
        width: 50%;
    }
`;

const Progress = styled.div`
    margin: 24px 12px;
    padding-right: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Ranking = styled.div`
    min-width: 80px;
    font-weight: bold;
    display: flex;
    align-items: center;
`;

const ProgressBar = styled.div`
    margin-left: 12px;
    position: relative;
    display: flex;
    align-items: center;
    flex-grow: 1;
`;

const Line = styled.div`
    position: relative;
    background: lightgrey;
    height: 1px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Dot = styled.span`
    position: relative;

    &:after {
        content: '';
        display: block;
        position: absolute;
        left: -4px;
        top: -4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: lightgrey;
    }

    &:last-child:after {
        border-radius: 0;
    }

`;