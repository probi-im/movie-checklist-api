import { userDataModel } from "../models";
import { Document } from "mongoose";

function documentToUser(doc: Document<any> | null) {
  return doc ? {
    watchedMovies: doc.get("watchedMovies"),
  } : null;
}

export async function findUserData(userId: string) {
  try {
    return documentToUser(await userDataModel.findOne({userId}));
  } catch (error) {
    if (error.message) {
      throw error;
    } else {
      throw new Error("Provided user ID does not exist");
    }
  }
}

export async function addWatchedMovie(userId: string, movieId: string) {
  try {
    return documentToUser(await userDataModel.findOneAndUpdate({userId}, {$addToSet: {watchedMovies: movieId}}, {new: true, upsert: true}));
  } catch (error) {
    if (error.message) {
      throw error;
    } else {
      throw new Error("Provided user ID does not exist");
    }
  }
}

export async function deleteWatchedMovie(userId: string, movieId: string) {
  try {
    return documentToUser(await userDataModel.findOneAndUpdate({userId}, {$pull: {watchedMovies: movieId}}, {new: true, upsert: true}));
  } catch (error) {
    if (error.message) {
      throw error;
    } else {
      throw new Error("Provided user ID does not exist");
    }
  }
}
