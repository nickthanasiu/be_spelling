import HiveCell from './HiveCell';
import data from '../data/letters.json';


function BeeHive() {
    const { letters } = data;

    const styles = { 
        display: 'flex',
    };

    return (
        <div className="BeeHive" style={styles}>
            {letters.map((letter) => (
                <HiveCell letter={letter} />
            ))}
        </div>
    )
}

export default BeeHive;