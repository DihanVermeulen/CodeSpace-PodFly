import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

export const EpisodeTile = styled(Box)`
  width: 100%;
  background-color: #959595;
  padding: 0.3rem;
  padding-left: 1rem;

  :active {
    filter: brightness(120%);
  }
`;

export const EpisodeTitle = styled(Typography)<{ component: string }>`
  font-size: 14px;
  line-height: normal;
  width: 14rem;
  color: #fff;
`;

export const EpisodeLabel = styled(Typography)<{ component: string }>`
  font-size: 12px;
  color: #d9d9d9;
`;

export default {
  EpisodeTile,
  EpisodeTitle,
  EpisodeLabel,
};
