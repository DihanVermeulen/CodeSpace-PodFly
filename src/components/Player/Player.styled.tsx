import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const ModalContainer = styled.div<{
  isOpen: boolean;
  isMaximised: boolean;
  disableScrollLock: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isMaximised ? "flex-start" : "center")};
  position: fixed;
  left: 0;
  bottom: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
  background-color: ${(props) =>
    props.isMaximised ? "rgba(255, 255, 255)" : "rgba(217, 217, 217, 0.4)"};
  transition: bottom 0.3s ease-in-out;
  z-index: 999;
  height: ${(props) => (props.isMaximised ? "100%" : "10vh")};
  ${({ isOpen }) =>
    isOpen &&
    css`
      bottom: 0;
    `};
`;

export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 4rem;
  width: 100%;
`;

export const PlayerContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default { ModalContainer, Header, PlayerContainer };
