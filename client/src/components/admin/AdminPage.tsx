import styled from "styled-components";
import AddPuzzleForm from "./AddPuzzleForm";
import AddPuzzlePreview from "./AddPuzzlePreview";

const AdminPage: React.FC = () => {

    return (
        <StyledAdminPage>
            <Wrapper>
                <Column>
                    <AddPuzzleForm />
                </Column>
                <Column>
                    <AddPuzzlePreview />
                </Column>
            </Wrapper>
        </StyledAdminPage>
    );
};

export default AdminPage;

const StyledAdminPage = styled.div`
    background-color: white;
    color: black;
    height: 100vh;
    padding-top: 40px;
    padding: 60px 20px 0;
`;

const Wrapper = styled.div`
    display: flex;
`;

const Column = styled.div`
    width: 50%;
    padding: 20px;
`;