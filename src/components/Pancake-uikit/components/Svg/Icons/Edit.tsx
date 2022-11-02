import useTheme from "hooks/useTheme";
import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
    const { theme } = useTheme()
  return (
    <Svg width="14" height="14" viewBox="0 0 14 14" {...props} style={{fill:"none"}}>
        <path d="M3.65649 12.9935L13.25 3.4L10.85 1L1.25648 10.5935L1.25 13L3.65649 12.9935Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.423 3.19214L11.0576 4.82673" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
};

export default Icon;
