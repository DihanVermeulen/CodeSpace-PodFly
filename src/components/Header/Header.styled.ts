import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.header`
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

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #a1a1a1;
`;

export const LinkBlock = styled.ul`
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

export const Logo = styled.img`
  width: 2rem;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default { HeaderContainer, StyledLink, LinkBlock, Logo, LogoContainer };
