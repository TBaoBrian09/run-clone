import React from "react";
import { useTheme } from "styled-components";
import Heading from "../../components/Heading/Heading";
import getThemeValue from "../../util/getThemeValue";
import { ModalBody, ModalHeader, ModalTitle, ModalContainer, ModalCloseButton, WrapperLogo, Img } from "./styles";
import { ModalProps } from "./types";

interface Proptype extends ModalProps {
    images?:string
}
const ModalWithLogo: React.FC<Proptype> = ({
  title,
  images,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  bodyPadding = "10px",
  headerBackground = "transparent",
  minWidth = "333px",
  ...props
}) => {
  const theme = useTheme();
  return (
    <ModalContainer minHeight="200px" minWidth={minWidth} {...props}>
      <ModalHeader background={getThemeValue(`colors.${headerBackground}`, headerBackground)(theme)}>
        <WrapperLogo>
            <Img src={images} alt="logo-nft"/>
            <Heading>{title} Privileges</Heading>
        </WrapperLogo>
        {!hideCloseButton && <ModalCloseButton onDismiss={onDismiss} />}
      </ModalHeader>
      <ModalBody p={bodyPadding}>{children}</ModalBody>
    </ModalContainer>
  );
};

export default ModalWithLogo;
