import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DiscoverPage, FavouritesPage, HomePage, Root } from "./pages";
import { ViewPodcastPage } from "./pages/ViewPodcastPage";
import { theme } from "./styles";
import { Player } from "./components/Player";
import { ListenPage } from "./pages/ListenPage";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Player />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/favourites" element={<FavouritesPage />} />
              <Route path="/discover" element={<DiscoverPage />} />
            </Route>
            <Route path="/view/:id" element={<ViewPodcastPage />} />
            <Route path="/listen/:id" element={<ListenPage />} />
          </Routes>
        </BrowserRouter>
        {/* <RouterProvider router={router} /> */}
      </ThemeProvider>
    </>
  );
};

export default App;
