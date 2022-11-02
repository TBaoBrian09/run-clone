import useTheme from "hooks/useTheme";
import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
    const { theme } = useTheme()
  return (
    <Svg width="71" height="71" viewBox="0 0 81 81" {...props}>
        <circle cx="40.5" cy="40.5" r="38.5" fill={theme.colors.modalHeader} stroke="url(#paint0_linear_903_23007)" strokeWidth="4"/>
        <defs>
        <linearGradient id="paint0_linear_903_23007" x1="40.5" y1="4" x2="40.5" y2="77" gradientUnits="userSpaceOnUse">
        <stop stopColor="#49A2F2"/>
        <stop offset="1" stopColor="#FD6B8D"/>
        </linearGradient>
        </defs>
    </Svg>
  );
};

export default Icon;
