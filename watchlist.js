import express from 'express';
import { authorizeModification } from '../middleware/authorize.js';
import { getWatchlist, addMovie, deleteMovie, updateMovie} from '../utils/db.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.use(authenticate);

router.get('/:userId', (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const watchlist = getWatchlist(userId);
    return res.status(200).json(watchlist);
});

router.post('/:userId/movies', authorizeModification, (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    return res.status(201).json(addMovie(userId, req.body));
});

router.put('/:userId/movies/:movieId', authorizeModification, (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const movieId = parseInt(req.params.movieId, 10);
    const movie = updateMovie(userId, movieId, req.body);
    if (!movie) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(movie);
});

router.delete('/:userId/movies/:movieId', authorizeModification, (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const movieId = parseInt(req.params.movieId, 10);
    const deletedMovie = deleteMovie(userId, movieId);
    if (!deletedMovie) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json({ message: "Movie deleted successfully" });
});

export default router;
