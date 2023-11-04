import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase";

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = values;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <div>
      <div className="h-screen flex items-center justify-center ">
        <form className="back-grey2 flex flex-col gap-6 p-12 rounded-lg ">
          <h1 className="text-3xl">Connexion</h1>
          <input
            type="text"
            placeholder="Email"
            className="rounded-sm px-2 py-1 focus:outline-none grey1 "
            name="email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="rounded-sm px-2 py-1 focus:outline-none grey1 "
            name="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
          <button
            className="back-red text-white rounded-sm px-2 py-1 transition duration-200 shadow-red"
            onClick={handleSubmit}
          >
            Connexion
          </button>
          <p>
            Pas de compte ?{" "}
            <Link to="/inscription">
              <span className="red hover:underline hover:decoration-2">
                Inscription
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
