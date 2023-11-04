import {
  addLikedMovies,
  getLikedMovies,
  removeFromLikedMovies,
} from "../controllers/UserController.js";
import express from "express";

const router = express.Router();

router.post("/add", addLikedMovies);
router.get("/liked/:email", getLikedMovies);
router.put("/delete", removeFromLikedMovies);

export default router;
