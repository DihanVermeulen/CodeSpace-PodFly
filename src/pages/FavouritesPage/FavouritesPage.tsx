import { Filter } from "../../@types/filters";
import { useAuth } from "../../hooks";
import { Space } from "../../styles";
import {
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { useState, MouseEvent } from "react";
import { BookmarkRemove, ExpandMore, PlayArrow } from "@mui/icons-material";
import { createFavouritesActions, getFavouritesState } from "../../model";
import { removeEpisodeFromFavourites } from "../../utils/helpers";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export const FavouritesPage = () => {
  const { getSession } = useAuth();
  const session = getSession();
  const { favouritesList } = getFavouritesState();
  const [filter, setFilter] = useState<Filter>("ALL");
  const favouritesActions = createFavouritesActions();
  const navigate = useNavigate();

  const handleFilterData = (
    _event: MouseEvent<HTMLElement>,
    newFilter: Filter
  ) => {
    if (newFilter !== filter && newFilter !== null) {
      setFilter(newFilter);
      // setFilteredData(filterData(newFilter, podcasts));
      // setSearchData([]);
    }
  };

  const handleRemoveEpisodeFromFavourites = (episodeID: string) => {
    const userID = session?.user.id;
    if (userID)
      removeEpisodeFromFavourites({
        episodeID,
      }).then(() => favouritesActions.getFavourites());
  };

  const handleNavigatetoPlayer = (
    showID: string,
    episodeNumber: number,
    seasonNumber: number
  ) => {
    navigate(
      `/listen?podcast=${showID}&season=${seasonNumber}&episode=${episodeNumber}`
    );
  };

  return (
    <>
      <Space height={"4rem"} />
      <Box sx={{ padding: "1rem" }}>
        <ToggleButtonGroup
          size="small"
          value={filter}
          onChange={handleFilterData}
          exclusive
          aria-label="sort"
        >
          <ToggleButton sx={{ fontSize: 12 }} value="ALL" aria-label="show all">
            All
          </ToggleButton>
          <ToggleButton sx={{ fontSize: 12 }} value="A-Z" aria-label="a to z">
            A - Z
          </ToggleButton>
          <ToggleButton sx={{ fontSize: 12 }} value="Z-A" aria-label="z to a">
            Z - A
          </ToggleButton>
          <ToggleButton
            sx={{ fontSize: 12 }}
            value="MOST_RECENT"
            aria-label="most recent"
          >
            Most Recent
          </ToggleButton>
          <ToggleButton
            sx={{ fontSize: 12 }}
            value="LEAST_RECENT"
            aria-label="least recent"
          >
            Least Recent
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {session
        ? favouritesList &&
          favouritesList.map((item) => (
            <Accordion key={item.id}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {item.seasons.map((season) => (
                  <Accordion key={`${item.id}${season.season}`}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel-content"
                      id={`panel${item.id}season${season.season}-header`}
                    >
                      <Typography>Season: {season.season}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense={true}>
                        {season.episodes.map((episode) => (
                          <ListItem
                            key={episode.id}
                            secondaryAction={
                              <>
                                <IconButton
                                  onClick={() =>
                                    handleRemoveEpisodeFromFavourites(
                                      episode.id
                                    )
                                  }
                                >
                                  <BookmarkRemove />
                                </IconButton>
                                <IconButton
                                  onClick={() =>
                                    handleNavigatetoPlayer(
                                      item.id,
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
                            />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </AccordionDetails>
            </Accordion>
          ))
        : "please sign in"}
    </>
  );
};
