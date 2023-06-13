import { ModalContainer } from "./Player.styled";
import { IconButton } from "@mui/material";
import { Close, ArrowBack } from "@mui/icons-material";
import { createModalActions } from "../../model";
import { getModalState } from "../../model";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Player = () => {
  const modalState = getModalState();
  const modalActions = createModalActions();
  const isOpen = modalState.isOpen;
  const isMaximised = modalState.isMaximised;
  const playerData = modalState.data;
  const location = useLocation();
  const navigate = useNavigate();
  const modalPhase = modalState.phase;

  useEffect(() => {
    if (location.pathname.startsWith("/listen")) {
      modalActions.maximiseModal();
    } else {
      modalActions.minimiseModal();
    }
  }, [location]);

  const handleCloseModal = () => {
    setTimeout(() => {
      if (modalState.isMaximised) {
        navigate(-1);
      } else {
        modalActions.closeModal();
      }
    }, 0);
  };

  const handleMaximiseModal = () => {
    console.log("Maximising modal");
    navigate(`/listen?showId=`, {
      state: { background: location },
    });
    modalActions.maximiseModal();
  };

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
      </ModalContainer>
    </>
  );
};
