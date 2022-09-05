import PuzzlesService from '../services/puzzles';

const getAll = async (req, res) => {
    const puzzles = await PuzzlesService.getAll();

    res.send(puzzles);
};

const getOptions = async (req, res) => {
    const options = await PuzzlesService.getOptions();

    res.send(options);
};

const getbyId = async (req, res) => {
    const puzzle = await PuzzlesService.getById(req.params.id);

    res.send(puzzle);
};

const add = async (req, res, next) => {
    const puzzleData = req.body;

    const puzzle = await PuzzlesService.save(puzzleData);

    res.status(201).send(puzzle);
}

export default { getAll, getOptions, getbyId, add };