import express from "express";
import PuzzlesController from '../controllers/puzzles';

function getPuzzlesRoutes() {
    const router = express.Router();
    
    router.get('/', PuzzlesController.getRandomPuzzle);
    router.post('/', PuzzlesController.addPuzzle);

    return router;
}

export default getPuzzlesRoutes;