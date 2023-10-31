import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../../store";
import Categories from "../../components/Categories";
import SelectGenres from "../../components/SelectGenres";

const Movies = () => {
  const dispatch = useDispatch();

  const genresLoaded = useSelector((state) => state.movieApp.genresLoaded);
  const movies = useSelector((state) => state.movieApp.movies);
  const genres = useSelector((state) => state.movieApp.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "movie" }));
  }, [genresLoaded]);

  return (
    <div>
      <SelectGenres genres={genres} type="movie" />
      <Categories movies={movies} />
    </div>
  );
};

export default Movies;
