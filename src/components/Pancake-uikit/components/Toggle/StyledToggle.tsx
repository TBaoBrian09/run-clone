import styled from "styled-components";
import { ToggleProps, HandleProps, InputProps, ScaleKeys, scales } from "./types";

const scaleKeyValues = {
  sm: {
    handleHeight: "16px",
    handleWidth: "18px",
    handleLeft: "2px",
    handleTop: "2px",
    checkedLeft: "calc(100% - 18px)",
    toggleHeight: "20px",
    toggleWidth: "36px",
  },
  md: {
    handleHeight: "20px",
    handleWidth: "20px",
    handleLeft: "3px",
    checkedLeft: "calc(100% - 23px)",
    toggleHeight: "26px",
    toggleWidth: "60px",
  },
  lg: {
    handleHeight: "32px",
    handleWidth: "32px",
    handleLeft: "4px",
    handleTop: "4px",
    checkedLeft: "calc(100% - 36px)",
    toggleHeight: "40px",
    toggleWidth: "72px",
  },
};

const getScale =
  (property: ScaleKeys) =>
  ({ scale = scales.LG }: ToggleProps) => {
    return scaleKeyValues[scale][property];
  };

export const Handle = styled.div<HandleProps>`
  background-color: #FFFFFF;
  border-radius: 50%;
  cursor: pointer;
  height: ${getScale("handleHeight")};
  left: ${getScale("handleLeft")};
  position: absolute;
  top: ${getScale("handleTop")};
  transition: left 200ms ease-in;
  width: ${getScale("handleWidth")};
  z-index: 1;
`;

export const Input = styled.input<InputProps>`
  cursor: pointer;
  opacity: 0;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 3;

  &:checked + ${Handle} {
    left: ${getScale("checkedLeft")};
    background-color:  #FFFFFF;
  }

  &:focus + ${Handle} {
   
  }

  &:hover + ${Handle}:not(:disabled):not(:checked) {
   
  }
`;

const StyledToggle = styled.div<ToggleProps>`
  align-items: center;
  background-color: ${({ checked }) => checked ? "#FF592C" : "#dadada"};
  border-radius: 24px;
  height: 34px;
  cursor: pointer;
  display: inline-flex;
  height: ${getScale("toggleHeight")};
  position: relative;
  transition: background-color 200ms;
  width: ${getScale("toggleWidth")};
`;

export default StyledToggle;
