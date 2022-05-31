import PuzzlesService from '../services/puzzles';

function getDefaultPuzzle(req, res) {
    const defaultPuzzle = PuzzlesService.getDefaultPuzzle();

    res.send({ puzzle: defaultPuzzle });
}

export default { getDefaultPuzzle };