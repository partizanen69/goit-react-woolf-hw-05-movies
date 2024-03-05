import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../api/moviedb';
import { MoviesList } from '../../components/MoviesList/MoviesList';
import { WrapStyled } from './Home.styled';
import { FullContainerLoader } from '../../components/Loader/Loader';

export const Home = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      const { result, err } = await fetchTrendingMovies();
      if (err) {
        setError(err);
        return;
      }

      setMovies(result.movies);
    };

    getTrendingMovies();
  }, []);

  if (error) {
    return (
      <WrapStyled>Error happened while loading movies: {error}</WrapStyled>
    );
  }

  if (movies === null) {
    return <FullContainerLoader />;
  }

  return <MoviesList movies={movies} />;
};
