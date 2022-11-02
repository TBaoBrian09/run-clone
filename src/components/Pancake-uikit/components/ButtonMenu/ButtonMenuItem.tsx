import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import { BaseButtonProps, PolymorphicComponent, variants } from "../Button/types";
import { ButtonMenuItemProps } from "./types";

interface InactiveButtonProps extends BaseButtonProps {
  forwardedAs: BaseButtonProps["as"];
}

const InactiveButton: PolymorphicComponent<InactiveButtonProps, "button"> = styled(Button)<InactiveButtonProps>`
  background-color: transparent;
  color: ${({ theme, variant }) => (variant === variants.PRIMARY ? theme.colors.textTab : theme.colors.textTab)};
  
`;
const ActiveButton: PolymorphicComponent<InactiveButtonProps, "button"> = styled(Button)<InactiveButtonProps>`
  background: ${({ theme }) => (theme.isDark ? 'linear-gradient(291.54deg, #101133 27.04%, #232441 86.39%)' : '#fff')};
  box-sizing: border-box;
  box-shadow: 4px 2px 1px rgba(8, 9, 26, 0.2);
  border-radius: 48px !important;
  color: ${({ theme, variant }) => (theme.isDark ? "#FDB533" : "#000" )};
  
`;  

const ButtonMenuItem: PolymorphicComponent<ButtonMenuItemProps, "button"> = ({
  isActive = false,
  variant = variants.PRIMARYDARK,
  as,
  ...props
}: ButtonMenuItemProps) => {
  if (!isActive) {
    return <InactiveButton forwardedAs={as} variant={variant} {...props} />;
  }

  return <ActiveButton forwardedAs={as} variant={variant} {...props} />;
};

export default ButtonMenuItem;
