import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M4 2H20C21.1 2 22 2.9 22 4V16C22 17.1 21.1 18 20 18H6L2 22L2.01 4C2.01 2.9 2.9 2 4 2ZM16.7696 7.6385C17.1223 7.21345 17.0636 6.58301 16.6385 6.23038C16.2135 5.87774 15.583 5.93645 15.2304 6.3615L13.3637 8.6115L13.3537 8.62362L13.344 8.63606L11.6064 10.8701L9.58989 9.39706C9.14392 9.07127 8.5183 9.1687 8.19251 9.61466C7.86673 10.0606 7.96415 10.6862 8.41011 11.012L11.2101 13.0575L11.9936 13.6299L12.5894 12.8639L14.913 9.87637L16.7696 7.6385Z" fill="#01E3C8"/>
    </Svg>
  );
};

export default Icon;
