import { IndividualPodcastEpisode } from "../../../@types/podcast";
import StyledComponents from "./Preview.styled";
import UtilsStyles from "../../../styles/utils.styles";
const { EpisodeTile, EpisodeTitle, EpisodeLabel } = StyledComponents;
const { Space } = UtilsStyles;

export const PreviewEpisode = (props: IndividualPodcastEpisode) => {
  const { title, episode } = props;
  return (
    <EpisodeTile>
      <EpisodeTitle component="dt">{title}</EpisodeTitle>
      <Space height="0.3rem"/>
      <EpisodeLabel component="dd">Episode: {episode}</EpisodeLabel>
    </EpisodeTile>
  );
};
