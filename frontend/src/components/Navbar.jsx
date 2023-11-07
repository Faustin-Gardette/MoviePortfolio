import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="">
        <h1 className=" text-xl sm:text-3xl font-semibold ">
          Movie <span className="red">App</span>
        </h1>
      </div>
      <ul className="flex gap-4 text-sm sm:text-base">
        <Link to="/">
          <li>Accueil</li>
        </Link>
        <Link to="/films">
          <li>Films</li>
        </Link>
        <Link to="/tv">
          <li>Séries télé</li>
        </Link>
        <Link to="/liste">
          <li>Ma liste</li>
        </Link>
        <li onClick={() => signOut(firebaseAuth)}>
          <LogOut color="#ff0000" />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
