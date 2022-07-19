import { Types as MongooseTypes } from "mongoose";

export type TNewPuzzleRequestObj = {
    date: Date,
    centerLetter: string,
    letters: string[],
    pangrams: string[],
    words: string[],
}

export type TPuzzleResponseObj = {
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
