import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/server/user", UserRoutes);

mongoose.connect(
  "mongodb+srv://faustin:founex250697@movieappportfolio.teuaavg.mongodb.net/"
);

app.listen(5000, console.log("Server co :)"));
