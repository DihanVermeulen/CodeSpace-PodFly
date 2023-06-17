import { ChangeEvent, useState, FormEvent, FocusEvent } from "react";
import { Modal } from "@mui/material";
import { IconButton, FormControl, OutlinedInput } from "@mui/material";
import { Search } from "@mui/icons-material";
import { StyledModal } from "./Search.styled";
import { useNavigate } from "react-router-dom";

export const SearchModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleClose = (event: FocusEvent<HTMLInputElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isOpen) setIsOpen(false);
    navigate(`/discover?search=${query}`);
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
          <form onSubmit={handleSearch}>
            <FormControl onBlur={handleClose}>
              <OutlinedInput
                value={query}
                sx={{ outlineColor: "#fff", color: "#ffffff" }}
                name="search"
                size="small"
                onChange={handleQueryChange}
                endAdornment={
                  <IconButton type="submit">
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
