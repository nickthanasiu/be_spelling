import express from "express";
import PuzzlesController from '../controllers/puzzles';

function getPuzzlesRoutes() {
    const router = express.Router();

    router.get('/default', PuzzlesController.getDefaultPuzzle);
    router.get('/', PuzzlesController.getRandomPuzzle);

    return router;
}

export default getPuzzlesRoutes;