import { Link, useLocation } from 'react-router-dom';
import { WrapStyled } from '../../Home/Home.styled';
import { FullContainerLoader } from '../../Loader/Loader';

export const MoviesList = ({ isLoading, error, movies }) => {
  const location = useLocation();

  if (error) {
    return (
      <WrapStyled>Error happened while loading movies: {error}</WrapStyled>
    );
  }

  if (isLoading) {
    return <FullContainerLoader />;
  }

  return (
    movies &&
    movies.length > 0 &&
    movies.map(movie => (
      <div key={movie.id}>
        <Link to={`/movies/${movie.id}`} state={{ from: location }}>
          {movie.name || movie.title}
        </Link>
      </div>
    ))
  );
};
