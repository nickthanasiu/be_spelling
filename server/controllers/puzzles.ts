import PuzzlesService from '../services/puzzles';

const get = async (req, res) => {
    const { cursor, sort } = req.query;
    const limit = parseInt(req.query.limit, 10);

    const puzzles = await PuzzlesService.get(
        limit || 10,
        cursor,
        sort
    );

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
    // @TODO Add better validation
    if (
        !date ||
        !centerLetter ||
        letters.length !== 6 ||
        !pangrams.length ||
        !words.length
    ) {
        const errorMessage = `Missing required field on request body: ${puzzleData}`;

        // tslint:disable-next-line:no-console
        console.error(errorMessage);

        return res.status(400).send({
            error: errorMessage
        });
    }

    // Check if puzzle with given date already exists in database
    const alreadyExists = await PuzzlesService.getByDate(date);

    if (alreadyExists) {
        // tslint:disable-next-line:no-console
        console.error(`Error adding puzzle to database. Puzzle from date: ${date} already exists`);
        return res.status(409).send({
            error: `Puzzle from ${date} already exists`
        });
    }

    // Save puzzle to db
    const puzzle = await PuzzlesService.save(puzzleData);

    res.status(201).send(puzzle);
}

export default { get, getOptions, getbyId, add };