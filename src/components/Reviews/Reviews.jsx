import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { WrapStyled } from '../../pages/Home/Home.styled';
import { FullContainerLoader } from '../Loader/Loader';
import { fetchMovieReview } from '../../api/moviedb';
import { ReviewsStyled } from './Reviews.styled';

const Reviews = () => {
  const { movieId } = useParams();

  const [review, setReview] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieReview = async () => {
      const { result, err } = await fetchMovieReview({ movieId });
      if (err) {
        setError(err);
        return;
      }
      setReview(result);
    };

    getMovieReview();
  }, [movieId]);

  if (error) {
    return (
      <WrapStyled>
        Error happened while loading reviews for movie {movieId}: {error}
      </WrapStyled>
    );
  }

  if (review === null) {
    return <FullContainerLoader paddingBottom="10px" paddingTop="10px" />;
  }

  return review?.results?.length > 0 ? (
    <ReviewsStyled>
      {review.results.map(review => (
        <li key={review.id}>
          <h6>Author: {review.author}</h6>
          <p>{review.content}</p>
        </li>
      ))}
    </ReviewsStyled>
  ) : (
    <p>"We don't have any review for this movie"</p>
  );
};

export default Reviews;
