import { selector } from "recoil";
import { inputState } from '../atoms/input';

// @TODO :: Re-name everything here. Getting confusing
export const inputWord = selector({
    key: 'inputWord',
    get: ({get}) => {
        const _inputState = get(inputState);

        // Return string of characters derived from inputState array
        return _inputState.map(letter => letter.character)
                .join('')
                .toLowerCase();
    }   
});
