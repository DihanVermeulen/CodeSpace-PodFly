import { CssBaseline, ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DiscoverPage, FavouritesPage, HomePage, Root } from "./pages";
import { ViewPodcast } from "./pages/ViewPodcastPage";
import { theme } from "./styles";
import { Player } from "./components/Player";

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Player />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
};

export default App;
