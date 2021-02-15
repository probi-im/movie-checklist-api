import { userDataModel } from "../models";
import { Document } from "mongoose";

function documentToUser(doc: Document<any> | null) {
  return doc
    ? {
        watchedMovies: doc.get("watchedMovies"),
        lists: doc.get('lists')
      }
    : null;
}

export async function findUserData(userId: string) {
  try {
    return documentToUser(await userDataModel.findOne({ userId }));
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
    return documentToUser(
      await userDataModel.findOneAndUpdate(
        { userId },
        { $addToSet: { watchedMovies: movieId } },
        { new: true, upsert: true }
      )
    );
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
    return documentToUser(
      await userDataModel.findOneAndUpdate(
        { userId },
        { $pull: { watchedMovies: movieId } },
        { new: true, upsert: true }
      )
    );
  } catch (error) {
    if (error.message) {
      throw error;
    } else {
      throw new Error("Provided user ID does not exist");
    }
  }
}

export async function createList(userId: string, listName: string) {
  try {
    return documentToUser(
      await userDataModel.findOneAndUpdate(
        { userId },
        { $addToSet: { lists: { name: listName, movies: [] } } },
        { new: true, upsert: true }
      )
    );
  } catch (error) {
    if (error.message) {
      throw error;
    } else {
      throw new Error("Provided user ID does not exist");
    }
  }
}

export async function deleteList(userId: string, listName: string) {
  try {
    return documentToUser(
      await userDataModel.findOneAndUpdate(
        { userId },
        { $pull: { lists: {name: listName} } },
        { new: true, upsert: true }
      )
    );
  } catch (error) {
    if (error.message) {
      throw error;
    } else {
      throw new Error("Provided user ID does not exist");
    }
  }
}

export async function addMovieToList(userId: string, listName: string, movieId: string) {
  try {
    const doc = await userDataModel.findOne({userId});
    if (!doc) return null;
    const lists: any[] = doc.get('lists');
    const listIndex = lists.findIndex(l => l.name === listName);
    if (listIndex <= -1) return null;
    const listPath = `lists.${listIndex}.movies`;
    return documentToUser(await userDataModel.findOneAndUpdate({userId, 'lists.name': listName},  {$addToSet: {[listPath]: movieId}},
    { new: true, upsert: true }));
  } catch (error) {
    if (error.message) {
      throw error;
    } else {
      throw new Error('Provided user ID does not exist')
    }
  }
}

export async function deleteMovieFromList(userId: string, listName: string, movieId: string) {
  try {
    const doc = await userDataModel.findOne({userId});
    if (!doc) return null;
    const lists: any[] = doc.get('lists');
    const listIndex = lists.findIndex(l => l.name === listName);
    if (listIndex <= -1) return null;
    const listPath = `lists.${listIndex}.movies`;
    return documentToUser(await userDataModel.findOneAndUpdate({userId, 'lists.name': listName},  {$pull: {[listPath]: movieId}},
    { new: true, upsert: true }));
  } catch (error) {
    if (error.message) {
      throw error;
    } else {
      throw new Error('Provided user ID does not exist')
    }
  }
}
