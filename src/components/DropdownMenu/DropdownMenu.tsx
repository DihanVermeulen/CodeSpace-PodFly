import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Login, Person } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks";

export const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { getSession, signOut } = useAuth();
  const session = getSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <IconButton
        id="open-menu-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Person />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "open-menu-button",
        }}
      >
        {!session && (
          <Link
            to="/signin"
            style={{
              listStyle: "none",
              textDecoration: "none",
              color: "#a1a1a1",
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <Login fontSize="small" />
              </ListItemIcon>
              <ListItemText>Sign in</ListItemText>
            </MenuItem>
          </Link>
        )}
        {session && (
          <MenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <Login fontSize="small" />
            </ListItemIcon>
            <ListItemText>Sign in</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default DropdownMenu;
