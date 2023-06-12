import { Box, Divider, List, ListItem } from "@mui/material";
import { Preview, PreviewEpisode } from "./Preview";
import { PodcastPreview, IndividualPodcastSeason } from "../../@types/podcast";

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

  console.log(data);
  if (viewEpisodes) {
    return (
      <Box display={"flex"} flexWrap={"wrap"}>
        <List sx={{ width: "100%" }}>
          {(data as IndividualPodcastSeason["episodes"]).map((item) => (
            <>
              <ListItem>
                <PreviewEpisode
                  title={item.title}
                  description={item.description}
                  episode={item.episode}
                  file={item.file}
                />
              </ListItem>
              <Divider sx={{ backgroundColor: "#FFF" }} />
            </>
          ))}
        </List>
      </Box>
    );
  } else {
    return (
      <Box display={"flex"} flexWrap={"wrap"} gap={2}>
        {data.map((item) => (
          <Preview />
        ))}
      </Box>
    );
  }
};
