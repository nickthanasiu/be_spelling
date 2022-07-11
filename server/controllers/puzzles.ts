import PuzzlesService from '../services/puzzles';

const getRandomPuzzle = (req, res) => {
    const randomPuzzle = PuzzlesService.getRandomPuzzle();

    res.send({ puzzle: randomPuzzle });
}

const addPuzzle = async (req, res, next) => {
    const puzzle = req.body;

    // @TODO :: Add error handling!!

    // Save new puzzle to db
    await PuzzlesService.savePuzzle(puzzle);

    res.send('Added successfully');
}

export default { getRandomPuzzle, addPuzzle };