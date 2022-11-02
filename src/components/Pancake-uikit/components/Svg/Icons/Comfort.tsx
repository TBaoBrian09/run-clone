import useTheme from "hooks/useTheme";
import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" style={{fill:"none"}} {...props} >
<path d="M15.75 14.625H2.25V3.375" stroke="#5155F6" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14.6251 4.5L9.00012 10.125L6.75012 7.875L2.25012 12.375" stroke="#5155F6" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14.6251 7.3125V4.5H11.8126" stroke="#5155F6" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  ); 
};

export default Icon;
