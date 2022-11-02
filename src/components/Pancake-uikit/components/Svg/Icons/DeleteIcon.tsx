import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 12 12" {...props}>
        <path d="M8.75 8.75L1.25 1.25M1.25 8.75L8.75 1.25L1.25 8.75Z" stroke="#707085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
};

export default Icon;
