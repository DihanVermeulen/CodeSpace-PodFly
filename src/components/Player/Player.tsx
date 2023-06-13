import { ModalContainer } from "./Player.styled";
import { IconButton } from "@mui/material";
import { Close, ArrowBack } from "@mui/icons-material";
import { usePlayer } from "../../hooks/usePlayer";

export const Player = () => {
  const { modalState, handleCloseModal, handleMaximiseModal } = usePlayer();

  const isOpen = modalState.isOpen;
  const isMaximised = modalState.isMaximised;
  const playerData = modalState.data;

  return (
    <>
      <ModalContainer
        onClick={
          !modalState.isMaximised
            ? () => {
                handleMaximiseModal();
              }
            : () => {}
        }
        isMaximised={isMaximised ? true : false}
        isOpen={isOpen}
      >
        {modalState.isMaximised ? (
          <IconButton onClick={handleCloseModal} style={{ zIndex: 1000 }}>
            <ArrowBack />
          </IconButton>
        ) : (
          <IconButton onClick={handleCloseModal} style={{ zIndex: 1000 }}>
            <Close />
          </IconButton>
        )}
        {playerData ? <audio src={playerData.audioSrc} /> : <audio />}
      </ModalContainer>
    </>
  );
};
