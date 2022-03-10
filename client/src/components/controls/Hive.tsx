import data from '../../data/letters.json';
import HiveCell from './HiveCell';

function Hive() {
    const { centerLetter, letters } = data;

    const styles = { 
        display: 'flex',
        margin:'25px 14.5px',
    };

    return (
        <div className="Hive" style={styles}>
                <HiveCell letter={centerLetter} isCenter />
                {letters.map((letter) => (
                    <HiveCell letter={letter} />
                ))}
        </div>
    )
}

export default Hive;