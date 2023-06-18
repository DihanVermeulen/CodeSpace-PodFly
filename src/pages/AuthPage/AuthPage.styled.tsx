import styled from "@emotion/styled";
import { Container, Paper } from "@mui/material";

export const StyledContainer = styled(Container)`
  min-width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(240, 240, 240);
`;

export const StyledPaper = styled(Paper)`
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 80%;
  padding: 1rem;
  display: contents;

  @media screen and (min-width: 480px) {
    display: flex;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default { StyledContainer, StyledPaper, StyledForm };
