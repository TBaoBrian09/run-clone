import React from "react";
import styled, { useTheme } from "styled-components";
import getThemeValue from "../../util/getThemeValue";
import { ModalBody, ModalHeader, ModalContainer, ModalCloseButtonUnbox } from "./styles";
import { ModalProps } from "./types";

const ModalUnbox: React.FC<ModalProps> = ({
  title,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  bodyPadding = "0px",
  headerBackground = "transparent",
  minWidth = "320px",
  ...props
}) => {
  const theme = useTheme();
  return (
    <CsModalContainer  position='relative' minHeight="200px" minWidth={minWidth} {...props}>
      <ModalHeaderCus background={getThemeValue(`colors.${headerBackground}`, headerBackground)(theme)}>
        {!hideCloseButton && <ModalCloseButtonUnbox onDismiss={onDismiss} />}
      </ModalHeaderCus>
      <ModalBody p={bodyPadding}>{children}</ModalBody>
    </CsModalContainer>
  );
};

export default ModalUnbox;

const CsModalContainer = styled(ModalContainer)`
  padding: 0px !important;
  border-radius: 16px;
`

const ModalHeaderCus = styled(ModalHeader)`
  position: absolute;
  top: 10px;
  right: 10px;
  height: 100px;
  width: 100%;
`


