import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store";
import HeaderSlide from "../components/HeaderSlide";
import Categories from "../components/Categories";

const Home = () => {
  const dispatch = useDispatch();

  const genresLoaded = useSelector((state) => state.movieApp.genresLoaded);
  const movies = useSelector((state) => state.movieApp.movies);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);

  return (
    <div>
      <HeaderSlide movies={movies} />
      <div className="py-8">
        <Categories movies={movies} />
      </div>
    </div>
  );
};

export default Home;
