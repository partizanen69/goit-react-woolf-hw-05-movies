import { useEffect, useState } from 'react';
import { FullContainerLoader } from '../Loader/Loader';
import { WrapStyled } from './Home.styled';
import { fetchTrendingMovies } from '../../api/moviedb';
import { Link } from 'react-router-dom';

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

  if (movies === null) {
    return <FullContainerLoader />;
  }

  if (error) {
    return (
      <WrapStyled>Error happened while loading movies: {error}</WrapStyled>
    );
  }

  return movies && movies.length ? (
    <ul>
      {movies.map(movie => (
        <Link key={movie.id} to={`/movies/${movie.id}`}>
          <li>{movie.title || movie.name}</li>
        </Link>
      ))}
    </ul>
  ) : null;
};
