import React, { Children } from "react";
import styled from "styled-components";
import { Button } from "@phamphu19498/runtogether-uikit";

const ActiveButton = styled(Button)`
    background: ${({ theme }) => theme.isDark ? "linear-gradient(291.54deg, #101133 27.04%, #232441 86.39%)" : "#fff" };
    color:${({ theme }) => theme.colors.homePrice };
    @media only screen and (max-width: 600px) {
      font-size:16px;
      padding:0px;
    }
`
const NotActiveButton = styled(Button)`
    background-color: transparent;
    color:${({ theme }) => theme.colors.textDisabled };
    @media only screen and (max-width: 600px) {
      font-size:16px;
      padding:0px;
    }
`
export interface Active  {
    isActive: boolean,
    textBTN:string
  }
const TabButton: React.FC<Active>  = ({ isActive,textBTN }) => {
  if (!isActive) {
    return <NotActiveButton>{textBTN}</NotActiveButton>;
  }
  return <ActiveButton>{textBTN}</ActiveButton>;
};

export default TabButton;
