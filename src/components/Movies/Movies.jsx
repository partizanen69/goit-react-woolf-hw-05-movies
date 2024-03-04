import { useSearchParams } from 'react-router-dom';
import { MoviesStyled } from './Movies.styled';
import { SearchBlock } from './SearchBlock/SearchBlock';
import { useEffect, useState } from 'react';
import { fetchMoviesByKeyword } from '../../api/moviedb';
import { MoviesList } from './MoviesList/MoviesList';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const startSearch = keyword => {
    if (isLoading) {
      return;
    }
    setSearchParams({ query: keyword });
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    const getMoviesByKeyword = async () => {
      setIsLoading(true);
      const { result, err } = await fetchMoviesByKeyword({ keyword: query });
      setIsLoading(false);

      if (err) {
        setError(err);
        return;
      }

      setMovies(result);
    };

    getMoviesByKeyword();
  }, [query]);

  return (
    <MoviesStyled>
      <SearchBlock onSubmit={startSearch} />
      <MoviesList isLoading={isLoading} error={error} movies={movies} />
    </MoviesStyled>
  );
};

export default Movies;
