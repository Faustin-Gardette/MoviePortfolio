import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserLikedMovies } from "../../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import CardBody from "../../components/CardBody";

const List = () => {
  const movies = useSelector((state) => state.movieApp.movies);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/connexion");
  });

  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMovies(email));
    }
  }, [email]);

  return (
    <div>
      {movies.map((movie, index) => (
        <CardBody
          movieData={movie}
          index={index}
          key={movie.id}
          isLiked={true}
        />
      ))}
    </div>
  );
};

export default List;
