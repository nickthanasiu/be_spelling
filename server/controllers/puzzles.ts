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

const add = async (req, res) => {

    const puzzleData = req.body;
    const { date, centerLetter, letters, pangrams, words } = puzzleData;

    // Check for missing fields in request
    //@TODO Add better validation
    if (
        !date ||
        !centerLetter ||
        letters.length !== 6 ||
        !pangrams.length ||
        !words.length
    ) {
        const errorMessage = `Missing required field on request body: ${puzzleData}`;

        console.error(errorMessage);

        return res.status(400).send({
            error: errorMessage
        });
    }
    
    // Check if puzzle with given date already exists in database
    const alreadyExists = await PuzzlesService.getByDate(date);

    if (alreadyExists) {
        console.error(`Error adding puzzle to database. Puzzle from date: ${date} already exists`);
        return res.status(409).send({
            error: `Puzzle from ${date} already exists`
        });
    }

    // Save puzzle to db
    const puzzle = await PuzzlesService.save(puzzleData);

    res.status(201).send(puzzle);
}

export default { getAll, getOptions, getbyId, add };