import styled from "@emotion/styled";
import { Paper, ButtonBase } from "@mui/material";

const Card = styled(Paper)<{ as: string }>`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  min-width: 300px;
  height: 200px;
  list-style: none;
  display: inline-block;
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
`;

const Description = styled.dl`
  text-align: left;
`;

export default { Card, StyledButtonBase, CardBottomBanner, Description };
