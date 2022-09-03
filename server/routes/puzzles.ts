import express from "express";
import PuzzlesController from '../controllers/puzzles';

function getPuzzlesRoutes() {
    const router = express.Router();

    router.get('/', PuzzlesController.getOptions);
    router.get('/all', PuzzlesController.getAll);
    router.get('/:id', PuzzlesController.getbyId);
    router.post('/', PuzzlesController.add);

    return router;
}

export default getPuzzlesRoutes;