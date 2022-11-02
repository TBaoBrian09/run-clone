import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 50 50" {...props} width="80%">
        <path d="M49.8839 15.9618L25.0005 1.04102L0.117188 15.9618L25.0005 30.891L49.8839 15.9618ZM25.0005 5.89102L41.7839 15.9618L25.0005 26.041L8.21719 15.9618L25.0005 5.89102Z"/>
        <path d="M50 29.0939L25 44.0939L0 29.0939V33.9543L25 48.9523L50 33.9543V29.0939Z"/>
        <path d="M50 20.0707L44.7604 23.2145L25 35.0707L5.23958 23.2145L0 20.0707V24.9291L25 39.929L50 24.9291V20.0707Z"/>    
    </Svg>
  );
};

export default Icon;
