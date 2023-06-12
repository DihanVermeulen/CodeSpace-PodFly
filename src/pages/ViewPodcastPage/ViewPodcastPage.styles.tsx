import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";

const StyledImage = styled.img`
  border-radius: 20px;
  width: 10rem;

  @media screen and (min-width: 400px) {
    width: 12rem;
  }
`;

const CenteredGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ReadMoreButton = styled.button`
  color: #4c3b4d;
  outline: 0;
  border: 0;
  background-color: transparent;
  font-family: Poppins;
  cursor: pointer;
`;

const Title = styled(Typography)`
  font-size: 24px;
`;

export default {
  StyledImage,
  CenteredGrid,
  ReadMoreButton,
  Title,
};
