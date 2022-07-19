import PuzzlesService from '../services/puzzles';
import { Puzzle } from '../models/Puzzle';

// @TODO :: Add error handling to all controllers!!

const getOptions = async (req, res) => {
    const options = await PuzzlesService.getOptions();

    res.send({ puzzle_options: options });
};

const getById = async (req, res) => {
    const puzzle = await PuzzlesService.getById(req.params.id);

    res.send({ puzzle });
};

const getRandom = async (req, res) => {
    const puzzle = PuzzlesService.getRandom();

    res.send({ puzzle });
}
 
const add = async (req, res) => {
    const puzzle = await PuzzlesService.add(req.body);

    res.status(201).send({ puzzle });
}

export default { getOptions, getById, getRandom, add };