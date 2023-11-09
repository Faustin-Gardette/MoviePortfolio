import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres, getUserLikedMovies } from "../store";
import HeaderSlide from "../components/HeaderSlide";
import Categories from "../components/Categories";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState(undefined);

  const genresLoaded = useSelector((state) => state.movieApp.genresLoaded);
  const movies = useSelector((state) => state.movieApp.movies);

  const likedMovies = useSelector((state) => state.movieApp.likedMovies);
  console.log(likedMovies);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);

  useEffect(() => {
    const logout = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      } else {
        navigate("/connexion");
      }
    });
    return () => logout();
  }, [navigate]);

  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMovies(email));
    }
  }, [email]);

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
