import PuzzlesService from '../services/puzzles';
import { Puzzle } from '../models/Puzzle';

const getOptions = async (req, res) => {
    const options = await PuzzlesService.getOptions();

    res.send({ puzzle_options: options });
};

const getById = async (req, res) => {
    const puzzle = await PuzzlesService.getById(req.params.id);

    res.send({ puzzle });
};

const getRandomPuzzle = async (req, res) => {
    //const randomPuzzle = PuzzlesService.getRandomPuzzle();
    const allPuzzles = await Puzzle.find();

    res.send({ puzzle: allPuzzles });
}

const addPuzzle = async (req, res, next) => {
    const puzzle = req.body;

    // @TODO :: Add error handling!!

    // Save new puzzle to db
    await PuzzlesService.savePuzzle(puzzle);

    res.send('Added successfully');
}

export default { getById, getRandomPuzzle, addPuzzle, getOptions };