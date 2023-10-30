import { Heart, HeartOff, Play, PlayCircle, Plus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CardBody = ({ movieData }) => {
  const [isHovered, setIsHovered] = useState();
  const navigate = useNavigate();
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          className="rounded-lg"
          src={`https://image.tmdb.org/t/p/w780${movieData.image}`}
          alt={movieData.name}
        />
        {isHovered && (
          <div>
            <div className="absolute z-10 top-2 left-2">
              <h2>{movieData.name}</h2>
              <ul className="flex gap-2">
                {movieData.genres.map((genre, index) => (
                  <li className="cursor-default" key={index}>
                    {genre}
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute z-10 flex gap-6 bottom-2 left-2">
              <div className="back-grey1 rounded-full p-1 cursor-pointer">
                <PlayCircle
                  size={20}
                  color="#ff0000"
                  onClick={() => navigate("/video")}
                />
              </div>
              <div className="back-grey1 rounded-full p-1 cursor-pointer">
                <Heart size={20} color="#ff0000" />
              </div>
              <div className="back-grey1 rounded-full p-1 cursor-pointer">
                <HeartOff size={20} color="#ff0000" />
              </div>
              <div className="back-grey1 rounded-full p-1 cursor-pointer">
                <Plus size={20} color="#ff0000" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardBody;

{
}