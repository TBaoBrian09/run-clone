import React from "react";
import styled from 'styled-components';
import { SvgProps } from "../../../components/Svg/types";

const StyleDiv = styled.div`
  padding-right:5px
`

const Icon: React.FC<SvgProps> = (_props) => {
  return (
    <StyleDiv>
			<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          s<path d="M13.0594 0L12.1368 0.943052L14.9455 3.75171H1.12774V5.06378H14.9455L12.1368 7.87244L13.0594 8.81549L17.4671 4.40774L13.0594 0ZM4.94095 9.18451L0.533203 13.5923L4.94095 18L5.8635 17.0569L3.05484 14.2483H16.8726V12.9362H3.05484L5.8635 10.1276L4.94095 9.18451Z" fill="#202224"/>
      </svg>
    </StyleDiv>
  );
};

export default Icon;
