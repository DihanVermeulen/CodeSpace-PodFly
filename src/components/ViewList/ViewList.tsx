import { Box, Divider, List, ListItem } from "@mui/material";
import { Preview, PreviewEpisode } from "./Preview";
import { PodcastPreview, IndividualPodcastEpisode } from "../../@types/podcast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getModalState, createModalActions } from "../../model";
import { Fragment } from "react";

type ViewList<T> = {
  data: T;
  viewEpisodes?: boolean;
};

type EpisodeData = {
  episodes: IndividualPodcastEpisode[];
  podcastId: string;
  season: number;
};

/**
 * Displays previews in the form of a list
 * @param props
 * @returns episode preview or podcast preview
 */
export const ViewList = (props: ViewList<EpisodeData | PodcastPreview[]>) => {
  const { data, viewEpisodes } = props;
  if (!data) throw new Error("No data was passed");
  const modalState = getModalState();
  const modalActions = createModalActions();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    episodeNumber: number
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!modalState.isOpen) modalActions.openModal();

    if ("podcastId" in data && "season" in data) {
      navigate(
        `/listen?podcast=${data.podcastId}&season=${data.season}&episode=${episodeNumber}`,
        {
          state: { background: location },
        }
      );
    }
  };

  if (viewEpisodes && "episodes" in data) {
    return (
      <Box display={"flex"} flexWrap={"wrap"} style={{ width: "100%" }}>
        <List sx={{ width: "100%" }}>
          {data.episodes.map((item, index) => (
            <Fragment key={index}>
              <ListItem>
                <Link
                  style={{ width: "100%", textDecoration: "none" }}
                  onClick={(event) => handleNavigate(event, item.episode)}
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
          ))}
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
