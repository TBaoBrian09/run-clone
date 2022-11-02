import React from "react";
import styled from "styled-components";
import Flex from "../../components/Box/Flex";
import { Box } from "../../components/Box";
import { ArrowBackIcon, CloseIcon } from "../../components/Svg";
import { IconButton } from "../../components/Button";
import { ModalProps } from "./types";

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  background: ${({ theme }) => theme.colors.modalHeader};
  display: flex;
  padding: 0;
`;
export const ModalHeaderTab = styled.div<{ background?: string }>`
  align-items: center;
  background: ${({ theme }) => theme.colors.modalHeader};
  display: flex;
  padding:0;
`;

export const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
`;

export const ModalBody = styled(Flex)`
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.backgroundModal};
  @media only screen and (max-width: 550px) {
    padding-bottom:20px;
  }
  
`;

export const ModalCloseButton: React.FC<{ onDismiss: ModalProps["onDismiss"] }> = ({ onDismiss }) => {
  return (
    <IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog">
      <CloseIcon color="primary" />
    </IconButton>
  );
};

export const ModalBackButton: React.FC<{ onBack: ModalProps["onBack"] }> = ({ onBack }) => {
  return (
    <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
      <ArrowBackIcon color="primary" />
    </IconButton>
  );
};

export const ModalContainer = styled(Box)<{ minWidth: string }>`
  overflow: hidden;
  background: ${({ theme }) => theme.modal.background};
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 5px;
  width: 100%;
  max-height: 100vh;
  z-index: ${({ theme }) => theme.zIndices.modal};

  ${({ theme }) => theme.mediaQueries.xs} {
    width: auto;
    min-width: ${({ minWidth }) => minWidth};
    max-width: 100%;
  }
`;
export const ModalTitleLogo = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    width:100%;
    padding:15px 0 5px 0;
    > h2 {
      font-size:18px !important;
      font-weight:700;
      margin-top:10px;
    }
`
export const WrapperLogo = styled.div`
  display:flex;
  flex-direction: row;
  justify-content:flex-start;
  align-items: center;
  width:100%;
  margin-left:20px;
  > h2 {
    color:${({ theme }) => theme.colors.text};
    font-weight: bold;
    font-size: 22px;
  }
  @media only screen and (max-width: 550px) {
    margin-left:10px;
  }
`

export const Img = styled.img`
  width: 50px;
  height: 50px;
  margin-right:10px;
`

export const ModalCloseButtonUnbox: React.FC<{ onDismiss: ModalProps["onDismiss"] }> = ({ onDismiss }) => {
  return (
    <Cusbutton variant="text" onClick={onDismiss} aria-label="Close the dialog">
      <CloseIcon color="#ffffff" />
    </Cusbutton>
  );
};

const Cusbutton = styled(IconButton)`
    position: absolute;
    top: 0px;
    right: 0px;
    background: black;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    z-index: 99;
`
