import { Play } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button className="flex items-center" onClick={() => navigate("/video")}>
        Voir <Play size={20} />
      </button>
    </div>
  );
};

export default Home;
