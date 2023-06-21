import { MoreVert, BookmarkAdd, Share } from "@mui/icons-material";
import { useState, MouseEvent } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { shareContent } from "../../../utils/helpers";

export type DropdownMenuPlayer = {
  addToFavourites: () => void;
};

export const DropdownMenuPlayer = (props: DropdownMenuPlayer) => {
  const { addToFavourites } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="open-menu-player-button"
        aria-controls={isMenuOpen ? "menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? "true" : undefined}
        onClick={handleOpenMenu}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "open-menu-player-button",
        }}
      >
        <MenuItem onClick={addToFavourites}>
          <ListItemIcon>
            <BookmarkAdd fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add to favourites</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() =>
            shareContent(
              "PodFly",
              "Check out this episode on PodFly!",
              window.location.href
            )
          }
        >
          <ListItemIcon>
            <Share fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default DropdownMenuPlayer;
