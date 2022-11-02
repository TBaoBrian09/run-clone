import styled, { DefaultTheme } from "styled-components";
import { space, variant } from "styled-system";
import { Colors } from "../../theme/types";
import { scaleVariants, styleVariants } from "./theme";
import { TagProps, variants } from "./types";

interface ThemedProps extends TagProps {
  theme: DefaultTheme;
}

const getOutlineStyles = ({ outline, theme, variant: variantKey = variants.PRIMARY }: ThemedProps) => {
  if (outline) {
    const themeColorKey = styleVariants[variantKey].backgroundColor as keyof Colors;
    const color = theme.colors[themeColorKey];

    return `
      color: ${color};
      background: transparent;
      border: 2px solid ${color};
    `;
  }

  return "";
};

export const StyledTag = styled.div<ThemedProps>`
  align-items: center;
  border-radius: 16px;
  color: #07BFB4;
  display: inline-flex;
  font-weight: 700;
  white-space: nowrap;
  @media only screen and (max-width: 600px) {
  font-size:12px !important;
  }
  
  & > svg {
    fill: currentColor;
  }

  ${variant({
    prop: "scale",
    variants: scaleVariants,
  })}
  ${variant({
    variants: styleVariants,
  })}
  ${space}

  ${getOutlineStyles}
`;

export default null;
