import { onAuthStateChanged, signOut } from "firebase/auth";
import { LogOut, Search } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase";

const Navbar = () => {
  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/connexion");
  });

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center transition-all  shadow-grey shadow-grey-hover px-4 py-2 rounded-lg">
        <input
          type="text"
          placeholder="Rechercher"
          className="text-white back-grey1 outline-none"
        />
        <button className="grey2 pl-2">
          <Search size={20} />
        </button>
      </div>
      <ul className="flex gap-4">
        <Link to="/">
          <li>Accueil</li>
        </Link>
        <Link to="/tv">
          <li>Séries télé</li>
        </Link>
        <Link to="/films">
          <li>Films</li>
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
