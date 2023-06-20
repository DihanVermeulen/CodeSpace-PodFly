import styled from "@emotion/styled";
import { Typography, Skeleton, Stack, Box } from "@mui/material";
import { Carousel } from "../../components/Carousel";
import { useState, useEffect } from "react";
import { PodcastPreview } from "../../@types/podcast";
import utilsStyles from "../../styles/utils.styles";
import { store } from "../../model";
import { useStore } from "zustand";
import { ViewList } from "../../components/ViewList";
import { useAuth } from "../../hooks";
import { PreviouslyListenedList } from "../../components/PreviouslyListenedList";
import { fetchIndividualPodcast } from "../../utils/helpers";

const Text = styled(Typography)<{ as: string }>`
  font-family: "Poppins", sans-serif;
`;

export const HomePage = () => {
  const podcasts: PodcastPreview[] = useStore(store, (state) => state.list);
  const [phase, setPhase] = useState("LOADING");
  const { getSession } = useAuth();
  const session = getSession();
  const [
    previouslyPlayedEpisodesFromLocalStorage,
    _setPreviouslyPlayedEpisodesFromLocalStorage,
  ] = useState(JSON.parse(localStorage.getItem("playing") || "{}"));
  const [previouslyListenedToEpisodes, setPreviouslyListenedToEpisodes] =
    useState<any[] | null>(null);

  useEffect(() => {
    if (podcasts.length > 0) {
      setPhase("LISTING");
    }
  }, [podcasts]);

  useEffect(() => {
    const createPreviouslyListenedToEpisodes = async () => {
      if (previouslyPlayedEpisodesFromLocalStorage) {
        const episodesArray = Object.keys(
          previouslyPlayedEpisodesFromLocalStorage
        ).flatMap(async (podcast) => {
          const response = await fetchIndividualPodcast(podcast);
          if (!(response instanceof Error)) {
            return Object.keys(
              previouslyPlayedEpisodesFromLocalStorage[podcast]
            ).flatMap((season) => {
              return Object.keys(
                previouslyPlayedEpisodesFromLocalStorage[podcast][season]
              ).map((episode) => {
                return {
                  podcastID: podcast,
                  podcastTitle: response.title,
                  seasonNumber: season,
                  episodeNumber: episode,
                  image: response.image,
                  time: previouslyPlayedEpisodesFromLocalStorage[podcast][
                    season
                  ][episode].time,
                };
              });
            });
          }
          return [];
        });
        const flattenedEpisodesArray = await Promise.all(episodesArray).then(
          (results) => results.flat()
        );
        setPreviouslyListenedToEpisodes(flattenedEpisodesArray);
      }
    };

    createPreviouslyListenedToEpisodes();
  }, []);

  return (
    <>
      <Space height={"4rem"} />
      <Box marginLeft={"0.6rem"}>
        <Text variant="body1" as="p" fontWeight={300}>
          Hi, {session?.user.email ? session.user.email.split("@")[0] : "guest"}
        </Text>
        <Text variant="h5" as="h2" fontWeight={600}>
          This week's hottest
        </Text>
      </Box>

      {phase === "LISTING" && <Carousel data={podcasts.slice(0, 3)}></Carousel>}
      {phase === "LOADING" && (
        <Stack
          direction={"row"}
          spacing={"10px"}
          paddingTop={"0.3rem"}
          paddingBottom={"0.6rem"}
          marginLeft={"1rem"}
          sx={{ overflowX: "auto" }}
        >
          <Skeleton
            variant="rounded"
            style={{
              minWidth: "300px",
              height: "200px",
              borderRadius: "20px",
            }}
          />
          <Skeleton
            variant="rounded"
            style={{
              minWidth: "300px",
              height: "200px",
              borderRadius: "20px",
            }}
          />
          <Skeleton
            variant="rounded"
            style={{
              minWidth: "300px",
              height: "200px",
              borderRadius: "20px",
            }}
          />
        </Stack>
      )}
      <Space height={"2rem"} />
      <Box padding={2}>
        <ViewList data={podcasts} />
      </Box>
    </>
  );
};
