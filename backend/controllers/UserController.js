import User from "../models/Usermodel.js";

export const addLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyliked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyliked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Film ajouté à la liste" });
    } else await User.create({ email, likedMovies: [data] });
  } catch (err) {
    return res.json({ msg: "Erreur ajout film" });
  }
};

export const getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.likedMovies });
    } else return res.json({ msg: "Email pas trouvé" });
  } catch (error) {
    return res.json({ msg: "Pas fetch films" });
  }
};

export const removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.likedMovies;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (movieIndex === -1) {
        return res.status(400).send({ msg: "Film pas trouvé" });
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Film supprimé", movies });
    } else {
      return res.json({ msg: "Email pas trouvé" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Arrive pas à sup" });
  }
};
