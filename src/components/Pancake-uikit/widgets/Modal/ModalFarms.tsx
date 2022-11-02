import { Flex, Heading, ModalBackButton, ModalBody, ModalCloseButton, ModalContainer, ModalHeader, ModalTitle, Text, useModal } from "@phamphu19498/runtogether-uikit";
import LoginModal from "components/Menu/GlobalSettings/LoginModal";
import { ModalProps } from "components/Pancake-uikit";
import getThemeValue from "components/Pancake-uikit/util/getThemeValue";
import React from "react";
import { Link } from "react-router-dom";
import styled, { useTheme } from "styled-components";


const Modal: React.FC<ModalProps> = ({
  title,
  text,
  toModal,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  bodyPadding = "1px",
  headerBackground = "transparent",
  minWidth = "320px",
  ...props
}) => {
  const theme = useTheme();


  return (
    <ModalContainer minHeight="200px" minWidth={minWidth} {...props}>
      <ModalHeader background={getThemeValue(`colors.${headerBackground}`, headerBackground)(theme)}>
        <ModalTitle>
          {onBack && <ModalBackButton onBack={onBack} />}
          <Heading mt='1rem' mb='2rem'>{title}</Heading>
        </ModalTitle>
        {!hideCloseButton && <ModalCloseButton onDismiss={onDismiss} />}
      </ModalHeader>
      <ModalBody p={bodyPadding}>{children}</ModalBody>
    </ModalContainer>
  );
};

export default Modal;

export const WrapLink = styled(Flex)``

export const TransferModal = styled(Text)`
`


