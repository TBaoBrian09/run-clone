import { Flex, Heading, ModalBackButton, ModalBody, ModalCloseButton, ModalContainer, ModalHeader, ModalTitle, Text, useModal } from "@phamphu19498/runtogether-uikit";
import LoginModal from "components/Menu/GlobalSettings/LoginModal";
import { ModalProps } from "components/Pancake-uikit";
import getThemeValue from "components/Pancake-uikit/util/getThemeValue";
import React from "react";
import { Link } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { CsModalHeader } from "./styles";
// import Heading from "../../components/Heading/Heading";
// import getThemeValue from "../../util/getThemeValue";
// import { ModalBody, ModalHeader, ModalTitle, ModalContainer, ModalCloseButton, ModalBackButton } from "./styles";
// import { ModalProps } from "./types";

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

  const isTitleLogin = title === 'Login'


  return (
    <ModalContainer minHeight="200px" minWidth={minWidth} {...props}>
      <ModalHeader background={getThemeValue(`colors.${headerBackground}`, headerBackground)(theme)}>
        <ModalTitle>
          {onBack && <ModalBackButton onBack={onBack} />}
          <Heading>{title}</Heading>
          {/* <WrapLink>
           <Text>{text}</Text>
           <TransferModal onClick={onPresentRegisterModal}/>
          </WrapLink> */}
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


