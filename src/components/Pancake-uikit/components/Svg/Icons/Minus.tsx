import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="32px" height="32px" viewBox="0 0 18 18" fill="none" {...props}>
<path d="M5 9H13" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
};

export default Icon;
