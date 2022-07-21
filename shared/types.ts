export type AddPuzzleRequestBody = {
    date: Date,
    centerLetter: string,
    letters: string[],
    pangrams: string[],
    words: string[],
}

export type PuzzleResponseObj = {
    _id: string,
    // @TODO :: Date should be required...update puzzles in database to reflect this
    date?: Date,
    // @TODO :: centerLetter should also be required
    centerLetter?: string,
    letters: string[],
    pangrams: string[],
    words: string[],
    // @TODO :: Update rankings type
    rankings?: any,
}

export type PuzzleOption = Pick<PuzzleResponseObj, "_id" | "date">

export type PuzzleRankingLevel = 
    'Beginner' 
    | 'Good Start'
    | 'Moving Up'
    | 'Good'
    | 'Solid'
    | 'Nice'
    | 'Great'
    | 'Amazing'
    | 'Genius'
    | 'Queen Bee'
;

export type PuzzleRanking = { name: PuzzleRankingLevel, threshold: number };
