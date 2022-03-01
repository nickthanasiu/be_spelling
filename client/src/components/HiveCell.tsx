import React, { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { inputState } from '../recoil/atoms/input';
import { ensureUpperCase } from '../utilities/ensureUpperCase';

type HiveCellProps = {
    letter: string
}
const HiveCell: FunctionComponent<HiveCellProps> = ({ letter }) => {
    const [inputValue, setInputValue] = useRecoilState(inputState);

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

    

    const onClick = ({ currentTarget: {textContent}}: React.MouseEvent<HTMLDivElement>) => {
        // @TODO :: This is annoying. Shouldn't be necessary. Figure out workaround
        if (!textContent) return;

        setInputValue(
            ensureUpperCase(inputValue + textContent)
        );  
    };

    // @TODO :: Convert this to polygon svg
    return (
        <div onClick={onClick} style={styles}>{letter}</div>
    );
}

export default HiveCell;