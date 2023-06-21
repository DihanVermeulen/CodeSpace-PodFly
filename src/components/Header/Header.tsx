import { IconButton, CssBaseline, Box } from "@mui/material";
import { Menu } from "@mui/icons-material";
import StyledComponents from "./Header.styled";
import { useLocation } from "react-router-dom";
import { SearchModal } from "../Search";
import { DropdownMenuHeader } from "../DropdownMenuHeader";

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
              <StyledComponents.StyledLink
                to={"/discover"}
                style={{
                  color: location.pathname === "/discover" ? "#AAF1CF" : "",
                }}
              >
                discover
              </StyledComponents.StyledLink>
            </li>
            <li>
              <StyledComponents.StyledLink
                to={"/favourites"}
                style={{
                  color: location.pathname === "/favourites" ? "#AAF1CF" : "",
                }}
              >
                favourites
              </StyledComponents.StyledLink>
            </li>
          </StyledComponents.LinkBlock>
        </div>
        <Box display={"flex"}>
          <SearchModal />
          <DropdownMenuHeader />
        </Box>
      </StyledComponents.Header>
    </>
  );
};
