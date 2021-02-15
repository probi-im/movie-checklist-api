import {Router} from 'express'
import {  watchMovie } from '../controllers';
import { addMovieToListHander, createListHandler, deleteListHandler, deleteMovieFromListHander, getUserData, unwatchMovie } from '../controllers/user.controller';

const router = Router();

router.get('/:userId', getUserData)
router.post('/:userId/watchedMovies', watchMovie)
router.delete('/:userId/watchedMovies', unwatchMovie)
router.post('/:userId/lists', createListHandler)
router.delete('/:userId/lists', deleteListHandler)
router.post('/:userId/lists/movies', addMovieToListHander)
router.delete('/:userId/lists/movies', deleteMovieFromListHander)

export default router;