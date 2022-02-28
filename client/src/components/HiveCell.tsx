import { FunctionComponent } from 'react';

type HiveCellProps = {
    letter: string
}
const HiveCell: FunctionComponent<HiveCellProps> = ({ letter }) => {
    const styles = { 
        backgroundColor: 'lightgray', 
        height: '100px', 
        width: '100px',
        margin: '0 5px',
        fontSize: '25px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    };

    return (
        <div style={styles}>{letter}</div>
    );
}

export default HiveCell;