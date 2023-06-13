import { Box, Divider, List, ListItem } from "@mui/material";
import { Preview, PreviewEpisode } from "./Preview";
import { PodcastPreview, IndividualPodcastSeason } from "../../@types/podcast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getModalState, createModalActions } from "../../model";
import { Fragment } from "react";

type ViewList<T = PodcastPreview[]> = {
  data: T;
  viewEpisodes?: boolean;
};

export const ViewList = <
  T extends PodcastPreview[] | IndividualPodcastSeason["episodes"]
>(
  props: ViewList<T>
) => {
  const { data, viewEpisodes } = props;
  if (!data) throw new Error("No data was passed");
  const modalState = getModalState();
  const modalActions = createModalActions();
  const location = useLocation();
  const navigate = useNavigate();

  console.log(data);

  const handleNavigate = (event, episodeNumber: number) => {
    event.preventDefault();
    event.stopPropagation();
    if (!modalState.isOpen) modalActions.openModal();
    navigate(`/listen?podcast=${data.podcastId}&season=${data.season}&episode=${episodeNumber}`, {
      state: { background: location },
    });
  };

  console.log(data);

  if (viewEpisodes) {
    return (
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        style={{ width: "100%" }}
        onClick={handleNavigate}
      >
        <List sx={{ width: "100%" }}>
          {(data as IndividualPodcastSeason["episodes"]).episodes.map(
            (item, index) => (
              <Fragment key={index}>
                <ListItem>
                  <Link
                    style={{ width: "100%", textDecoration: "none" }}
                    onClick={(event) => handleNavigate(event, item.episode)}
                    key={index}
                    to="#"
                  >
                    <PreviewEpisode
                      title={item.title}
                      description={item.description}
                      episode={item.episode}
                      file={item.file}
                    />
                  </Link>
                </ListItem>
                <Divider sx={{ backgroundColor: "#FFF" }} />
              </Fragment>
            )
          )}
        </List>
      </Box>
    );
  } else {
    return (
      <Box display={"flex"} flexWrap={"wrap"} gap={2}>
        {(data as PodcastPreview[]).map((item) => (
          <Preview key={item.id} />
        ))}
      </Box>
    );
  }
};
