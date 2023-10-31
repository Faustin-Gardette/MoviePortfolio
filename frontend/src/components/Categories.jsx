import React from "react";
import SliderBody from "./SliderBody";

const Categories = ({ movies }) => {
  const getMoviesFromRange = (start, end) => {
    return movies.slice(start, end);
  };

  return (
    <div>
      <SliderBody data={getMoviesFromRange(0, 10)} title={"Tendance"} />
      <SliderBody
        data={getMoviesFromRange(10, 20)}
        title={"Nouvelle sorties"}
      />
      <SliderBody data={getMoviesFromRange(20, 30)} title={"BlockBuster"} />
      <SliderBody data={getMoviesFromRange(30, 40)} title={"Populaire"} />
      <SliderBody data={getMoviesFromRange(40, 50)} title={"À voir"} />
      <SliderBody data={getMoviesFromRange(50, 60)} title={"Épic"} />
    </div>
  );
};

export default Categories;
