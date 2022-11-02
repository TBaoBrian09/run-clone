import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 10 5" {...props}>
        <path d="M4.16633 2.33918L5.83299 4.00584L8.21091 1.62793L9.16633 2.58334V0.0833435H6.66633L7.62174 1.03876L5.83299 2.82751L4.16633 1.16084L0.955078 4.37209L1.54424 4.96126L4.16633 2.33918Z"/>
    </Svg>
  );
};

export default Icon;
