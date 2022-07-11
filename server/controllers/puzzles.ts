import PuzzlesService from '../services/puzzles';
import { Puzzle } from '../models/Puzzle';

function getDefaultPuzzle(req, res) {
    const defaultPuzzle = PuzzlesService.getDefaultPuzzle();

    res.send({ puzzle: defaultPuzzle });
}

function getRandomPuzzle(req, res) {
    const randomPuzzle = PuzzlesService.getRandomPuzzle();

    res.send({ puzzle: randomPuzzle });
}

function addPuzzle(req, res, next) {
    const { date, centerLetter, letters, pangrams, words } = req.body;

    // @TODO Move this to a service
    // @TODO :: Add error handling!!

    const newPuzzle = new Puzzle({
        date,
        centerLetter,
        letters,
        pangrams,
        words
    });

    // Save new puzzle to db
    newPuzzle.save((error) => {
        next(error);
    });

    res.send({ addedPuzzle: newPuzzle });
}

export default { getDefaultPuzzle, getRandomPuzzle, addPuzzle };