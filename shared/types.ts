export type AddPuzzleRequest = {
    date: string,
    centerLetter: string,
    letters: string[],
    pangrams: string[],
    words: string[],
}

export type PuzzleResponse = {
    _id: string,
    date: string,
    centerLetter: string,
    letters: string[],
    pangrams: string[],
    words: string[],
    rankings: any,
};

export type PuzzleOption = Pick<PuzzleResponse, "_id" | "date">;