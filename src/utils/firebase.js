import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRpC6Q5dVechhpUcso4q9T3q9AZoKkiGs",
  authDomain: "movieportfolio-1ae85.firebaseapp.com",
  projectId: "movieportfolio-1ae85",
  storageBucket: "movieportfolio-1ae85.appspot.com",
  messagingSenderId: "286814717701",
  appId: "1:286814717701:web:791cbe6684bb7a94fa196c",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
