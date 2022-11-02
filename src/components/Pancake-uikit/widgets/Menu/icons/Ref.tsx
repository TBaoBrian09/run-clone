import React from "react";
import styled from 'styled-components';
import { SvgProps } from "../../../components/Svg/types";

const StyleDiv = styled.div`
  padding-right:5px;
`
const Icon: React.FC<SvgProps> = (_props) => {
  return (
    <StyleDiv>
			<svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M9 6.375C8.3175 6.375 6.9375 6.72 6.9375 7.41V10.875H8.0625V14.25H9.9375V10.875H11.0625V7.41C11.0625 6.7275 9.6825 6.375 9 6.375ZM9 1.5C4.8525 1.5 1.5 4.8525 1.5 9C1.5 13.1475 4.8525 16.5 9 16.5C13.1475 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5ZM9 15C5.685 15 3 12.315 3 9C3 5.685 5.685 3 9 3C12.315 3 15 5.685 15 9C15 12.315 12.315 15 9 15Z" fill="black" />
				<path d="M9 6C9.62132 6 10.125 5.49632 10.125 4.875C10.125 4.25368 9.62132 3.75 9 3.75C8.37868 3.75 7.875 4.25368 7.875 4.875C7.875 5.49632 8.37868 6 9 6Z" fill="#323232" />
			</svg>
  </StyleDiv>
  );
};

export default Icon;
