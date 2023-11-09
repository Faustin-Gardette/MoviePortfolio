import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [erreurEmail, setErreurEmail] = useState("");
  const [erreurMdp, setErreurMdp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = values;

    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setErreurEmail("Format d'email invalide.");
      } else if (err.code === "auth/missing-password") {
        setErreurMdp("Mot de passe vide");
      } else if (err.code === "auth/weak-password") {
        setErreurMdp("Mot de passe vide");
      }
      setTimeout(() => {
        setErreurEmail("");
        setErreurMdp("");
      }, 3000);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const connection = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        navigate("/");
      }
    });

    return () => connection();
  }, [navigate]);

  return (
    <div>
      <div className="h-screen flex items-center justify-center ">
        <form className="back-grey2 flex flex-col gap-4 p-12 rounded-lg ">
          <h1 className="text-3xl">Inscription</h1>
          <input
            type="text"
            placeholder="blabla@gmail.com"
            className="rounded-sm px-2 py-1 focus:outline-none grey1  "
            name="email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
          {erreurEmail && <p className="text-red-500">{erreurEmail}</p>}

          <input
            type="password"
            placeholder="Mot de passe"
            className="rounded-sm px-2 py-1 focus:outline-none grey1 "
            name="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
          {erreurMdp && <p className=" text-red-500 ">{erreurMdp}</p>}
          <button
            className="back-red text-white rounded-sm px-2 py-1 transition duration-200 shadow-red"
            onClick={handleSubmit}
          >
            Inscription
          </button>
          <p>
            Déjà Inscrit ?{" "}
            <Link to="/connexion">
              <span className="red hover:underline hover:decoration-2">
                Connexion
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
