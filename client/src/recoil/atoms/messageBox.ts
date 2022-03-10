import { atom } from 'recoil';
import { ErrorMessage, SuccessMessage } from '../../utils/generateMessage';

type MessageBoxStyle = "error" | "success";

type MessageBoxMessage = ErrorMessage | SuccessMessage;

export interface MessageBoxState {
    visible: boolean;
    message: MessageBoxMessage;
    style: MessageBoxStyle
}

export const messageBoxState = atom({
    key: 'messageBoxState',
    default: {
        visible: false,
        message: '' as MessageBoxMessage,
        style: 'error'
    } as MessageBoxState
});