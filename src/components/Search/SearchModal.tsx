import { ChangeEvent, useRef, useState, useEffect } from "react";
import { Box, Modal } from "@mui/material";
import {
  IconButton,
  FormControl,
  TextField,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { StyledModal } from "./Search.styled";

export const SearchModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleSearch = (event: SubmitEvent) => {
    event.preventDefault();
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="search"
        sx={{ mr: 1 }}
        onClick={handleOpen}
      >
        <Search />
      </IconButton>
      <Modal open={isOpen} onClose={handleClose}>
        <StyledModal>
          <form>
            <FormControl>
              <OutlinedInput
                value={query}
                sx={{ outlineColor: "#fff", color: "#ffffff" }}
                name="search"
                size="small"
                onBlur={handleClose}
                onChange={handleQueryChange}
                endAdornment={
                  <IconButton>
                    <Search sx={{ color: "#ffffff" }} />
                  </IconButton>
                }
              />
            </FormControl>
          </form>
        </StyledModal>
      </Modal>
    </>
  );
};
