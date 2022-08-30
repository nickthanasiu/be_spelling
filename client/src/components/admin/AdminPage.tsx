import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { addPuzzleFormAtom } from "../../recoil/atoms/admin";
import AddPuzzleForm from "./AddPuzzleForm";

const AdminPage: React.FC = () => {
    const addPuzzleFormState = useRecoilValue(addPuzzleFormAtom);

    return (
        <StyledAdminPage>
            <Column>
                <AddPuzzleForm />
            </Column>

            <Column>
                <div style={{ marginBottom: '5px' }}><b>Puzzle Preview</b></div>
                <div>Date: {addPuzzleFormState.date}</div>
                <div>CenterLetter: {addPuzzleFormState.centerLetter}</div>
                <div>Letters: {addPuzzleFormState.letters}</div>
                <div>Pangrams: {addPuzzleFormState.pangrams}</div>
                <div>Words: {addPuzzleFormState.words}</div>
            </Column>
        </StyledAdminPage>
    );
};

export default AdminPage;

const StyledAdminPage = styled.div`
    background-color: white;
    color: black;
    width: 100%;
    height: 100vh;
    display: flex;
`;

const Column = styled.div`
    width: 50%;
    padding: 20px;
`;