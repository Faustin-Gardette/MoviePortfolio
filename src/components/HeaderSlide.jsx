import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import CardHeader from "./CardHeader";

const HeaderSlide = ({ movies }) => {
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
      >
        {movies.slice(0, 10).map((movie, index) => (
          <SwiperSlide key={index} style={{ width: "70%" }}>
            <CardHeader movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HeaderSlide;
