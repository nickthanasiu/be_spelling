import express from "express";
import PuzzlesController from '../controllers/puzzles';

function getPuzzlesRoutes() {
    const router = express.Router();

    router.get('/', PuzzlesController.get);
    router.get('/:id', PuzzlesController.getbyId);
    router.post('/', PuzzlesController.add);

    return router;
}

export default getPuzzlesRoutes;