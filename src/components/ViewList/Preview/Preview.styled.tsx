import styled from "@emotion/styled";
import { Typography, ButtonBase } from "@mui/material";

export const EpisodeTile = styled(ButtonBase)`
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background-color: #959595;
  padding: 0.3rem;
  padding-left: 1rem;

  dt {
    text-align: left;
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
