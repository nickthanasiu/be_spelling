import { atom } from 'recoil';

export type InvalidWordMessage = "Missing center letter" | "Not in word list" | "Already found";
export type InvalidInputMessage = "Too short" | "Bad letters";

export type ErrorMessage = InvalidInputMessage | InvalidWordMessage;
export type SuccessMessage = "Pangram!" | "Good!" | "Nice!" | "Awesome!";

export type MessageBoxMessage = ErrorMessage | SuccessMessage | '';

export interface MessageBoxAtom {
    visible: boolean;
    message: MessageBoxMessage;
    isError: boolean;
    isPangram: boolean;
}

export const messageBoxAtom = atom<MessageBoxAtom>({
    key: 'messageBoxAtom',
    default: {
        visible: false,
        message: '',
        isError: false,
        isPangram: false,
    }
});