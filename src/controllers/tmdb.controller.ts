import { Request, Response } from "express";
import { getPopularMovies } from "../services/tmdb.service";

export async function popularMovies(request: Request, response: Response) {
  const page: number = parseInt(request.params.page);

  try {
    const data = await getPopularMovies(page);
    return response.status(200).json(data)
  } catch (error) {
    return response.status(500).json({
      message: error.message
    })
  }
}