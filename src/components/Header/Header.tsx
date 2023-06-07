import { IconButton, CssBaseline } from "@mui/material";
import { Menu, Search, Person } from "@mui/icons-material";
import StyledComponents from "./Header.styled";

export const Header = () => {
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
