import {
  ModalContainer,
  Header,
  PlayerContainer,
  LoadingStateContainer,
  ContentContainer,
  Image,
  Title,
} from "./Player.styled";
import { IconButton, Slider, CircularProgress } from "@mui/material";
import {
  Close,
  ArrowBack,
  PauseCircleFilled,
  PlayCircleFilled,
} from "@mui/icons-material";
import { usePlayer } from "../../hooks/usePlayer";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { getModalState } from "../../model";

export const Player = () => {
  const { handleCloseModal, handleMaximiseModal } = usePlayer();
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

  const modalState = getModalState();
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
        isMaximised={isMaximised}
        isOpen={isOpen}
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

        {playerData && (
          <>
            <ContentContainer>
              <Image src={playerData.image} />
              <Title as="h1">{playerData.episodeTitle}</Title>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontFamily: "Poppins",
                  color: "#A1A1A1",
                }}
              >
                Episode: {playerData.episodeNumber}
              </p>
            </ContentContainer>
            <PlayerContainer>
              <audio ref={audioRef} src={playerData.audioSrc} />
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
                  <PauseCircleFilled
                    sx={{ fontSize: "4rem", color: "#AAF1CF" }}
                  />
                ) : (
                  <PlayCircleFilled
                    sx={{ fontSize: "4rem", color: "#AAF1CF" }}
                  />
                )}
              </IconButton>
            </PlayerContainer>
          </>
        )}

        {!playerData && (
          <LoadingStateContainer sx={{ display: "flex" }}>
            <CircularProgress variant="indeterminate" />
          </LoadingStateContainer>
        )}
      </ModalContainer>
    </>
  );
};
