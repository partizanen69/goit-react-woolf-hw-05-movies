import { Link, useLocation } from 'react-router-dom';
import { WrapStyled } from '../Loader/Loader.styled';

export const MoviesList = ({ movies }) => {
  const location = useLocation();

  if (movies?.length === 0) {
    return <WrapStyled>No movies to show</WrapStyled>;
  }

  return (
    movies?.length > 0 &&
    movies.map(movie => (
      <div key={movie.id}>
        <Link to={`/movies/${movie.id}`} state={{ from: location }}>
          {movie.name || movie.title}
        </Link>
      </div>
    ))
  );
};
