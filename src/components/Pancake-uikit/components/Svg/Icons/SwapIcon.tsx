import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 35 35" {...props} width="35px">
            <circle cx="17.5" cy="17.5" r="17" fill="white" stroke="#101133"/>
            <path d="M22.1654 23.345V15.1667H19.832V23.345H16.332L20.9987 28L25.6654 23.345H22.1654ZM13.9987 7L9.33203 11.655H12.832V19.8333H15.1654V11.655H18.6654L13.9987 7Z" fill="#101133"/>
      </Svg>
  );
};

export default Icon;
