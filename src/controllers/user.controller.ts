import { Request, Response } from "express";
import { addMovieToList, addWatchedMovie, createList, deleteList, deleteMovieFromList, deleteWatchedMovie, findUserData } from "../services/user.service";

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
    const data = await addWatchedMovie(userId, parseInt(movieId));
    return response.status(200).json(data)
  } catch (error) {
    return response.status(400).json({
      message: error.message,
    })
  }
}

export async function unwatchMovie(request: Request, response: Response) {
  const {userId, movieId} = request.params;

  try {
    const data = await deleteWatchedMovie(userId, parseInt(movieId));
    return response.status(200).json(data)
  } catch (error) {
    return response.status(400).json({
      message: error.message,
    })
  }
}

export async function createListHandler(request: Request, response: Response) {
  const {userId} = request.params;
  const {listName} = request.body;

  if (!listName) {
    return response.status(500).json({
      message: 'Missing listName field'
    })
  }
  try {
    const data = await createList(userId, listName);
    return response.status(200).json(data)
  } catch (error) {
    return response.status(400).json({
      message: error.message
    })
  }
}

export async function deleteListHandler(request: Request, response: Response) {
  const {userId, listName} = request.params;

  try {
    const data = await deleteList(userId, listName);
    return response.status(200).json(data)
  } catch (error) {
    return response.status(400).json({
      message: error.message
    })
  }
}

export async function addMovieToListHander(request: Request, response: Response) {
  const {userId,listName} = request.params;
  const {movieId} = request.body;

  if (!movieId) {
    return response.status(500).json({
      message: 'Missing movieId field'
    })
  }
  try {
    const data = await addMovieToList(userId, listName, parseInt(movieId));
    return response.status(200).json(data)
  } catch (error) {
    return response.status(400).json({
      message: error.message
    })
  }
}

export async function deleteMovieFromListHander(request: Request, response: Response) {
  const {userId, listName, movieId} = request.params;

  try {
    const data = await deleteMovieFromList(userId, listName, parseInt(movieId));
    return response.status(200).json(data)
  } catch (error) {
    return response.status(400).json({
      message: error.message
    })
  }
}
