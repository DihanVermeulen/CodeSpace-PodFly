import { ModalContainer, Header, PlayerContainer } from "./Player.styled";
import { IconButton, Box, Slider } from "@mui/material";
import {
  Close,
  ArrowBack,
  PauseCircleFilled,
  PlayCircleFilled,
} from "@mui/icons-material";
import { usePlayer } from "../../hooks/usePlayer";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";

export const Player = () => {
  const { modalState, handleCloseModal, handleMaximiseModal } = usePlayer();
  const {
    audioRef,
    currentTime,
    duration,
    isPlaying,
    handleProgressChange,
    handleDragStart,
    handleDragEnd,
    handlePlayPause,
  } = useAudioPlayer();

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
        disableScrollLock
      >
        <Header>
          {modalState.isMaximised ? (
            <IconButton onClick={handleCloseModal} style={{ zIndex: 1000 }}>
              <ArrowBack />
            </IconButton>
          ) : (
            <IconButton onClick={handleCloseModal} style={{ zIndex: 1000 }}>
              <Close />
            </IconButton>
          )}
        </Header>
        <PlayerContainer>
          {playerData && <audio ref={audioRef} src={playerData.audioSrc} />}
          <Slider
            value={currentTime}
            min={0}
            max={duration}
            step={0.1}
            onChange={handleProgressChange as any}
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
            sx={{ color: "#D7A6B3", width: "80%" }}
          />
          <IconButton onClick={handlePlayPause} size="large">
            {isPlaying ? (
              <PauseCircleFilled sx={{ fontSize: "4rem", color: "#AAF1CF" }} />
            ) : (
              <PlayCircleFilled sx={{ fontSize: "4rem", color: "#AAF1CF" }} />
            )}
          </IconButton>
        </PlayerContainer>
      </ModalContainer>
    </>
  );
};
