import { atom } from 'recoil';
import { MessageBoxState } from './types';


export const messageBoxAtom = atom<MessageBoxState>({
    key: 'messageBoxAtom',
    default: {
        visible: false,
        message: '',
        isError: false,
        isPangram: false,
    }
});