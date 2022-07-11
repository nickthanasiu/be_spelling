import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { addPuzzleFormAtom } from '../../recoil/atoms/admin';

const AddPuzzlePreview = () => {

    const addPuzzleFormState = useRecoilValue(addPuzzleFormAtom);

    const formatListWithCommas = (str: string) => {
        return str.replace(new RegExp("[\r\n]", "gm"), ", ");
    };

    return (
        <StyledAddPuzzlePreview>
            <Row>
                <Heading>Puzzle Preview</Heading>
            </Row>
            <Row>Date: {addPuzzleFormState.date}</Row>
            <Row>Center letter: {addPuzzleFormState.centerLetter}</Row>
            <Row>Letters: {addPuzzleFormState.letters.split('').join(', ')}</Row>
            <Row>Pangrams: {formatListWithCommas(addPuzzleFormState.pangrams)}</Row>
            <Row>Words: {formatListWithCommas(addPuzzleFormState.words)}</Row>
        </StyledAddPuzzlePreview>
    );
};

export default AddPuzzlePreview;

const StyledAddPuzzlePreview = styled.div`
    background-color: rgba(0, 0, 0, .05);
    height: 100%;
    padding: 20px;
`;

const Heading = styled.h1`
    font-weight: bold;
    font-size: 16px;
    margin: 0;
    margin-bottom: 10px;
`;

const Row = styled.div`
    margin-bottom: 15px;
`;