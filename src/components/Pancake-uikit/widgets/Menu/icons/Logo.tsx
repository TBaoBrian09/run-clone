import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

interface LogoProps extends SvgProps {
  isDark: boolean;
}

const Logo: React.FC<LogoProps> = ({ isDark, ...props }) => {
  // const textColor = isDark ? "#FFFFFF" : "#000000";
  return (
    <img
      src="/images/logo.png"
      style={{ paddingTop: '10px', transform: 'translateX(-15px)', minHeight: '40px', width: 'auto', height: '42px' }}
      alt="LiveTrade"
    />
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);
