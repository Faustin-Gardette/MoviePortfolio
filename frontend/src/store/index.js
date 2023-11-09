import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const tmbdUrl = import.meta.env.VITE_TMBD_BASE_URL;

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
  likedMovies: [],
};

export const getGenres = createAsyncThunk("movieApp/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    `${tmbdUrl}/genre/movie/list?api_key=${apiKey}&language=fr-FR`
  );
  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        overview: movie.overview,
        genres: movieGenres.slice(0, 3),
      });
  });
};

const getRawData = async (api, genres, paging) => {
  const moviesArray = [];

  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchMovies = createAsyncThunk(
  "movieApp/trending",
  async ({ type }, thunkApi) => {
    const {
      movieApp: { genres },
    } = thunkApi.getState();
    return getRawData(
      `${tmbdUrl}/trending/${type}/week?api_key=${apiKey}&language=fr-FR`,
      genres,
      true
    );
  }
);

export const getUserLikedMovies = createAsyncThunk(
  "movieApp/getLiked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`http://localhost:5000/server/user/liked/${email}`);
    return movies;
  }
);

export const removeFromLikedMovies = createAsyncThunk(
  "movieApp/deleteLiked",
  async ({ movieId, email }) => {
    const {
      data: { movies },
    } = await axios.put(`http://localhost:5000/server/user/delete`, {
      email,
      movieId,
    });
    return movies;
  }
);

export const fetchDataByGenre = createAsyncThunk(
  "movieApp/genre",
  async ({ genre, type }, thunkApi) => {
    const {
      movieApp: { genres },
    } = thunkApi.getState();
    return getRawData(
      `${tmbdUrl}/discover/${type}?api_key=${apiKey}&with_genres=${genre}&language=fr-FR`,
      genres
    );
  }
);

const appSlice = createSlice({
  name: "MovieApp",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
      state.likedMovies = action.payload;
    });
    builder.addCase(removeFromLikedMovies.fulfilled, (state, action) => {
      state.likedMovies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    movieApp: appSlice.reducer,
  },
});
