import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { WrapStyled } from '../Home/Home.styled';
import { FullContainerLoader } from '../Loader/Loader';
import { fetchMovieCast } from '../../api/moviedb';
import { CastStyled } from './CastStyled';

const Cast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieCast = async () => {
      const { result, err } = await fetchMovieCast({ movieId });
      if (err) {
        setError(err);
        return;
      }
      setCast(result);
    };

    getMovieCast();
  }, [movieId]);

  if (error) {
    return (
      <WrapStyled>
        Error happened while loading cast for movie {movieId}: {error}
      </WrapStyled>
    );
  }

  if (cast === null) {
    return <FullContainerLoader paddingBottom="10px" paddingTop="10px" />;
  }

  return (
    cast &&
    cast.cast &&
    cast.cast.length > 0 && (
      <CastStyled>
        {cast.cast.map(item => (
          <div className="cast-item">
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w200/${item.profile_path}`}
                alt={item.character}
              />
            </div>
            <span>Character: {item.character}</span>
            <span>Actor: {item.name}</span>
          </div>
        ))}
      </CastStyled>
    )
  );
};

export default Cast;
