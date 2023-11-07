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

  useEffect(() => {
    const getEmail = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      } else {
        navigate("/connexion");
      }
    });
    return () => getEmail();
  }, [navigate]);

  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMovies(email));
    }
  }, [email]);

  const hasMovies = movies && movies.length > 0;

  return (
    <div className="py-4">
      <h1 className="text-3xl font-semibold pb-4 ">Mes favoris</h1>
      <div className="">
        {hasMovies ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {movies.map((movie, index) => (
              <CardBody movieData={movie} key={index} isLiked={true} />
            ))}
          </div>
        ) : (
          <div className="flex pt-8 text-3xl font-semibold justify-center w-full">
            Pas de film dans la liste.
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
