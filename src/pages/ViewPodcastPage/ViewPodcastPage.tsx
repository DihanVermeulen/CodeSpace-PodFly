import {
  Box,
  Typography,
  Grid,
  Skeleton,
  MenuItem,
  FormControl,
  Select,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { createApi } from "../../api";
import { useEffect, useState } from "react";
import {
  IndividualPodcast,
  IndividualPodcastSeason,
} from "../../@types/podcast";
import { useStore } from "zustand";
import { store } from "../../model";
import StyledComponents from "./ViewPodcastPage.styled";
import { ViewList } from "../../components/ViewList";
const { ReadMoreButton, CenteredGrid, StyledImage, Title, Header } =
  StyledComponents;

const api = createApi();

export const ViewPodcastPage = () => {
  const { id } = useParams<{ id: string }>();
  const [podcasts, setPodcasts] = useState<IndividualPodcast | null>(null);
  const [readMore, setReadMore] = useState<boolean>(false);
  const [selectedSeason, setSelectedSeason] =
    useState<IndividualPodcastSeason>();
  const podcastPreviews = useStore(store, (state) => state.list);
  const active = podcastPreviews.find(
    ({ id: currentId }) => typeof id !== "undefined" && currentId === id
  );
  const navigate = useNavigate();

  useEffect(() => {
    const handleFetchIndividualPodcast = async () => {
      if (id)
        try {
          const data = await api.getIndividualPodcastList(id);
          if (!(data instanceof Error)) {
            setPodcasts(data);
            setSelectedSeason(data.seasons[0]);
          }
        } catch (error) {
          console.error("Error fetching individual podcast:", error);
        }
    };

    handleFetchIndividualPodcast();
  }, [id]);

  const handleSetSelectedSeason = (event: { target: { value: any } }) => {
    const value = event.target.value;
    const season = podcasts?.seasons.find((season) => season.season === value);
    setSelectedSeason(season);
  };

  return (
    <>
      <Box>
        <Header>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
        </Header>
        {active ? (
          <>
            <Grid container columns={2} spacing={2} height={200}>
              <Grid
                item
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                xs={1}
              >
                <StyledImage src={active.image} />
              </Grid>
              <CenteredGrid item xs={1}>
                <Title
                  fontSize={18}
                  variant="h1"
                  sx={{ lineBreak: 2 }}
                  fontFamily={"Poppins"}
                >
                  {active.title}
                </Title>
              </CenteredGrid>
            </Grid>
            <Box padding={2}>
              <Typography
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  textAlign: "center",
                  overflow: "hidden",
                  WebkitLineClamp: readMore ? "" : 3,
                  textOverflow: "ellipsis",
                  color: "#a1a1a1",
                }}
              >
                {active.description}{" "}
              </Typography>
              <ReadMoreButton onClick={() => setReadMore(!readMore)}>
                {readMore ? "Read Less" : "Read More"}
              </ReadMoreButton>
            </Box>
          </>
        ) : (
          <>
            <Grid container columns={2} spacing={2}>
              <Grid
                item
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                xs={1}
              >
                <Skeleton
                  variant="rectangular"
                  sx={{ borderRadius: "20px" }}
                  width={"10rem"}
                  height={"10rem"}
                />
              </Grid>
              <Grid
                item
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                xs={1}
              >
                <Skeleton width={160} height={30} />
                <Skeleton width={120} height={30} />
              </Grid>
            </Grid>
            <Box
              padding={2}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Skeleton width={"80%"} />
              <Skeleton width={"90%"} />
              <Skeleton width={"70%"} />
            </Box>
          </>
        )}

        <Box>
          <Box display={"flex"} alignItems={"center"}>
            <Typography
              fontFamily={"Poppins"}
              fontWeight={600}
              variant="body1"
              marginRight={1}
              marginLeft={1}
            >
              Season
            </Typography>
            <FormControl size="small">
              {podcasts && selectedSeason && (
                <Select
                  value={selectedSeason.season}
                  onChange={handleSetSelectedSeason}
                  defaultValue={1}
                  sx={{ border: "none", outline: "none" }}
                >
                  {podcasts.seasons.map((item) => (
                    <MenuItem key={item.season} value={item.season}>
                      {item.season}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
          </Box>
        </Box>
        {podcasts && selectedSeason && (
          <ViewList
            viewEpisodes
            data={{
              episodes: [...selectedSeason.episodes],
              podcastId: podcasts.id,
              season: selectedSeason.season,
            }}
          />
        )}
      </Box>
    </>
  );
};
