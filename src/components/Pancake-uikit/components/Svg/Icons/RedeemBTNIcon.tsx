import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24 " {...props} style={{fill:"none"}}>
        <rect x="4.5" y="5" width="6" height="6" rx="0.5" stroke="white"/>
        <rect x="6" y="6.5" width="3" height="3" fill="white"/>
        <circle cx="16" cy="16.5" r="3.5" stroke="white"/>
        <circle cx="16" cy="16.5" r="1.5" fill="white" stroke="white"/>
        <path d="M11 21.5C6.58172 21.5 3 17.9183 3 13.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 3.5C17.4183 3.5 21 7.08172 21 11.5" stroke="white" strokeLinecap="round"/>
    </Svg>
  );
};

export default Icon;
