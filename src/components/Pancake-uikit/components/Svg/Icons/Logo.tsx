import React from "react";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <img
      src="/images/logo-mobile.png"
      style={{ paddingTop: '10px', minHeight: '40px', width: 'auto', height: '42px' }}
      alt="LiveTrade"
    />
  );
};

export default Icon;
