import { atom } from 'recoil';
import { ErrorMessage, SuccessMessage } from '../../utils/generateMessage';

export type MessageBoxMessage = ErrorMessage | SuccessMessage | '';

export interface MessageBoxState {
    visible: boolean;
    message: MessageBoxMessage;
    isError: boolean;
}

export const messageBoxState = atom({
    key: 'messageBoxState',
    default: {
        visible: false,
        message: '' as MessageBoxMessage,
        isError: false
    } as MessageBoxState
});