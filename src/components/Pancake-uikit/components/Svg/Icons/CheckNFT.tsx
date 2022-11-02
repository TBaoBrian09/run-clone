import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 16 16" {...props}>
<path d="M12.25 0H5.23163C4.27 0 3.5 0.77 3.5 1.7325V8.75C3.5 9.7125 4.2875 10.5 5.25 10.5H12.25C13.2125 10.5 14 9.7125 14 8.75V1.75C14 0.7875 13.2125 0 12.25 0ZM12.25 8.75H5.25V1.75H12.25V8.75ZM1.75 7H0V12.25C0 13.2125 0.7875 14 1.75 14H7V12.25H1.75V7Z"/>
    </Svg>
  );
};

export default Icon;
