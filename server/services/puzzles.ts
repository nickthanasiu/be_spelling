import { Puzzle } from '../models/Puzzle';
import { AddPuzzleRequestBody, PuzzleResponseObj } from '../../shared/types';

const getById = async (id) => {
    const puzzle = await Puzzle.findById(id);
    
    return puzzle;
};

// Returns array of all puzzle dates paired with puzzle _id
const getOptions = async (): Promise<Partial<PuzzleResponseObj[]>> => {
    const puzzleDocuments = await Puzzle.find({}, 'date');
    const puzzleObjects = puzzleDocuments.map(pd => pd.toObject());
    const puzzlePartials = puzzleObjects.map(po => ({ ...po, _id: po._id.toString() }));

    return puzzlePartials;
}

const getRandom = async (): Promise<any> => {
    const puzzleChoices = [];

    // Return all puzzles from db and add to puzzleChoices array
    await Puzzle.find({}, (error, puzzles) => {
        puzzles.forEach((puzzle) => puzzleChoices.push(puzzle));
    });

    // Generate random index and use it to grab random puzzle
    const randomIdx = Math.floor(Math.random() * puzzleChoices.length);
    const puzzleData = puzzleChoices[randomIdx];

    return {};
};

const add = async (requestBody: AddPuzzleRequestBody): Promise<any> => {
    const puzzle = buildPuzzle(requestBody);

    // Create new Puzzle instance
    const newPuzzle = new Puzzle(puzzle);

    // Save new puzzle to db
    await newPuzzle.save();

    return newPuzzle;
};

export default { getOptions, getById, getRandom, add };

// Helpers

function buildPuzzle(puzzleData) {
    const { pangrams, words } = puzzleData;

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
    const rankings = [
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

    puzzleData.rankings = rankings;

    return puzzleData;
}