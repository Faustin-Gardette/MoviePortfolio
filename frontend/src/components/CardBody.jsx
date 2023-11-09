import { onAuthStateChanged } from "firebase/auth";
import { Heart, HeartOff, PlayCircle, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeFromLikedMovies } from "../store";
import { usePopup } from "../PopupContext";

const CardBody = ({ movieData, isLiked = false }) => {
  const [isHovered, setIsHovered] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(undefined);

  const { showPopup } = usePopup();

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

  const addToList = async () => {
    try {
      await axios.post("http://localhost:5000/server/user/add", {
        email,
        data: movieData,
      });

      showPopup("Film ajouté à votre liste");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full">
        <img
          className="rounded-lg"
          src={`https://image.tmdb.org/t/p/w780${movieData.image}`}
          alt={movieData.name}
        />
        {isHovered && (
          <div>
            <div className="absolute z-10 bg-black bg-opacity-50 top-0 bottom-0 left-0 right-0 rounded-lg"></div>
            <div className="absolute z-10 top-2 left-2 ">
              <h2 className=" font-semibold">{movieData.name}</h2>
              <ul className="flex gap-2">
                {movieData.genres.map((genre, index) => (
                  <li className="cursor-default" key={index}>
                    {genre}
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute z-10 flex gap-6 bottom-2 left-2">
              <div className="back-grey1 rounded-full p-1 cursor-pointer transition-all hover:bg-[#b8b8b8]">
                <PlayCircle
                  size={20}
                  color="#ff0000"
                  onClick={() => navigate("/video")}
                />
              </div>
              {isLiked ? (
                <div className="back-grey1 rounded-full p-1 cursor-pointer transition-all hover:bg-[#b8b8b8]">
                  <HeartOff
                    size={20}
                    color="#ff0000"
                    onClick={() =>
                      dispatch(
                        removeFromLikedMovies({ movieId: movieData.id, email })
                      )
                    }
                  />
                </div>
              ) : (
                <div className="back-grey1 rounded-full p-1 cursor-pointer transition-all hover:bg-[#b8b8b8]">
                  <Heart size={20} color="#ff0000" onClick={addToList} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardBody;
