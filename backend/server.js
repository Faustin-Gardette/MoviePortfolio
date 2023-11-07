import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/server/user", UserRoutes);

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/`;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB co :)"))
  .catch((err) => console.error("MongoDB Err:", err));

app.listen(5000, console.log("Server co :)"));
