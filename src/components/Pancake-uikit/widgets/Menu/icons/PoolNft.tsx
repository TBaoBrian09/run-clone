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
        <path d="M14.625 2.8125H12.375C12.0643 2.8125 11.8125 3.06434 11.8125 3.375V5.625C11.8125 5.93566 12.0643 6.1875 12.375 6.1875H14.625C14.9357 6.1875 15.1875 5.93566 15.1875 5.625V3.375C15.1875 3.06434 14.9357 2.8125 14.625 2.8125Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.625 2.8125H3.375C3.06434 2.8125 2.8125 3.06434 2.8125 3.375V5.625C2.8125 5.93566 3.06434 6.1875 3.375 6.1875H5.625C5.93566 6.1875 6.1875 5.93566 6.1875 5.625V3.375C6.1875 3.06434 5.93566 2.8125 5.625 2.8125Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.625 11.8125H12.375C12.0643 11.8125 11.8125 12.0643 11.8125 12.375V14.625C11.8125 14.9357 12.0643 15.1875 12.375 15.1875H14.625C14.9357 15.1875 15.1875 14.9357 15.1875 14.625V12.375C15.1875 12.0643 14.9357 11.8125 14.625 11.8125Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.625 11.8125H3.375C3.06434 11.8125 2.8125 12.0643 2.8125 12.375V14.625C2.8125 14.9357 3.06434 15.1875 3.375 15.1875H5.625C5.93566 15.1875 6.1875 14.9357 6.1875 14.625V12.375C6.1875 12.0643 5.93566 11.8125 5.625 11.8125Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.5 11.8125V6.1875" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.8125 13.5H6.1875" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.5 6.1875V11.8125" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.1875 4.5H11.8125" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </StyleDiv>
  );
};

export default Icon;
