import { CssBaseline, Box } from "@mui/material";
import {
  HeaderContainer,
  LinkBlock,
  Logo,
  StyledLink,
  LogoContainer,
} from "./Header.styled";
import { useLocation } from "react-router-dom";
import { SearchModal } from "../Search";
import PodFlyLogo from "../../assets/podfly-logo32x32.png";
import DropdownMenuHeader from "../Dropdowns/DropdownMenuHeader/DropdownMenuHeader";

export const Header = () => {
  const location = useLocation();

  return (
    <>
      <CssBaseline />
      <HeaderContainer>
        <LogoContainer>
          <Logo src={PodFlyLogo} alt="logo" />
          PodFly
        </LogoContainer>
        <div>
          <LinkBlock>
            <li>
              <StyledLink
                to={"/"}
                style={{
                  color: location.pathname === "/" ? "#AAF1CF" : "",
                }}
              >
                home
              </StyledLink>
            </li>
            <li>
              <StyledLink
                to={"/discover"}
                style={{
                  color: location.pathname === "/discover" ? "#AAF1CF" : "",
                }}
              >
                discover
              </StyledLink>
            </li>
            <li>
              <StyledLink
                to={"/favourites"}
                style={{
                  color: location.pathname === "/favourites" ? "#AAF1CF" : "",
                }}
              >
                favourites
              </StyledLink>
            </li>
          </LinkBlock>
        </div>
        <Box display={"flex"}>
          <SearchModal />
          <DropdownMenuHeader />
        </Box>
      </HeaderContainer>
    </>
  );
};
