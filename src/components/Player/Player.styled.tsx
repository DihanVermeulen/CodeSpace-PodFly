import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const ModalContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  left: 0;
  bottom: ${({ isOpen }) => (isOpen ? "0" : "-100%")}; // Initial position
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  transition: bottom 0.3s ease-in-out; // Transition animation
  z-index: 999;

  ${({ isOpen }) =>
    isOpen &&
    css`
      bottom: 0; // Final position when modal is open
    `}
`;

export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 4rem;
`;

export default { ModalContainer, Header };
