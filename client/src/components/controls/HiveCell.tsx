import React, { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { inputState } from '../../recoil/atoms/input';
import { useLetterValidation } from '../../hooks/useLetterValidation';

type HiveCellProps = {
    letter: string,
    isCenter?: boolean,
}
const HiveCell: FunctionComponent<HiveCellProps> = ({ letter, isCenter }) => {
    const [inputVal, setInputVal] = useRecoilState(inputState);

    const styles = { 
        backgroundColor: isCenter ? '#f7da21': 'lightgray',
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

        const newLetterObj = useLetterValidation(textContent);

        setInputVal([...inputVal, newLetterObj]);
    };

    // @TODO :: Convert this to polygon svg
    return (
        <div onClick={onClick} style={styles}>{letter}</div>
    );
}

export default HiveCell;