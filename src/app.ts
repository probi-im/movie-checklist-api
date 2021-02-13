require('dotenv').config();
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose';
import {authRoutes} from "./routes"
import {userRoutes} from "./routes"
import {tmdbRoutes} from "./routes"
import authMiddleware from './middlewares/auth.middleware'

const app = express()
const PORT = process.env.PORT || 5000;

const DB_HOST = process.env.DB_HOST || null;
const DB_NAME = process.env.DB_NAME || null;
const DB_USER = process.env.DB_USER || null;
const DB_PASS = process.env.DB_PASS || null;

if (!DB_HOST || !DB_NAME || !DB_USER || !DB_PASS) {
  console.error(
    'Environnement configuration is not complete (missing DB_HOST, DB_NAME, DB_USER or DB_PASS variable(s))'
  );
  process.exit();
}

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log('Successfully connected to MongoDB Atlas')
}).catch((error) => {
  console.log('Unable to connect to MongoDB Atlas')
  console.error(error)
  process.exit()
})

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/auth', authRoutes);
app.use('/users', authMiddleware, userRoutes);
app.use('/movies', tmdbRoutes);

app.get('/', (_,res) => {
  return res.status(200).json({
    message: 'Successfully reached the root of the Movie Checklist API'
  })
})

app.listen(PORT, () => console.log(`API running on port ${PORT}`))