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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = values;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
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
        <form className="back-grey2 flex flex-col gap-6 p-12 rounded-lg ">
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
