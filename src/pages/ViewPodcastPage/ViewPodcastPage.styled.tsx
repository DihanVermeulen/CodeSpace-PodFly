import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";

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

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 4rem;
`;

export default {
  StyledImage,
  CenteredGrid,
  ReadMoreButton,
  Title,
  Header,
};
