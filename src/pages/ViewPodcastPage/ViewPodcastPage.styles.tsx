import styled from "@emotion/styled";
import { Grid, Select, Typography } from "@mui/material";

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

const StyledSelect = styled(Select)<{ onChange: any }>`
  & :focus {
    border-color: #d7a6b3;
  }
  & ::before {
    border-color: #d7a6b3;
  }
`;

const Title = styled(Typography)`
  font-size: 24px;
`;

export default {
  StyledImage,
  CenteredGrid,
  ReadMoreButton,
  StyledSelect,
  Title,
};
