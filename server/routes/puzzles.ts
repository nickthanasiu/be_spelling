import express from "express";
import PuzzlesController from '../controllers/puzzles';

function getPuzzlesRoutes() {
    const router = express.Router();

    router.get('/', PuzzlesController.getOptions);
    router.get('/:id', PuzzlesController.getById);
    router.post('/', PuzzlesController.addPuzzle);

    return router;
}

export default getPuzzlesRoutes;