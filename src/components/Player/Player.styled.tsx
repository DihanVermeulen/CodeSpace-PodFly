import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Typography, Slider } from "@mui/material";

export const ModalContainer = styled.div<{
  isOpen: boolean;
  isMaximised: boolean;
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

  :last-child {
    margin-left: auto;
  }
`;

export const PlayerContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 3rem;
`;

export const LoadingStateContainer = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const ContentContainer = styled(Box)<{ display: string }>`
  flex-direction: column;
  display: ${(props) => props.display};
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img<{
  width: string;
  height: string;
  marginBottom?: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 5px;
  margin-bottom: ${(props) => props.marginBottom};
`;

export const Title = styled(Typography)<{ as: string }>`
  font-size: 22px;
  color: #4c3b4d;
  text-align: center;
  font-family: Poppins;
`;

export const MinimisedPlayer = styled(Box)`
  height: 100%;
  width: 100%;
  justify-content: space-between;
`;

export const StyledSlider = styled(Slider)`
  height: 4px;

  & .MuiSlider-thumb {
    width: 8px;
    height: 8px;
    transition: 0.3s cubic-bezier(0.47, 1.64, 0.41, 0.8);

    &::before {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
    }

    &:hover,
    &.Mui-active {
      width: 20px;
      height: 20px;
    }
  }

  & .MuiSlider-rail {
    opacity: 0.28;
  }
`;

export default {
  ModalContainer,
  Header,
  PlayerContainer,
  LoadingStateContainer,
  ContentContainer,
  Image,
  Title,
  MinimisedPlayer,
  StyledSlider
};
