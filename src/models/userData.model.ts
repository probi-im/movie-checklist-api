import { model, Schema } from 'mongoose'
import muv from "mongoose-unique-validator";

const userDataSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  watchedMovies: { type: Array, required: true },
  lists: { type: Array, required: true },
}).plugin(muv);

export default model('UserData', userDataSchema, 'usersData')
