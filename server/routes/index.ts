import express from 'express';
import getPuzzlesRoutes from './puzzles';

const getRoutes = () => {
    const router = express.Router();

    router.use('/puzzles', getPuzzlesRoutes());

    return router;
}

export default getRoutes;