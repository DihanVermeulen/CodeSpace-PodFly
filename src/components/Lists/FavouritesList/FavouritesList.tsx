import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  IndividualPodcast,
  IndividualPodcastEpisode,
  IndividualPodcastSeason,
} from "../../../@types/podcast";
import {
  BookmarkRemove,
  ExpandMore,
  PlayArrow,
  Share,
} from "@mui/icons-material";
import {
  removeEpisodeFromFavourites,
  shareContent,
} from "../../../utils/helpers";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { createFavouritesActions } from "../../../model";
import { useAuth } from "../../../hooks";
import { PrimaryAccordion } from "./FavouritesList.styled";

export type FavouritesList = {
  data: IndividualPodcast[];
};

export const FavouritesList = (props: FavouritesList) => {
  const { data } = props;
  const navigate = useNavigate();
  const favouritesActions = createFavouritesActions();
  const { getSession } = useAuth();
  const session = getSession();

  const handleNavigatetoPlayer = (
    showID: string,
    episodeNumber: number,
    seasonNumber: number
  ) => {
    navigate(
      `/listen?podcast=${showID}&season=${seasonNumber}&episode=${episodeNumber}`
    );
  };

  const handleRemoveEpisodeFromFavourites = (episodeID: string) => {
    const userID = session?.user.id;
    if (userID)
      removeEpisodeFromFavourites({
        episodeID,
      }).then(async () => {
        favouritesActions.getFavourites();
        location.reload();
      });
  };
  return data.map((podcast: IndividualPodcast) => (
    <PrimaryAccordion key={podcast.id}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{podcast.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {podcast.seasons.map((season: IndividualPodcastSeason) => (
          <Accordion key={`${podcast.id}${season.season}`}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel-content"
              id={`panel${podcast.id}season${season.season}-header`}
            >
              <Typography>Season: {season.season}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {season.episodes.map((episode: IndividualPodcastEpisode) => (
                  <ListItem
                    key={episode.id}
                    secondaryAction={
                      <>
                        <IconButton
                          onClick={() =>
                            shareContent(
                              "PodFly",
                              "Go check out this awesome podcast on PodFly!",
                              `https://podfly-demo.netlify.app/listen?podcast=${podcast.id}&season=${season.season}&episode=${episode.episode}`
                            )
                          }
                        >
                          <Share />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            if (episode.id) {
                              handleRemoveEpisodeFromFavourites(episode.id);
                            }
                          }}
                        >
                          <BookmarkRemove />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            handleNavigatetoPlayer(
                              podcast.id,
                              episode.episode,
                              season.season
                            )
                          }
                        >
                          <PlayArrow />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText
                      primary={episode.title}
                      secondary={
                        <Box display="flex" flexDirection="column">
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="#a1a1a1"
                          >
                            Episode {episode.episode}
                          </Typography>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="#a1a1a1"
                          >
                            added:{" "}
                            {episode.created_at &&
                              format(
                                new Date(episode.created_at),
                                "dd LLLL yyyy"
                              )}
                          </Typography>
                        </Box>
                      }
                      disableTypography
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </AccordionDetails>
    </PrimaryAccordion>
  ));
};

export default FavouritesList;
