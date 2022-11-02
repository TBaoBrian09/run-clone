import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props} width='30px' height='30px'>
        <path d="M14.0645 9.875V6.125C14.0645 3 12.8145 1.75 9.68945 1.75H5.93945C2.81445 1.75 1.56445 3 1.56445 6.125V9.875C1.56445 13 2.81445 14.25 5.93945 14.25H9.68945C12.8145 14.25 14.0645 13 14.0645 9.875Z" stroke="#777E91" stroke-Linecap="round" stroke-Linejoin="round"/>
        <path d="M12.6582 2.53125L2.37695 12.8125" stroke="#777E91" stroke-Linecap="round" stroke-Linejoin="round"/>
        <path d="M10.3708 11.75V8.625" stroke="#777E91" stroke-Miterlimit="10" stroke-Linecap="round" stroke-Linejoin="round"/>
        <path d="M11.8958 10.1875H8.77075" stroke="#777E91" stroke-Miterlimit="10" stroke-Linecap="round" stroke-Linejoin="round"/>
        <path d="M6.89575 5.1875H3.77075" stroke="#777E91" stroke-Miterlimit="10" stroke-Linecap="round" stroke-Linejoin="round"/>
    </Svg>
  );
};

export default Icon;

