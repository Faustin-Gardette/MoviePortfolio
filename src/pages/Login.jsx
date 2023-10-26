import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="back-primary">
      <div className="h-screen flex items-center justify-center ">
        <div className="back-secondary flex flex-col gap-6 p-12 rounded-lg">
          <h1 className="text-3xl">Connexion</h1>
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
            Connexion
          </button>
          <p>
            Pas de compte ?{" "}
            <Link to="/inscription">
              <span className="color-red hover:underline hover:decoration-2">
                Inscription
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
