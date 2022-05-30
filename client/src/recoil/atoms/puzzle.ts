import { atom, selector } from 'recoil';
import ApiClient from '../../api/client';

export interface PuzzleState {
    centerLetter: string;
    letters: string[];
    pangrams: string[];
    words: string[];
};

export const initializePuzzleState = selector<PuzzleState>({
    key: 'puzzleData',
    get: async ({get}) => {
        try {
            const response: any = await ApiClient.get('/puzzles/default');
            return response;
        } catch  (error) {
            console.error(error || 'Unexpected Error encountered while fetching default puzzle');
        }
    }
});

export const puzzleState = atom<PuzzleState>({
    key: 'puzzleState',
    default: initializePuzzleState
});