import styled from "styled-components";
import PuzzleMenu from "./PuzzleMenu";
import { type PuzzleResponse } from "../../../server/shared/types";
import { loadLocalStorageState } from "../utils/localStorage";

interface Props {
    puzzles: PuzzleResponse[];
}

const InProgressMenu = ({ puzzles }: Props) => {

    
    return (
        <StyledInProgressMenu>
            <h2>Want to continue?</h2>

            <PuzzleMenu puzzles={puzzles} />
        </StyledInProgressMenu>
    );
};

export default InProgressMenu;

const StyledInProgressMenu = styled.div`
    width: 100%;
    
    h2 {
        color: #f7da21;
        text-align: left;
    }
`;