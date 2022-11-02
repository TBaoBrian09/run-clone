import React from "react";
import styled from 'styled-components';
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const StyleDiv = styled.div`
  padding-right:5px;
`
const Icon: React.FC<SvgProps> = (props) => {
  return (
    <StyleDiv>
      <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 1.5H3C2.175 1.5 1.5075 2.175 1.5075 3L1.5 16.5L4.5 13.5H15C15.825 13.5 16.5 12.825 16.5 12V3C16.5 2.175 15.825 1.5 15 1.5ZM15 12H3.8775L3.435 12.4425L3 12.8775V3H15V12ZM8.25 9H9.75V10.5H8.25V9ZM8.25 4.5H9.75V7.5H8.25V4.5Z" fill="black" />
      </svg>
    </StyleDiv>
  );
};

export default Icon;
