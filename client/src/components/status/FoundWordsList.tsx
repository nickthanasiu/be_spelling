import { useRecoilValue } from 'recoil';
import { foundWordsAtom } from '../../recoil/atoms/foundWords';

function FoundsWordsList() {
    const foundWordsList = useRecoilValue(foundWordsAtom);

    return (
        <>
            {foundWordsList.map(word => <div>{word}</div>)}
        </>
    );
}

export default FoundsWordsList;