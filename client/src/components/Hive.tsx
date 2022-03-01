import { useRecoilValue } from 'recoil';
import data from '../data/letters.json';
import { inputState } from '../recoil/atoms/input';
import HiveCell from './HiveCell';

function Hive() {
    const state = useRecoilValue(inputState);
    const { letters } = data;

    const styles = { 
        display: 'flex',
        margin:'25px 14.5px',
    };

    return (
        <>
            <div className="Hive" style={styles}>
                {letters.map((letter) => (
                    <HiveCell letter={letter} />
                ))}
            </div>
            <span>{state}</span>
        </>
    )
}

export default Hive;