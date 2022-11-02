import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 25 25" {...props}>
        <path d="M12.5 0C5.59547 0 0 5.46763 0 12.2085C0 18.952 5.59547 24.4169 12.5 24.4169C19.4045 24.4169 25 18.952 25 12.2085C25 5.46763 19.4045 0 12.5 0ZM15.7495 7.36814H14.4486C13.428 7.36814 13.2321 7.84128 13.2321 8.53503V10.0661H15.6651L15.3467 12.4663H13.2294V18.6224H10.6929V12.469H8.57283V10.0687H10.6929V8.29846C10.6929 6.24378 11.9775 5.1274 13.8526 5.1274C14.7507 5.1274 15.5236 5.19385 15.7495 5.22309V7.36814Z" />

    </Svg>
  );
};

export default Icon;
