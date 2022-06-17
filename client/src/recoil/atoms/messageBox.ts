import { atom } from 'recoil';

export type InvalidWordMessage = "Missing center letter" | "Not in word list" | "Already found";
export type InvalidInputMessage = "Too short" | "Bad letters";

export type ErrorMessage = InvalidInputMessage | InvalidWordMessage;
export type SuccessMessage = "Pangram!" | "Good!" | "Nice!" | "Awesome!";

export type TMessageBoxMessage = ErrorMessage | SuccessMessage | '';

export interface IMessageBoxAtom {
    visible: boolean;
    message: TMessageBoxMessage;
    isError: boolean;
}

export const messageBoxAtom = atom<IMessageBoxAtom>({
    key: 'messageBoxAtom',
    default: {
        visible: false,
        message: '',
        isError: false
    }
});