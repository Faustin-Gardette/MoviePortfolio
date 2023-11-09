import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase";

const Login = () => {
  const navigate = useNavigate();

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
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
      if (err.code === "auth/user-not-found") {
        setErreurEmail("Aucun utilisateur trouvé");
      } else if (err.code === "auth/invalid-email") {
        setErreurEmail("Format d'email invalide.");
      } else if (err.code === "auth/missing-password") {
        setErreurMdp("Mot de passe vide");
      } else if (err.code === "auth/invalid-login-credentials") {
        setErreurMdp("Mot de passe incorrect");
      }

      setTimeout(() => {
        setErreurEmail("");
        setErreurMdp("");
      }, 3000);
    }
  };

  useEffect(() => {
    const connexion = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        navigate("/");
      }
    });

    return () => connexion();
  }, [navigate]);

  return (
    <div>
      <div className="h-screen flex items-center justify-center ">
        <form className="back-grey2 flex flex-col gap-4 p-12 rounded-lg ">
          <h1 className="text-3xl">Connexion</h1>
          <input
            type="text"
            placeholder="blabla@gmail.com"
            className="rounded-sm px-2 py-1 focus:outline-none grey1 "
            name="email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
          {erreurEmail && <p className=" text-red-500 ">{erreurEmail}</p>}
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
