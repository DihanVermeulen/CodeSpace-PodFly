import { IndividualPodcastEpisode } from "../../../@types/podcast";
import StyledComponents from "./Preview.styled";
const { EpisodeTile, EpisodeTitle, EpisodeLabel } = StyledComponents;

export const PreviewEpisode = (props: IndividualPodcastEpisode) => {
  const { title, episode } = props;
  return (
    <EpisodeTile>
      <EpisodeTitle component="dt">{title}</EpisodeTitle>
      <EpisodeLabel component="dd">Episode: {episode}</EpisodeLabel>
    </EpisodeTile>
  );
};
