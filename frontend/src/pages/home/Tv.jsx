import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../../store";
import Categories from "../../components/Categories";
import SelectGenres from "../../components/SelectGenres";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../utils/firebase";

const Tv = () => {
  const dispatch = useDispatch();

  const genresLoaded = useSelector((state) => state.movieApp.genresLoaded);
  const movies = useSelector((state) => state.movieApp.movies);
  const genres = useSelector((state) => state.movieApp.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "tv" }));
  }, [genresLoaded]);

  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/connexion");
  });

  return (
    <div>
      <SelectGenres genres={genres} type="tv" />
      <Categories movies={movies} />
    </div>
  );
};

export default Tv;
