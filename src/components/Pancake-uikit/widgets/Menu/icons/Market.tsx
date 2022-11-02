import React from "react";
import styled from 'styled-components';
import { SvgProps } from "../../../components/Svg/types";

const StyleDiv = styled.div`
  padding-right:5px
`

const Icon: React.FC<SvgProps> = (_props) => {
  return (
    <StyleDiv>
      <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
          <path d="M3.53571 10.2822V15.3214C3.53571 15.4777 3.5978 15.6276 3.70831 15.7381C3.81882 15.8486 3.96871 15.9107 4.125 15.9107H14.7321C14.8884 15.9107 15.0383 15.8486 15.1488 15.7381C15.2593 15.6276 15.3214 15.4777 15.3214 15.3214V10.2823" stroke="#030000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.98021 2.94641H14.8769C15.005 2.94641 15.1296 2.98813 15.2318 3.06524C15.334 3.14236 15.4084 3.25068 15.4435 3.37381L16.5 7.07141H2.35714L3.4136 3.37381C3.44878 3.25068 3.52311 3.14236 3.62535 3.06524C3.72758 2.98813 3.85216 2.94641 3.98021 2.94641Z" stroke="#030000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.07143 7.07141V8.24998C7.07143 8.87514 6.82309 9.47468 6.38104 9.91673C5.93899 10.3588 5.33944 10.6071 4.71429 10.6071C4.08913 10.6071 3.48958 10.3588 3.04753 9.91673C2.60548 9.47468 2.35714 8.87514 2.35714 8.24998V7.07141" stroke="#030000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.7857 7.07141V8.24998C11.7857 8.87514 11.5374 9.47468 11.0953 9.91673C10.6533 10.3588 10.0537 10.6071 9.42857 10.6071C8.80342 10.6071 8.20387 10.3588 7.76182 9.91673C7.31977 9.47468 7.07143 8.87514 7.07143 8.24998V7.07141" stroke="#030000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16.5 7.07141V8.24998C16.5 8.87514 16.2517 9.47468 15.8096 9.91673C15.3676 10.3588 14.768 10.6071 14.1429 10.6071C13.5177 10.6071 12.9182 10.3588 12.4761 9.91673C12.0341 9.47468 11.7857 8.87514 11.7857 8.24998V7.07141" stroke="#030000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width={18} height={18} fill="white" />
          </clipPath>
        </defs>
      </svg>
    </StyleDiv>
  );
};

export default Icon;
