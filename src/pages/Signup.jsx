import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="back-primary">
      <div className="h-screen flex items-center justify-center ">
        <div className="back-secondary flex flex-col gap-6 p-12 rounded-lg">
          <h1 className="text-3xl">Inscription</h1>
          <input
            type="text"
            placeholder="Email"
            className="rounded-sm px-2 py-1 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="rounded-sm px-2 py-1 focus:outline-none"
          />
          <button className="back-button text-white rounded-sm px-2 py-1 transition duration-200  shadow-red">
            Inscription
          </button>
          <p>
            Déjà Inscrit ?{" "}
            <Link to="/connexion">
              <span className="color-red hover:underline hover:decoration-2">
                Connexion
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
