import React from "react";
import styled from 'styled-components';
import { SvgProps } from "../../../components/Svg/types";

const StyleDiv = styled.div`
  padding-right:5px
`

const Icon: React.FC<SvgProps> = (_props) => {
  return (
    <StyleDiv>
      <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.25 9.75H3.75V8.25H2.25V9.75ZM2.25 12.75H3.75V11.25H2.25V12.75ZM3.75 15.75V14.25H2.25C2.25 15.075 2.9175 15.75 3.75 15.75ZM2.25 6.75H3.75V5.25H2.25V6.75ZM11.25 15.75H12.75V14.25H11.25V15.75ZM14.25 2.25H6.75C5.9175 2.25 5.25 2.925 5.25 3.75V11.25C5.25 12.075 5.9175 12.75 6.75 12.75H14.25C15.075 12.75 15.75 12.075 15.75 11.25V3.75C15.75 2.925 15.075 2.25 14.25 2.25ZM14.25 11.25H6.75V3.75H14.25V11.25ZM8.25 15.75H9.75V14.25H8.25V15.75ZM5.25 15.75H6.75V14.25H5.25V15.75Z" fill="black" />
      </svg>
    </StyleDiv>
  );
};

export default Icon;
