import { Box } from "@mui/material";
import { Preview } from "./Preview";
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
  const { data } = props;

  console.log(data);

  return <Box display={"flex"} flexWrap={"wrap"} gap={2}></Box>;
};
