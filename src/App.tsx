import { CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DiscoverPage, FavouritesPage, HomePage, Root } from "./pages";
import { ViewPodcast } from "./components/ViewPodcast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/discover",
        element: <DiscoverPage />,
      },
      {
        path: "/favourites",
        element: <FavouritesPage />,
      },
    ],
  },
  {
    path: "/view/:id",
    element: <ViewPodcast />,
  },
]);

const App = () => {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
