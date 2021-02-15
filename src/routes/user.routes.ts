import {Router} from 'express'
import {  watchMovie } from '../controllers';
import { addMovieToListHander, createListHandler, deleteListHandler, deleteMovieFromListHander, getUserData, unwatchMovie } from '../controllers/user.controller';

const router = Router();

router.get('/:userId', getUserData)
router.post('/:userId/watchedMovies', watchMovie)
router.delete('/:userId/watchedMovies/:movieId', unwatchMovie)
router.post('/:userId/lists', createListHandler)
router.delete('/:userId/lists/:listName', deleteListHandler)
router.post('/:userId/lists/:listName/movies', addMovieToListHander)
router.delete('/:userId/lists/:listName/movies/:movieId', deleteMovieFromListHander)

export default router;