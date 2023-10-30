import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Tv from "./pages/home/Tv";
import Movies from "./pages/home/Movies";
import List from "./pages/home/List";
import Navbar from "./components/Navbar";
import Video from "./pages/home/Video";

const Layout = () => {
  return (
    // Element left pour modifier style film
    <>
      <nav className="m-8">
        <Navbar />
      </nav>
      <main className="m-8">
        <Outlet />
      </main>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/tv",
        element: <Tv />,
      },
      {
        path: "/films",
        element: <Movies />,
      },
      {
        path: "/liste",
        element: <List />,
      },
    ],
  },
  {
    path: "/connexion",
    element: <Login />,
  },
  {
    path: "/inscription",
    element: <Signup />,
  },
  {
    path: "/video",
    element: <Video />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
