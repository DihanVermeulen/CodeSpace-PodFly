import styled from "@emotion/styled";
import { Paper, ButtonBase } from "@mui/material";

const Card = styled(Paper)<{ as: string }>`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  min-width: 300px;
  height: 200px;
  list-style: none;
  display: inline-block;
  border-radius: 20px;
  margin-left: 10px;
`;

const CardBottomBanner = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  color: #ffffff;

  dd {
    margin-left: 10px;
    font-size: 14px;
  }

  dt {
    margin-left: 10px;
    font-size: 12px;
    color: #dfdfdf;
  }
`;

const StyledButtonBase = styled(ButtonBase)<{ backgroundimage: string }>`
  display: flex;
  position: relative;
  align-items: center;
  text-align: left;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.backgroundimage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 20px;
`;

const Description = styled.dl`
  text-align: left;
`;

const BlurredBackground = styled.div`
  filter: blur(8px);
  -webkit-filter: blur(8px);
  height: 100%;
  width: 100%;
  background-color: #d9d9d9;
`;

export default {
  Card,
  StyledButtonBase,
  CardBottomBanner,
  Description,
  BlurredBackground,
};
