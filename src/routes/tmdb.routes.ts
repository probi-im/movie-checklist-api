import { Router } from "express";
import { popularMovies, searchMovie } from "../controllers/tmdb.controller";

const router = Router();

router.get('/popular/:page', popularMovies);
router.get('/search/:search', searchMovie);

export default router;
