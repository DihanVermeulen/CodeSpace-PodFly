import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Space = styled.div<{ height: string }>`
  height: ${(props) => props.height};
`;

export const CleanLink = styled(Link)`
  text-decoration: none;
  margin: 0;
  padding: 0;
`;

export default { Space, CleanLink };
