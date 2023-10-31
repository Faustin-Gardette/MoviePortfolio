import React from "react";
import { useDispatch } from "react-redux";
import { fetchDataByGenre } from "../store";

const SelectGenres = ({ genres, type }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-2  ">
      <h1 className="text-3xl font-semibold ">Films :</h1>
      <select
        className="text-black rounded-lg back-grey2 grey2 p-2 outline-none cursor-pointer"
        onChange={(e) => {
          dispatch(fetchDataByGenre({ genre: e.target.value, type }));
        }}
      >
        {genres.map((genre) => (
          <option className="rounded-lg" value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectGenres;
