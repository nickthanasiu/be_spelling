import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { puzzleAtom } from "../../state";

interface Props {
    children: string;
}

const WordListItem = ({ children }: Props) => {
    const { pangrams } = useRecoilValue(puzzleAtom);
    const isPangram = pangrams.includes(children);

    return (
        <StyledWordListItem isPangram={isPangram}>
            {children}
        </StyledWordListItem>
    );
};

export default WordListItem;

const StyledWordListItem = styled.li<{ isPangram: boolean }>`
    font-weight: ${({ isPangram }) => isPangram && 'bold' };
`;