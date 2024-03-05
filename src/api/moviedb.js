import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const headers = {
  accept: 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Mjk4ZDMwZjg1NGM5Zjc0MGFiYTA2YTUzMjFmMTVmMiIsInN1YiI6IjY1ZTQ2MDE5MmFjNDk5MDE4NmVmZmI3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yhTSQBfKDngBaiZL1k9lMp2wADzhXicqLhvLW--riFg',
};

export const fetchTrendingMovies = async () => {
  try {
    const { data } = await axios.get('/trending/all/day?language=en-US', {
      headers,
    });
    return { result: { movies: data.results } };
  } catch (err) {
    console.error('fetchTrendingMovies error: ', err);
    return { err: err.message };
  }
};

export const fetchMovieDetails = async ({ movieId }) => {
  try {
    const { data } = await axios.get(`/movie/${movieId}?language=en-US`, {
      headers,
    });
    console.info('fetchMovieDetails result', { data });
    return { result: data };
  } catch (err) {
    console.error('fetchMovieDetails error: ', err);
    return { err: err.message };
  }
};

export const fetchMovieCast = async ({ movieId }) => {
  try {
    const { data } = await axios.get(
      `/movie/${movieId}/credits?language=en-US`,
      {
        headers,
      }
    );
    console.info('fetchMovieCast result', { data });
    return { result: data };
  } catch (err) {
    console.error('fetchMovieCast error: ', err);
    return { err: err.message };
  }
};

export const fetchMovieReview = async ({ movieId }) => {
  try {
    const { data } = await axios.get(
      `/movie/${movieId}/reviews?language=en-US&page=1`,
      {
        headers,
      }
    );
    console.info('fetchMovieReview result', { data });
    return { result: data };
  } catch (err) {
    console.error('fetchMovieReview error: ', err);
    return { err: err.message };
  }
};

export const fetchMoviesByKeyword = async ({ keyword }) => {
  console.info('asdfsdf', { keyword });
  try {
    const { data } = await axios.get(`/search/movie`, {
      headers,
      params: {
        include_adult: false,
        language: 'en-US',
        page: 1,
        query: keyword,
      },
    });
    console.info('fetchMoviesByKeyword result', { data });
    return { result: data.results };
  } catch (err) {
    console.error('fetchMoviesByKeyword error: ', err);
    return { err: err.message };
  }
};
