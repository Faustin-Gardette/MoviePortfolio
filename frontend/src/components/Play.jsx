import { PlayCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Play = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="flex items-center back-red rounded-lg px-4 py-2 transition duration-200 shadow-red "
        onClick={() => navigate("/video")}
      >
        Voir{" "}
        <span className="pl-1">
          <PlayCircle size={18} />
        </span>
      </button>
    </div>
  );
};

export default Play;
