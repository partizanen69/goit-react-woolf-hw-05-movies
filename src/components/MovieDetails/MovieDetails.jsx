import { Suspense, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { FullContainerLoader } from '../Loader/Loader';
import { WrapStyled } from '../Loader/Loader.styled';
import { fetchMovieDetails } from '../../api/moviedb';
import {
  AdditionalInfoStyled,
  GobackStyled,
  MovieDetailsStyled,
  MovieInfoStyled,
} from './MovieDetails.styled';

const MovieDetails = () => {
  const location = useLocation();
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      const { result, err } = await fetchMovieDetails({ movieId });
      if (err) {
        setError(err);
        return;
      }

      setMovie(result);
    };

    getMovieDetails();
  }, [movieId]);

  if (error) {
    return (
      <WrapStyled>
        Error happened while loading movie id {movieId}: {error}
      </WrapStyled>
    );
  }

  if (movie === null) {
    return <FullContainerLoader />;
  }

  const movieTitle = movie.title || movie.name || 'no title';
  const releaseDate =
    (movie.release_date || '').slice(0, 4) || 'no release year';
  const userScore = Math.round((movie.vote_average || 0) * 10 * 100) / 100;
  const genres = (movie.genres || []).map(genre => genre.name).join(', ');

  return (
    <MovieDetailsStyled>
      <GobackStyled>
        <Link to={location?.state?.from || '/'}>&larr; Go back</Link>
      </GobackStyled>

      <MovieInfoStyled>
        <div className="movie-photo">
          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            alt={movie.title || movie.name}
          />
        </div>
        <div className="movie-details">
          <h2>{`${movieTitle} (${releaseDate})`}</h2>
          <p>User score: {userScore}%</p>
          <h5>Overview</h5>
          <p>{movie.overview}</p>
          <h5>Genres</h5>
          <p>{genres}</p>
        </div>
      </MovieInfoStyled>
      <AdditionalInfoStyled>
        <p>Additional information</p>
        <ul>
          <li>
            <Link to="cast" state={{ from: location?.state?.from }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: location?.state?.from }}>
              Review
            </Link>
          </li>
        </ul>
      </AdditionalInfoStyled>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </MovieDetailsStyled>
  );
};
export default MovieDetails;
