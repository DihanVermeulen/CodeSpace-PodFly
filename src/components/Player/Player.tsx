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
import {
  createFavouritesActions,
  getAuthState,
  getModalState,
} from "../../model";
import { DropdownMenuPlayer } from "../Dropdowns";
import { addEpisodeToFavourites } from "../../utils/helpers";
import { useEffect } from "react";

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
    setIsPlaying,
  } = useAudioPlayer();
  const { session } = getAuthState();

  const modalState = getModalState();
  const isOpen = modalState.isOpen;
  const isMaximised = modalState.isMaximised;
  const playerData = modalState.data;
  const favouritesActions = createFavouritesActions();

  /**
   * Handles adding episode to favourites table
   * @returns
   */
  const handleAddEpisodetoFavourites = () => {
    if (!session) throw new Error("No user is logged in");
    if (!playerData) return;

    addEpisodeToFavourites({
      episodeNumber: playerData.episodeNumber,
      seasonNumber: playerData.season,
      userID: session.user.id,
      showID: playerData.podcast,
    })
      .then(() => {
        favouritesActions.getFavourites();
      })
      .catch(() => {
        throw new Error("Error with adding episode to favourites");
      });
  };

  /* Checks if the episode has played before and sets the audio's
   * current time to that time, or else it is set to 0.
   */
  useEffect(() => {
    if (playerData && audioRef.current) {
      /** Gets the initial time in local storage if it has been listened to */
      const handleGetInitialTime = () => {
        const { podcast, episodeNumber, season } = playerData;
        const playingData = localStorage.getItem("playing") || "{}";
        const parsedPlayingData = JSON.parse(playingData);

        if (
          parsedPlayingData[podcast] &&
          parsedPlayingData[podcast][season] &&
          parsedPlayingData[podcast][season][episodeNumber]
        ) {
          const initialTime =
            parsedPlayingData[podcast][season][episodeNumber].time;
          return initialTime;
        }
        return null;
      };

      setIsPlaying(false);
      audioRef.current.pause();
      const initialTime = handleGetInitialTime();
      if (initialTime) {
        audioRef.current.currentTime = JSON.parse(initialTime);
      } else {
        audioRef.current.currentTime = 0;
      }
      audioRef.current.src = playerData.audioSrc;
      setIsPlaying(true);
      audioRef.current.play();
    }
  }, [playerData]);

  // Sets the current time the audio is playing at inside the local storage
  useEffect(() => {
    if (playerData) {
      let timeoutId: NodeJS.Timeout;

      /** Saves the current time that the audio player is at to local storage */
      const saveCurrentTime = () => {
        const playingData = localStorage.getItem("playing") || "{}";
        const parsedPlayingData = JSON.parse(playingData);

        const { podcast, season, episodeNumber } = playerData;
        const updatedPlayingData = {
          ...parsedPlayingData,
          [podcast]: {
            ...(parsedPlayingData[podcast] || {}),
            [season]: {
              ...(parsedPlayingData[podcast]?.[season] || {}),
              [episodeNumber]: {
                time: currentTime,
                duration:
                  parsedPlayingData[podcast]?.[season]?.[episodeNumber]
                    ?.duration || audioRef.current?.duration,
              },
            },
          },
        };

        localStorage.setItem("playing", JSON.stringify(updatedPlayingData));
      };

      // const debounceSaveCurrentTime = () => {
      //   clearTimeout(timeoutId);
      //   timeoutId = setTimeout(saveCurrentTime, 5000);
      // };

      // debounceSaveCurrentTime();
      saveCurrentTime();
      return () => {
        saveCurrentTime();
        clearTimeout(timeoutId);
      };
    }
  }, [currentTime]);

  return (
    <>
      {playerData && <audio ref={audioRef} src={playerData.audioSrc} />}
      <ModalContainer isMaximised={isMaximised} isOpen={isOpen}>
        {modalState.isMaximised && (
          <>
            <Header>
              <IconButton onClick={handleCloseModal} style={{ zIndex: 1000 }}>
                <ArrowBack />
              </IconButton>
              Now listening
              <DropdownMenuPlayer
                addToFavourites={handleAddEpisodetoFavourites}
              />
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
              <StyledSlider
                aria-label="time-indicator"
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

        <MinimisedPlayer display={!modalState.isMaximised ? "block" : "none"}>
          <Box
            sx={{
              height: "1rem",
              display: "flex",
              alignItems: "center",
              paddingTop: "1rem",
              // backgroundColor: "blue",
            }}
          >
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
            <Image width={"2.5rem"} height={"2.5rem"} src={playerData?.image} />
            <Box sx={{ marginLeft: "1rem" }}>
              <Typography fontSize="12px" component="h1">
                {playerData?.episodeTitle}
              </Typography>
              <Typography
                fontSize="10px"
                variant="caption"
                component="h1"
                color={"#a1a1a1"}
              >
                Episode: {playerData?.episodeNumber}
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
            <IconButton onClick={handleMaximiseModal} style={{ zIndex: 1000 }}>
              <ArrowDropUp fontSize="large" />
            </IconButton>
          </Box>
        </MinimisedPlayer>

        {!playerData && (
          <LoadingStateContainer sx={{ display: "flex" }}>
            <CircularProgress variant="indeterminate" />
          </LoadingStateContainer>
        )}
      </ModalContainer>
    </>
  );
};
