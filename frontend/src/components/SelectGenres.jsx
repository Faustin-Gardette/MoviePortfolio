import React from "react";
import { useDispatch } from "react-redux";
import { fetchDataByGenre } from "../store";
import { ChevronDown } from "lucide-react";

const SelectGenres = ({ genres, type, title }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-2 py-4 relative ">
      <h1 className="text-3xl font-semibold ">{title} :</h1>
      <div className="relative">
        <select
          className="text-black back-grey2 w-44 grey2 p-2 outline-none cursor-pointer appearance-none  "
          onChange={(e) => {
            dispatch(fetchDataByGenre({ genre: e.target.value, type }));
          }}
        >
          {genres.map((genre) => (
            <option value={genre.id} key={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <div className="absolute top-2 right-2 grey2 cursor-pointer ">
          <ChevronDown />
        </div>
      </div>
    </div>
  );
};

export default SelectGenres;
