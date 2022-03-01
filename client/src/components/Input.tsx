import { useRecoilState } from 'recoil';
import { inputState } from '../recoil/atoms/input';
import { ensureUpperCase } from '../utilities/ensureUpperCase';

function Input() {
    const [inputVal, setInputVal] = useRecoilState(inputState);

    const onChange = ({ target: { value }}: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(
            ensureUpperCase(value)
        );
    };

    const styles = {
        width: '290px',
        height: '40px',
        border: 'none',
    };

    return (
        <div className="Input">
            <input 
                type="text" 
                placeholder="Type or click" 
                value={inputVal} 
                onChange={onChange}
                style={styles}
                autoFocus
            />
        </div>
    );
}

export default Input;