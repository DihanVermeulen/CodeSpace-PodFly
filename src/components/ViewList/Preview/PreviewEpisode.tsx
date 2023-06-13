import { IndividualPodcastEpisode } from "../../../@types/podcast";
import { EpisodeTitle, EpisodeTile, EpisodeLabel } from "./Preview.styled";
import UtilsStyles from "../../../styles/utils.styles";
const { Space } = UtilsStyles;
import { Link } from "react-router-dom";

export const PreviewEpisode = (props: IndividualPodcastEpisode) => {
  const { title, episode } = props;
  return (
    <Link to={"/listen/1"} style={{ width: "100%" }}>
      <EpisodeTile>
        <EpisodeTitle component="dt">{title}</EpisodeTitle>
        <Space height="0.3rem" />
        <EpisodeLabel component="dd">Episode: {episode}</EpisodeLabel>
      </EpisodeTile>
    </Link>
  );
};
