import { model, Schema } from "mongoose";
import muv from "mongoose-unique-validator";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}).plugin(muv);

export default model("User", userSchema);
