import { PuzzleRanking } from "../../../shared/types";

// Admin
export type AddPuzzleFormState = {
    date: string,
    centerLetter: string,
    letters: string,
    pangrams: string,
    words: string,
}

// Input
export type LetterObj = {
    letter: string;
    isValid: boolean;
    isCenterLetter: boolean;
}

export type InputState = LetterObj[];

// Message Box
export type InvalidWordMessage = "Missing center letter" | "Not in word list" | "Already found";
export type InvalidInputMessage = "Too short" | "Bad letters";

export type ErrorMessage = InvalidInputMessage | InvalidWordMessage;
export type SuccessMessage = "Pangram!" | "Good!" | "Nice!" | "Awesome!";

export type MessageBoxMessage = ErrorMessage | SuccessMessage | '';

export interface MessageBoxState {
    visible: boolean;
    message: MessageBoxMessage;
    isError: boolean;
    isPangram: boolean;
}

// Puzzle
export interface PuzzleState {
    date: string;
    centerLetter: string;
    letters: string[];
    pangrams: string[];
    words: string[];
    rankings: PuzzleRanking[];
};
