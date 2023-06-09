import { IconButton, CssBaseline } from "@mui/material";
import { Menu, Search, Person } from "@mui/icons-material";
import StyledComponents from "./Header.styled";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  return (
    <>
      <CssBaseline />
      <StyledComponents.Header>
        <div>
          <IconButton color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
        </div>
        <div>
          <StyledComponents.LinkBlock>
            <li>
              <StyledComponents.StyledLink
                to={"/"}
                style={{
                  color: location.pathname === "/" ? "#AAF1CF" : "",
                }}
              >
                home
              </StyledComponents.StyledLink>
            </li>
            <li>
              <StyledComponents.StyledLink to={"/discover"}   style={{
                  color: location.pathname === "/discover" ? "#AAF1CF" : "",
                }}>
                discover
              </StyledComponents.StyledLink>
            </li>
            <li>
              <StyledComponents.StyledLink to={"/favourites"}>
                favourites
              </StyledComponents.StyledLink>
            </li>
          </StyledComponents.LinkBlock>
        </div>
        <div>
          <IconButton color="inherit" aria-label="search" sx={{ mr: 2 }}>
            <Search />
          </IconButton>
          <IconButton color="inherit" aria-label="profile" sx={{ mr: 2 }}>
            <Person />
          </IconButton>
        </div>
      </StyledComponents.Header>
    </>
  );
};
