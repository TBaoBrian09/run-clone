import React from "react";
import styled from 'styled-components';
import { SvgProps } from "../../../components/Svg/types";

const StyleDiv = styled.div`
  padding-right:5px
`

const Icon: React.FC<SvgProps> = (_props) => {
  return (
    <StyleDiv>
    <svg width={20} height={18} viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 8.4375H16.4024C16.5068 8.4375 16.6092 8.40841 16.6981 8.35349C16.7869 8.29857 16.8588 8.21999 16.9055 8.12656L18.1995 5.53844C18.2638 5.40984 18.2764 5.26149 18.2348 5.12388C18.1931 4.98627 18.1003 4.86983 17.9755 4.7985L14.5 2.8125" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 8.4375H3.59765C3.49319 8.4375 3.39079 8.40841 3.30192 8.35349C3.21306 8.29857 3.14125 8.21999 3.09453 8.12656L1.80047 5.53844C1.73617 5.40984 1.72356 5.26149 1.76523 5.12388C1.80689 4.98627 1.89967 4.86983 2.02451 4.7985L5.5 2.8125" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.25 2.8125C12.25 3.40924 12.0129 3.98153 11.591 4.40349C11.169 4.82545 10.5967 5.0625 10 5.0625C9.40326 5.0625 8.83097 4.82545 8.40901 4.40349C7.98705 3.98153 7.75 3.40924 7.75 2.8125H5.5V14.625C5.5 14.7742 5.55926 14.9173 5.66475 15.0227C5.77024 15.1282 5.91332 15.1875 6.0625 15.1875H13.9375C14.0867 15.1875 14.2298 15.1282 14.3352 15.0227C14.4407 14.9173 14.5 14.7742 14.5 14.625V2.8125H12.25Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    </StyleDiv>
  );
};

export default Icon;
