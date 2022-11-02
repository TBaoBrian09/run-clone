import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="18" height="19" viewBox="0 0 18 19" style={{fill:"none"}} {...props}>
<path d="M9 16.1875C12.4173 16.1875 15.1875 13.4173 15.1875 10C15.1875 6.58274 12.4173 3.8125 9 3.8125C5.58274 3.8125 2.8125 6.58274 2.8125 10C2.8125 13.4173 5.58274 16.1875 9 16.1875Z" stroke="#5155F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9 10.0001L11.7842 7.21582" stroke="#5155F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.3125 1.5625H10.6875" stroke="#5155F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>

    </Svg>
  );
};

export default Icon;
