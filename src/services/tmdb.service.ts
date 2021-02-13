import axios from 'axios'

const API_URL = 'https://api.themoviedb.org/3/movie';
const PICTURES_BASE_URL = 'http://image.tmdb.org/t/p/';
const PICTURES_FILE_SIZE = 'w780';
const API_KEY = process.env.TMDB_API_KEY || 'not_a_valid_api_key';

function cookMovieResult(movieResult: any) {
  movieResult.poster_path = PICTURES_BASE_URL + PICTURES_FILE_SIZE + movieResult.poster_path
  return movieResult;
}

export async function getPopularMovies(page: number) {
  try {
    if (page > 1000) throw new Error('Page limit reached (1000)')
    const res = await axios.get(`${API_URL}/popular?api_key=${API_KEY}&page=${page}`)
    res.data.results.map((r: any) => cookMovieResult(r))
    return res.data.results;
  } catch (error) {
    throw new Error(error.message)
  }
}