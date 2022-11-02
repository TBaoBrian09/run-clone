import styled from "styled-components";
import { CheckboxProps, scales } from "./types";

const getScale = ({ scale }: CheckboxProps) => {
  switch (scale) {
    case scales.SM:
      return "24px";
    case scales.MD:
    default:
      return "32px";
  }
};

const CheckboxV2 = styled.input.attrs({ type: "checkbox" })<CheckboxProps>`
  appearance: none;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  display: inline-block;
  height: ${getScale};
  width: ${getScale};
  vertical-align: middle;
  transition: background-color 0.2s ease-in-out;
  border: 0;
  border-radius: 50%;
  border:3px solid ${({ theme, isChecked }) => isChecked === false ? theme.colors.textSecondary : "#56A9BB" };
  box-sizing: border-box;
  &:after {
    content: "";
    position: absolute;
    border-bottom: 3px solid;
    border-left: 3px solid;
    border-color: ${({ isChecked }) => isChecked === false ? "transparent" : "#56A9BB" };
    top: 30%;
    left: 0;
    right: 0;
    width: 60%;
    height: 30%;
    margin: auto;
    transform: rotate(-50deg);
    transition: border-color 0.2s ease-in-out;
  }

//   &:checked {
//     border-color: #56A9BB !important;
//     &:after {
//       border-color: #56A9BB;
//     }
//   }

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;

CheckboxV2.defaultProps = {
  scale: scales.MD,
};

export default CheckboxV2;
