import { Typography, Paper } from "@mui/material";
import styled from "@emotion/styled";
import "@fontsource/poppins/500.css";

const Label = styled(Typography)<{ as: string }>`
  text-align: center;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  font-size: 14px;
  width: 10rem;
  font-family: "Poppins";
  font-weight: 500;
`;

const Card = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: none;
`;

const Image = styled.img<{ src: string }>`
  width: 10rem;
  height: 10rem;
  border-radius: 15px;
`;

export default { Label, Card, Image };
