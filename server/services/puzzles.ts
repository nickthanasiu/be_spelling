import Puzzle from "../models/Puzzle";
import type { AddPuzzleRequest } from "../../shared/types";

const getById = async (id: string) => {
    const puzzle = await Puzzle.findById(id);

    return puzzle;
};

const getOptions = async () => {
    const puzzles = await Puzzle.find({}, 'date');

    return puzzles;
};

const getRandomPuzzle = async () => {
    const puzzleChoices = [];

    // Return all puzzles from db and add to puzzleChoices array
    await Puzzle.find({}, (error, puzzles) => {
        puzzles.forEach((puzzle) => puzzleChoices.push(puzzle));
    });

    const randomIdx = Math.floor(Math.random() * puzzleChoices.length);
    const puzzleData = puzzleChoices[randomIdx];

    return buildPuzzle(puzzleData);
};

const save = async (requestBody: AddPuzzleRequest) => {
    const newPuzzle = new Puzzle(requestBody);

    // Save new puzzle to db
    await newPuzzle.save((error) => {
        // tslint:disable-next-line:no-console
        console.log('Error saving new puzzle ', newPuzzle, ' to database: ', error);
    });

    return newPuzzle;
};



export default { getById, getOptions, getRandomPuzzle, save };



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