import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const EpisodeTile = styled(Box)`
  width: 100%;
  background-color: #959595;
  padding: 0.6rem;
`;

const EpisodeTitle = styled(Typography)<{ component: string }>`
  font-size: 14px;
  line-height: normal;
  width: 14rem;
  color: #fff;
`;
const EpisodeLabel = styled(Typography)<{ component: string }>`
  font-size: 12px;
  color: #d9d9d9;
`;

export default {
  EpisodeTile,
  EpisodeTitle,
  EpisodeLabel,
};