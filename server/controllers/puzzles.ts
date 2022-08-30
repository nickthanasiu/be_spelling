import Puzzle from "../models/Puzzle";
import PuzzlesService from '../services/puzzles';

function getDefaultPuzzle(req, res) {
    const defaultPuzzle = PuzzlesService.getDefaultPuzzle();

    res.send({ puzzle: defaultPuzzle });
}

function getRandomPuzzle(req, res) {
    const randomPuzzle = PuzzlesService.getRandomPuzzle();

    res.send({ puzzle: randomPuzzle });
}

function add(req, res, next) {
    const newPuzzle = new Puzzle(req.body);

    newPuzzle.save((error) => {
        next(error);
    });

    res.send(newPuzzle);
}

export default { getDefaultPuzzle, getRandomPuzzle, add };