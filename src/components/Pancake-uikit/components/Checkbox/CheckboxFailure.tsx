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

const CheckboxFailure = styled.input.attrs({ type: "checkbox", disabled:true })<CheckboxProps>`
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
  border:3px solid ${({ theme }) => theme.colors.failure};
  box-sizing: border-box;
  &:after {
    content: "";
    background:${({ theme }) => theme.colors.failure};;
    clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
    position: absolute;
    top:27%;
    left: 0;
    right: 0;
    width: 50%;
    height: 50%;
    margin: auto;
    transition: border-color 0.2s ease-in-out;
  }
  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;

CheckboxFailure.defaultProps = {
  scale: scales.MD,
};

export default CheckboxFailure;
