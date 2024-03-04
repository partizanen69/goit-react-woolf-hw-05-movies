import { Link, Route, Routes } from 'react-router-dom';
import { AppStyled, NavStyled } from './App.styled';
import { Home } from './Home/Home';
import { Suspense, lazy } from 'react';

const Movies = lazy(() => import('./Movies/Movies'));
const Reviews = lazy(() => import('./Reviews/Reviews'));
const MovieDetails = lazy(() => import('./MovieDetails/MovieDetails'));
const Cast = lazy(() => import('./Cast/Cast'));

export const App = () => {
  return (
    <AppStyled>
      <NavStyled>
        <Link to="/">Home</Link>
        <Link to="movies">Movies</Link>
      </NavStyled>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Routes>
      </Suspense>
    </AppStyled>
  );
};
