import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const ModalContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 100%;
  height: 10vh;
  background-color: rgba(217, 217, 217, 0.3);
  transition: bottom 0.3s ease-in-out;
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
