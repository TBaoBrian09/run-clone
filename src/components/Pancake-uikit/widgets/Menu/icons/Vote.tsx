import React from "react";
import styled from 'styled-components';
import { SvgProps } from "../../../components/Svg/types";

const StyleDiv = styled.div`
  padding-right:0px
`

const Icon: React.FC<SvgProps> = (_props) => {
  return (
    <StyleDiv>
    <svg width={25} height={25} viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.125 0.5625H0.5625V20.875C0.5625 21.2894 0.72712 21.6868 1.02015 21.9799C1.31317 22.2729 1.7106 22.4375 2.125 22.4375H22.4375V20.875H2.125V18.5312H19.3125V12.2812H2.125V9.15625H13.0625V2.90625H2.125V0.5625ZM17.75 13.8438V16.9688H2.125V13.8438H17.75ZM11.5 4.46875V7.59375H2.125V4.46875H11.5Z"/>
    </svg>
    </StyleDiv>
  );
};

export default Icon;
