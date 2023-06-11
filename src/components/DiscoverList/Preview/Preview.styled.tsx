import { Typography, Paper } from "@mui/material";
import styled from "@emotion/styled";
import "@fontsource/poppins/500.css";

const Label = styled(Typography)<{
  as: string;
  color?: string;
  fontSize: string;
}>`
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
  width: 10rem;
  font-family: "Poppins";
  font-weight: 500;
  text-decoration: none;
  margin-top: 0.6rem;
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
`;

const Card = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: none;
  width: 10rem;
  border-radius: 15px;
`;

const Image = styled.img<{ src: string }>`
  width: 10rem;
  height: 10rem;
  border-radius: 15px;
  :hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;

export default { Label, Card, Image };
