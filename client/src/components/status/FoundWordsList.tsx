import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { foundWordsAtom } from '../../recoil/atoms/foundWords';

function FoundsWordsList() {
    const foundWordsList = useRecoilValue(foundWordsAtom);
    const foundsWordsListPreview = foundWordsList.length > 0 ? foundWordsList : ['Your words...'];

    return (
        <StyledFoundWordsList>
            <FoundsWordsHeading>
                <FoundWordsPreview>
                    <FoundsWordPreviewList>
                        {foundsWordsListPreview.map(word => <li>{word}</li>)}
                    </FoundsWordPreviewList>
                </FoundWordsPreview>
            </FoundsWordsHeading>
        </StyledFoundWordsList>
    );
}

const StyledFoundWordsList = styled.div`
    border-radius: 6px;
    border: 1px solid #dcdcdc;
    overflow: hidden;
    margin: 12px;
`;

const FoundsWordsHeading = styled.div`
    position: relative;
    overflow: hidden;
    height: 45px;
    line-height: 45px;
`;

const FoundWordsPreview = styled.div`
    padding: 0 20px;
    position: relative;
    transition: all 270ms ease;
`;

const FoundsWordPreviewList = styled.ul`
    margin: 0;
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    list-style: none;

    display: flex;

    & > li {
        max-width: 200px;
        padding-right: 7px;
        /*
        -webkit-animation: squishin 700ms ease;
        animation: squishin 700ms ease;
        */
    }
`;

export default FoundsWordsList;