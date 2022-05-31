import express from "express";
import PuzzlesController from '../controllers/puzzles';

function getPuzzlesRoutes() {
    const router = express.Router();

    router.get('/default', PuzzlesController.getDefaultPuzzle);

    return router;
}

export default getPuzzlesRoutes;