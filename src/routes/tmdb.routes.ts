import { Router } from "express";
import { popularMovies } from "../controllers/tmdb.controller";

const router = Router();

router.get('/popular/:page', popularMovies);

export default router;
