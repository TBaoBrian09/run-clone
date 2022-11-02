import React from "react";
import styled from "styled-components";
import { variant as systemVariant, space } from "styled-system";
import { WarningIcon, ErrorIcon } from "../Svg";
import { Box } from "../Box";
import { MessageProps } from "./types";
import variants from "./theme";

const Icons = {
  warning: WarningIcon,
  danger: ErrorIcon,
};

const MessageContainer = styled.div<MessageProps>`
  display: flex;
  background: linear-gradient(90.49deg, rgba(255, 255, 255, 0.06) 6.72%, rgba(255, 255, 255, 0.01) 77.46%) !important;
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 16px;
  

  ${space}
  ${systemVariant({
    variants,
  })}
`;

const Message: React.FC<MessageProps> = ({ children, variant, icon, ...props }) => {
  const Icon = Icons[variant];
  return (
    <MessageContainer variant={variant} {...props}>
      <Box mr="12px">{icon ?? <Icon color={variants[variant].borderColor} width="24px" />}</Box>
      {children}
    </MessageContainer>
  );
};

export default Message;
