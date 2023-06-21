import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Header = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem;
  color: #a1a1a1;
  width: 100vw;
  z-index: 998;
  background-color: rgba(255, 255, 255);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #a1a1a1;
`;

const LinkBlock = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  & li {
    margin-left: 10px;
    cursor: pointer;
    & :hover {
      color: #d7a6b3;
    }
  }
`;

export default { Header, StyledLink, LinkBlock };
