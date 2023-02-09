import Puzzle from "../models/Puzzle";
import type { AddPuzzleRequest, PuzzleRanking } from "../shared/types";

const get = async (limit: number, cursor: string, sort: string) => {

    let sortByOrder, greaterOrLessThan;

    switch (sort) {
        case "oldest":
            sortByOrder = 'asc';
            greaterOrLessThan = '$gte';
            break;
        case "newest":
        default:
            sortByOrder = 'desc';
            greaterOrLessThan = '$lte';
    }

    const query =
        cursor ? { date: { [greaterOrLessThan]: decodeCursor(cursor) }}
        : {};

    const puzzles = await Puzzle.find(query)
    .sort({ date: sortByOrder })
    .limit(limit + 1);

    const hasMore = puzzles.length === limit + 1;

    let nextCursor = '';

    if (hasMore) {
        const nextCursorRecord = puzzles[limit];
        nextCursor = encodeCursor(nextCursorRecord.date.toISOString());
        puzzles.pop();
    }

    return {
        puzzles,
        nextCursor,
    };
};

const getById = async (id: string) => {
    const puzzle = await Puzzle.findById(id);

    return puzzle;
};

const getByDate = async (date: string) => {
    const puzzle = await Puzzle.findOne({ date });

    return puzzle;
};

const getOptions = async () => {
    const puzzles = await Puzzle.find({}, 'date');

    return puzzles;
};


const save = async (requestBody: AddPuzzleRequest) => {

    const { pangrams, words } = requestBody;

    // Generate puzzleData with rankings
    const rankings = generateRankings(pangrams, words);

    const puzzleData = {
        ...requestBody,
        rankings
    };

    const puzzle = new Puzzle(puzzleData);

    try {
        // Save new puzzle to db
        await puzzle.save();
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(
            `Error saving new puzzle to database`,
            `Puzzle: ${puzzle}`,
            `Error: ${err}`);
    }

    return puzzle;
};


export default {
    get,
    getById,
    getByDate,
    getOptions,
    save
};



// Helpers

function generateRankings(
    pangrams: string[],
    words: string[]
): PuzzleRanking[] {

    // Pangram is worth its length plus 7
    const calculatePangramScore = (pangram: string): number =>
        pangram.length + 7;

    // Four letter words are worth one point, while larger words are worth their length
    const calculateWordScore = (word: string): number =>
        word.length > 4 ? word.length : 1;

    // Calculate maximum score
    let maxScore = 0;

    words.forEach(word => maxScore += calculateWordScore(word));
    pangrams.forEach(pangram => maxScore += calculatePangramScore(pangram));

    const percentToScore = (percentage: number) =>
        Math.floor(maxScore * (percentage / 100));

    // Generate rankings
    const rankings: PuzzleRanking[] = [
        { name: 'Beginner', threshold: 0 },
        { name: 'Good Start', threshold: percentToScore(2) },
        { name: 'Moving Up', threshold: percentToScore(5) },
        { name: 'Good', threshold: percentToScore(8) },
        { name: 'Solid', threshold: percentToScore(15) },
        { name: 'Nice', threshold: percentToScore(25) },
        { name: 'Great', threshold: percentToScore(40) },
        { name: 'Amazing', threshold: percentToScore(50) },
        { name: 'Genius', threshold: percentToScore(70) },
        { name: 'Queen Bee', threshold: maxScore },
    ];

    return rankings;
}

function encodeCursor(rawCursor: string) {
    const buffer = Buffer.from(rawCursor);
    return buffer.toString('base64');
}

function decodeCursor(encodedCursor: string) {
    const buffer = Buffer.from(encodedCursor, 'base64');
    return buffer.toString('ascii');
}