import PuzzlesService from '../services/puzzles';

function getDefaultPuzzle(req, res) {
    const defaultPuzzle = PuzzlesService.getDefaultPuzzle();

    res.send({ puzzle: defaultPuzzle });
}

function getRandomPuzzle(req, res) {
    const randomPuzzle = PuzzlesService.getRandomPuzzle();

    res.send({ puzzle: randomPuzzle });
}

export default { getDefaultPuzzle, getRandomPuzzle };