import React from "react";
import Play from "./Play";

const CardHeader = ({ movie }) => {
  return (
    <div>
      <div className="hidden sm:block">
        <div className=" grid grid-cols-2 bg-black rounded-lg h-[20rem]">
          <div className="py-6 px-8 ">
            <h1 className="lg:text-2xl text-xl pb-2 font-semibold">
              {movie.name}
            </h1>
            <p className="text-sm grey2 h-48 overflow-y-scroll hide-scrollbar pb-6  ">
              {movie.overview}
            </p>
            <div className="absolute bottom-4 right-4">
              <Play />
            </div>
          </div>
          <div>
            <img
              className="h-full  rounded-r-lg object-cover  "
              src={`https://image.tmdb.org/t/p/w780${movie.image}`}
              alt={movie.name}
            />
          </div>
        </div>
      </div>
      <div className="sm:hidden relative">
        <img
          className="h-full  rounded-lg object-cover  "
          src={`https://image.tmdb.org/t/p/w780${movie.image}`}
          alt={movie.name}
        />
        <div className="absolute  bg-black bg-opacity-50 top-0 bottom-0 left-0 right-0 rounded-lg"></div>
        <div className="py-6 px-8 absolute z-20 top-0 bottom-0">
          <h1 className="lg:text-2xl text-xl pb-2  font-semibold">
            {movie.name}
          </h1>
          <p className="text-sm  h-28 overflow-y-scroll hide-scrollbar  ">
            {movie.overview}
          </p>
          <div className="absolute bottom-4 right-4">
            <Play />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
