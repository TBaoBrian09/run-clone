import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
<path d="M11 12H1C0.447 12 0 11.553 0 11V1C0 0.448 0.447 0 1 0H11C11.553 0 12 0.448 12 1V11C12 11.553 11.553 12 11 12Z" fill="#6C5DD3"/>
<path d="M15 16H4V14H14V4H16V15C16 15.553 15.553 16 15 16Z" fill="#6C5DD3"/>
    </Svg>
  );
};

export default Icon;
