import { selector } from "recoil";
import { inputState } from '../atoms/input';

// @TODO :: Re-name everything here. Getting confusing
export const inputAsString = selector({
    key: 'inputAsString',
    get: ({get}) => {
        const _inputState = get(inputState);

        // Return string of characters derived from inputState array
        return _inputState.map(letterObj => letterObj.letter)
                .join('')
                .toLowerCase();
    }   
});
