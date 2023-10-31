import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import CardBody from "./CardBody";

const SliderBody = ({ data, title }) => {
  return (
    <div className="py-6">
      <h1 className="text-3xl pb-4 font-semibold ">{title}</h1>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        loop={true}
        navigation={true}
        modules={[Navigation]}
      >
        {data.map((movie, index) => (
          <SwiperSlide key={index}>
            <CardBody movieData={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderBody;
