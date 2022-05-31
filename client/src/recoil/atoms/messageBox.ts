import { atom } from 'recoil';
import { ErrorMessage, SuccessMessage } from '../../utils/generateMessage';

export type TMessageBoxMessage = ErrorMessage | SuccessMessage | '';

export interface IMessageBoxAtom {
    visible: boolean;
    message: TMessageBoxMessage;
}

export const messageBoxAtom = atom<IMessageBoxAtom>({
    key: 'messageBoxAtom',
    default: {
        visible: false,
        message: ''
    }
});