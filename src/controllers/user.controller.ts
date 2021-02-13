import { Request, Response } from "express";
import { addWatchedMovie, deleteWatchedMovie, findUserData } from "../services/user.service";

export async function getUserData(request: Request, response: Response) {
  const {userId} = request.params;
  try {
    const data = await findUserData(userId)
    return response.status(200).json(data)
  } catch (error) {
    return response.status(400).json({
      message: error.message,
    })
  }
}

export async function watchMovie(request: Request, response: Response) {
  const {userId} = request.params;
  const {movieId} = request.body;
  if (!movieId) {
    return response.status(500).json({
      message: 'Missing movieId field'
    })
  }
  try {
    const data = await addWatchedMovie(userId, movieId);
    return response.status(200).json(data)
  } catch (error) {
    return response.status(400).json({
      message: error.message,
    })
  }
}

export async function unwatchMovie(request: Request, response: Response) {
  const {userId} = request.params;
  const {movieId} = request.body;
  if (!movieId) {
    return response.status(500).json({
      message: 'Missing movieId field'
    })
  }
  try {
    const data = await deleteWatchedMovie(userId, movieId);
    return response.status(200).json(data)
  } catch (error) {
    return response.status(400).json({
      message: error.message,
    })
  }
}
