import React from "react";
import { useTheme } from "styled-components";
import Svg from "../Svg";
import { SvgProps } from "../types";


const Icon: React.FC<SvgProps> = (props) => {

  const theme = useTheme();
  const primaryColor = theme.isDark ? "#FFFFFF" : "#000000";

  return (
    <Svg viewBox="0 0 24 24"{...props}>
        <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0)">
            <path fill={primaryColor} d="M9.46921 5.9526C9.53028 5.91055 9.58021 5.85429 9.6147 5.78866C9.6492 5.72303 9.66722 5.64999 9.66722 5.57585C9.66722 5.50171 9.6492 5.42867 9.6147 5.36304C9.58021 5.29741 9.53028 5.24115 9.46921 5.1991L3.51087 1.0741C3.44215 1.02635 3.36165 0.998352 3.27813 0.993141C3.19461 0.987931 3.11126 1.00571 3.03714 1.04454C2.96301 1.08338 2.90095 1.14178 2.85768 1.21342C2.81442 1.28505 2.79162 1.36717 2.79175 1.45085L2.79175 9.70085C2.79209 9.78434 2.81519 9.86615 2.85856 9.9375C2.90192 10.0088 2.96392 10.067 3.03787 10.1058C3.11182 10.1445 3.19494 10.1624 3.27828 10.1574C3.36163 10.1524 3.44204 10.1248 3.51087 10.0776L9.46921 5.9526Z" />
            </g>
            <defs>
            <clipPath id="clip0">
            <rect width="11" height="11" transform="translate(0.5 11.0759) rotate(-90)"/>
            </clipPath>
            </defs>
        </svg>
    </Svg>
  );
};

export default Icon;
