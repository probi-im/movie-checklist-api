import axios from 'axios'

const API_URL = 'https://api.themoviedb.org/3';
const PICTURES_BASE_URL = 'https://image.tmdb.org/t/p/';
const PICTURES_FILE_SIZE = 'w500';
const API_KEY = process.env.TMDB_API_KEY || 'not_a_valid_api_key';

function cookMovieResult(movieResult: any) {
  movieResult.poster_path = PICTURES_BASE_URL + PICTURES_FILE_SIZE + movieResult.poster_path
  return movieResult;
}

export async function getPopularMovies(page: number) {
  try {
    if (page > 1000) throw new Error('Page limit reached (1000)')
    const res = await axios.get(`${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}`)
    res.data.results.map((r: any) => cookMovieResult(r))
    return res.data.results;
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function searchMovies(search: string) {
  try {
    if (search === '') throw new Error('Please specify a search')
    const res = await axios.get(`${API_URL}/search/movie?api_key=${API_KEY}&query=${search}`)
    res.data.results.map((r: any) => cookMovieResult(r))
    return res.data.results;
  } catch (error) {
    throw new Error(error.message)
  }
}
