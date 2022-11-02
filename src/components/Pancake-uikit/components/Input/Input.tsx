import styled, { DefaultTheme } from "styled-components";
import { InputProps, scales } from "./types";

interface StyledInputProps extends InputProps {
  theme: DefaultTheme;
}

/**
 * Priority: Warning --> Success
 */
const getBoxShadow = ({ isSuccess = false, isWarning = false, theme }: StyledInputProps) => {
  if (isWarning) {
    return theme.shadows.warning;
  }

  if (isSuccess) {
    return theme.shadows.success;
  }

  return theme.shadows.inset;
};

const getHeight = ({ scale = scales.MD }: StyledInputProps) => {
  switch (scale) {
    case scales.SM:
      return "32px";
    case scales.LG:
      return "48px";
    case scales.MD:
    default:
      return "40px";
  }
};

const Input = styled.input<InputProps>`
  background: ${({ theme }) => (theme.isDark ? theme.colors.input : '#e2e2e2' )};
  border: 0;
  border-radius: 5px;
  color: ${({ theme }) => (theme.isDark ? "#fff" : theme.colors.text )};
  display: block;
  font-size: 16px;
  height: ${getHeight};
  outline: 0;
  padding: 0 16px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};

  &::placeholder {
    color: ${({ theme }) => (theme.isDark ? "#fff" : theme.colors.text )};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundDisabled};
    box-shadow: none;
    color: ${({ theme }) => (theme.isDark ? theme.colors.textDisabled : theme.colors.text )};
    cursor: not-allowed;
  }

  &:focus:not(:disabled) {
    // box-shadow: ${({ theme }) => theme.shadows.focus};
    // border: 1px solid ${({ theme }) => theme.colors.primaryDark};
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

Input.defaultProps = {
  scale: scales.MD,
  isSuccess: false,
  isWarning: false,
};

export default Input;
