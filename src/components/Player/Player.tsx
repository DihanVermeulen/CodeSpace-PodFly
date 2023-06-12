import { ModalContainer } from "./Player.styled";
import { useEffectOnce } from "react-use";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { createModalActions } from "../../model";
import { getModalState } from "../../model";

export const Player = () => {
  const modalState = getModalState();
  const modalActions = createModalActions();
  const isOpen = modalState.isOpen;

  // const isLoading = useStore(store, (state) => state.isLoading);l
  // const modalData = useStore(store, (state) => state.modalData);

  const handleOpenModal = () => {
    modalActions.openModal();
  };

  useEffectOnce(() => {
    handleOpenModal();
  });

  const handleCloseModal = () => {
    modalActions.closeModal();
  };

  return (
    <>
      <ModalContainer isOpen={isOpen}>
        <IconButton onClick={handleCloseModal}>
          <Close />
        </IconButton>
      </ModalContainer>
    </>
  );
};
