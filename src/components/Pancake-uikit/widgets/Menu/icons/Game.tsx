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
        <path d="M10.6875 7.59375H12.9375" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.0625 7.59375H7.3125" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.1875 6.46875V8.71875" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12.0951 3.91919L5.90658 3.93748C5.04696 3.93755 4.21482 4.24041 3.55626 4.7929C2.89769 5.34539 2.45478 6.1122 2.30528 6.95872L2.30588 6.95883L1.15526 12.8765C1.08258 13.2889 1.14324 13.7136 1.32844 14.0892C1.51363 14.4647 1.81371 14.7714 2.1851 14.9647C2.55648 15.158 2.97983 15.228 3.39366 15.1643C3.80748 15.1006 4.19024 14.9067 4.48633 14.6106L4.48621 14.6105L7.52621 11.25L12.0951 11.2317C13.0648 11.2317 13.9947 10.8465 14.6804 10.1608C15.3661 9.47512 15.7513 8.54514 15.7513 7.57544C15.7513 6.60574 15.3661 5.67576 14.6804 4.99008C13.9947 4.3044 13.0648 3.91919 12.0951 3.91919V3.91919Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.6957 6.94055L16.8454 12.8766C16.9181 13.2889 16.8574 13.7137 16.6722 14.0892C16.487 14.4647 16.187 14.7714 15.8156 14.9647C15.4442 15.1581 15.0208 15.228 14.607 15.1643C14.1932 15.1006 13.8104 14.9067 13.5143 14.6107L13.5145 14.6105L10.4766 11.2382" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </StyleDiv>
  );
};

export default Icon;
