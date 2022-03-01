import { useState } from 'react';

function Input() {
    const [inputVal, setInputVal] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(e.target.value);
    };

    const styles = {
        width: '290px',
        height: '40px',
    };

    return (
        <div className="Input">
            <input 
                type="text" 
                placeholder="Type or click" 
                value={inputVal} 
                onChange={onChange}
                style={styles}
            />
        </div>
    );
}

export default Input;