import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { DiscoverPage, FavouritesPage, HomePage, Root } from "./pages";
import { ViewPodcastPage } from "./pages/ViewPodcastPage";
import { theme } from "./styles";
import { Player } from "./components/Player";

const RouterContent = () => {
  const location = useLocation();

  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
        </Route>
        <Route path="/view/:id" element={<ViewPodcastPage />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Player />
          <RouterContent />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
