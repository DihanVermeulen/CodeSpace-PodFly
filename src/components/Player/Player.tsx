import {
  ModalContainer,
  Header,
  PlayerContainer,
  LoadingStateContainer,
  ContentContainer,
  Image,
  Title,
  MinimisedPlayer,
  StyledSlider,
} from "./Player.styled";
import { IconButton, CircularProgress, Box, Typography } from "@mui/material";
import {
  Close,
  ArrowBack,
  PauseCircleFilled,
  PlayCircleFilled,
  ArrowDropUp,
  PlayArrow,
  Pause,
} from "@mui/icons-material";
import { usePlayer } from "../../hooks/usePlayer";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { getModalState } from "../../model";
import { DropdownMenuPlayer } from "../DropdownMenuPlayer";

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
      <ModalContainer isMaximised={isMaximised} isOpen={isOpen}>
        {modalState.isMaximised && (
          <>
            <Header>
              <IconButton onClick={handleCloseModal} style={{ zIndex: 1000 }}>
                <ArrowBack />
              </IconButton>
              <DropdownMenuPlayer />
            </Header>
          </>
        )}

        {playerData && modalState.isMaximised && (
          <>
            <ContentContainer
              display={modalState.isMaximised ? "flex" : "none"}
            >
              <Image
                width={"15rem"}
                height={"15rem"}
                marginBottom={"1rem"}
                src={playerData.image}
              />
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
              <StyledSlider
                aria-aria-label="time-indicator"
                value={currentTime}
                min={0}
                max={duration}
                step={0.1}
                onChange={handleProgressChange}
                onMouseDown={handleDragStart}
                onMouseUp={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchEnd={handleDragEnd}
                sx={{ color: "#D7A6B3", width: "80%", margin: 0, padding: 0 }}
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

        {playerData && !modalState.isMaximised && (
          <MinimisedPlayer>
            <audio ref={audioRef} src={playerData.audioSrc} />
            <Box>
              <StyledSlider
                aria-label="time-indicator"
                value={currentTime}
                min={0}
                max={duration}
                step={0.1}
                onChange={handleProgressChange as any}
                onMouseDown={handleDragStart}
                onMouseUp={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchEnd={handleDragEnd}
                sx={{
                  color: "#D7A6B3",
                  width: "100%",
                  margin: 0,
                  padding: 0,
                  position: "absolute",
                  top: 0,
                  height: "5px",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                bottom: 0,
                height: "3rem",
                padding: "1rem",
                width: "100%",
              }}
            >
              <Image
                width={"2.5rem"}
                height={"2.5rem"}
                src={playerData?.image}
              />
              <Box sx={{ marginLeft: "1rem" }}>
                <Typography>{playerData.episodeTitle}</Typography>
                <Typography color={"#a1a1a1"}>
                  Episode: {playerData.episodeNumber}
                </Typography>
              </Box>
              <IconButton
                onClick={handlePlayPause}
                size="small"
                sx={{ marginLeft: "auto" }}
              >
                {isPlaying ? (
                  <Pause sx={{ fontSize: "2rem" }} />
                ) : (
                  <PlayArrow sx={{ fontSize: "2rem" }} />
                )}
              </IconButton>
              <IconButton onClick={handleCloseModal}>
                <Close />
              </IconButton>
              <IconButton
                onClick={handleMaximiseModal}
                style={{ zIndex: 1000 }}
              >
                <ArrowDropUp fontSize="large" />
              </IconButton>
            </Box>
          </MinimisedPlayer>
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
