import React from "react";
import styled from 'styled-components';
import { SvgProps } from "../../../components/Svg/types";

const StyleDiv = styled.div`
  padding-right:5px;
`
const Icon: React.FC<SvgProps> = (_props) => {
  return (
    <StyleDiv>
      <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 10.6875C13.0386 10.6875 16.3125 9.17646 16.3125 7.3125C16.3125 5.44854 13.0386 3.9375 9 3.9375C4.96142 3.9375 1.6875 5.44854 1.6875 7.3125C1.6875 9.17646 4.96142 10.6875 9 10.6875Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 10.6875V14.0625" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1.6875 7.3125V10.6875C1.6875 12.375 4.5 14.0625 9 14.0625C13.5 14.0625 16.3125 12.375 16.3125 10.6875V7.3125" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.5 9.99188V13.3669" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.5 9.99188V13.3669" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

  </StyleDiv>
  );
};

export default Icon;
