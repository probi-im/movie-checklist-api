import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Document } from "mongoose";
import { userDataModel, userModel } from "../models";

const AUTH_SECRET = process.env.AUTH_SECRET || "this is not a secret";
const TOKEN_EXPIRES_IN = 3600; // in seconds

function generateToken(userId: string) {
  return jwt.sign(
    {
      userId,
    },
    AUTH_SECRET,
    {
      expiresIn: TOKEN_EXPIRES_IN,
    }
  );
}

function getExpiresAt() {
  const now = new Date();
  return new Date(now).setSeconds(now.getSeconds() + TOKEN_EXPIRES_IN);
}

function documentToUser(doc: Document<any>) {
  return {
    userId: doc._id,
    email: doc.get("email"),
  };
}

export async function register(email: string, password: string) {
  try {
    const hash = await bcrypt.hash(password, 10);
    try {
      const user = await new userModel({
        email,
        password: hash,
      }).save();
      await new userDataModel({
        userId: user._id,
        watchedMovies: []
      }).save();
      const token = generateToken(user._id);
      const expiresAt = getExpiresAt();
      return {
        ...documentToUser(user),
        token,
        expiresAt,
      };
    } catch (error) {
      if (error.name && error.name === 'ValidationError') {
        throw new Error("This email address is already in use.");
      } else {
        throw new Error(error.message);
      }
    }
  } catch (error) {
    throw new Error(error.message || "Error while creating user.");
  }
}

export async function login(email: string, password: string) {
  try {
    const user = await userModel.findOne({ email });
    if (!user) throw new Error();
    try {
      const passwordMatch = await bcrypt.compare(
        password,
        user.get("password")
      );
      if (!passwordMatch) throw new Error();
      const token = generateToken(user._id);
      const expiresAt = getExpiresAt();
      return {
        ...documentToUser(user),
        token,
        expiresAt,
      };
    } catch (error) {
      throw new Error();
    }
  } catch (error) {
    throw new Error("Incorrect email or password");
  }
}
