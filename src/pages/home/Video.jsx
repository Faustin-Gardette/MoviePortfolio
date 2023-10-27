import React from "react";
import video from "../../../public/assets/video.mp4";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Video = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="absolute top-2 left-2 cursor-pointer z-10">
        <ArrowLeft size={40} onClick={() => navigate(-1)} />
      </div>
      <video
        src={video}
        className=" w-screen h-screen"
        autoPlay
        loop
        controls
        muted
      ></video>
    </div>
  );
};

export default Video;
