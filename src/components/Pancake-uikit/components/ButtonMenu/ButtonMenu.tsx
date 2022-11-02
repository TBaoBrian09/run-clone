import React, { cloneElement, Children, ReactElement } from "react";
import styled, { DefaultTheme } from "styled-components";
import { space } from "styled-system";
import { scales, variants } from "../Button/types";
import { ButtonMenuProps } from "./types";

interface StyledButtonMenuProps extends ButtonMenuProps {
  theme: DefaultTheme;
}

const getBackgroundColor = ({ theme, variant }: StyledButtonMenuProps) => {
  return theme.colors[variant === variants.PRIMARYDARK ? "backgroundTab" : "tertiary"];
};

const getBorderColor = ({ theme, variant }: StyledButtonMenuProps) => {
  return theme.colors[variant === variants.PRIMARYDARK ? "borderTab" : "disabled"];
};

const StyledButtonMenu = styled.div<StyledButtonMenuProps>`
background:${({ theme }) => (theme.isDark ? 'linear-gradient(330.77deg, #37385A 0.25%, #212240 90.42%)' : 'linear-gradient(330.77deg, #EFF0FF 0.25%, #E9ECFC 90.42%)')};
border:${({ theme }) => (theme.isDark ? '#37385A' : 'none')};
box-sizing: border-box;
box-shadow: inset 0px -2px 4px rgba(255, 255, 255, 0.16), inset 4px 3px 3px rgba(0, 0, 0, 0.28);
border-radius: 40px;
  display: ${({ fullWidth }) => (fullWidth ? "flex" : "inline-flex")};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

  & > button,
  & > a {
    margin-left: ${({ fullWidth }) => (fullWidth ? "0px" : "0px")}; // To avoid focus shadow overlap
    flex: ${({ fullWidth }) => (fullWidth ? 1 : "auto")};
  }

  & > button + button,
  & > a + a {
    margin-left: 2px; // To avoid focus shadow overlap
  }

  & > button,
  & a {
    box-shadow: none;
    width: 120px;
    border-radius: 0;

    @media only screen and (max-width: 360px){
      width: 59px;
    }
    @media only screen and (min-width: 361px) and (max-width: 375px) {
      max-width: 67px;

    }
    @media only screen and (min-width: 376px) and (max-width: 480px){
      width: 80px;
    }
  }
  & > a:first-child {
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
  }
  & a:last-child, & span:last-child a {
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    border-right: none;
  }

  ${({ disabled, theme, variant }) => {
    if (disabled) {
      return `
        opacity: 0.5;

        & > button:disabled {
          background-color: transparent;
          color: ${variant === variants.PRIMARY ? theme.colors.primary : theme.colors.textSubtle};
        }
    `;
    }
    return "";
  }}
  ${space}

  @media only screen and (max-width: 480px){
    max-width: 160px;
    margin-left: 2vw;
  }
`;

const ButtonMenu: React.FC<ButtonMenuProps> = ({
  activeIndex = 0,
  scale = scales.MD,
  variant = variants.PRIMARY,
  onItemClick,
  disabled,
  children,
  fullWidth = false,
  ...props
}) => {
  return (
    <StyledButtonMenu disabled={disabled} variant={variant} fullWidth={fullWidth} {...props}>
      {Children.map(children, (child: ReactElement, index) => {
        return cloneElement(child, {
          isActive: activeIndex === index,
          onClick: onItemClick ? () => onItemClick(index) : undefined,
          scale,
          variant,
          disabled,
        });
      })}
    </StyledButtonMenu>
  );
};

export default ButtonMenu;
