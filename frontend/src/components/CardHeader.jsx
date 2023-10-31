import React from "react";
import Play from "./Play";

const CardHeader = ({ movie }) => {
  return (
    <div className="grid grid-cols-2 bg-black rounded-lg h-[20rem] ">
      <div className="py-6 px-8 grid grid-row-6">
        <h1 className=" text-3xl row-span-1 font-semibold  ">{movie.name}</h1>
        <p className=" row-span-4 text-sm grey2 ">{movie.overview}</p>
        <div className="row-span-1 justify-self-end  ">
          <Play />
        </div>
      </div>
      <div>
        <img
          className="rounded-r-lg h-full object-cover "
          src={`https://image.tmdb.org/t/p/w780${movie.image}`}
          alt={movie.name}
        />
      </div>
    </div>
  );
};

export default CardHeader;
