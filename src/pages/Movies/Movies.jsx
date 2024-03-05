import { useSearchParams } from 'react-router-dom';
import { MoviesStyled } from './Movies.styled';
import { SearchBlock } from './SearchBlock/SearchBlock';
import { useEffect, useState } from 'react';
import { fetchMoviesByKeyword } from '../../api/moviedb';
import { MoviesList } from '../../components/MoviesList/MoviesList';
import { WrapStyled } from '../Home/Home.styled';
import { FullContainerLoader } from '../../components/Loader/Loader';

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

    if (!keyword) {
      setMovies(null);
    }

    setSearchParams({
      ...(keyword ? { query: keyword } : null),
    });
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
      {error ? (
        <WrapStyled>Error happened while loading movies: {error}</WrapStyled>
      ) : isLoading ? (
        <FullContainerLoader />
      ) : (
        <MoviesList movies={movies} />
      )}
    </MoviesStyled>
  );
};

export default Movies;
