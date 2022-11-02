import React, { useState, useEffect , useCallback} from "react";
import styled from "styled-components";
import { ButtonMenu, ButtonMenuItem } from '@phamphu19498/runtogether-uikit'
import { useTranslation } from 'contexts/Localization'
import { ModalBody, ModalHeader, ModalContainer, ModalCloseButton, ModalBackButton, ModalTitleLogo } from "./styles";
import { ModalProps } from "./types";

interface Proptype extends ModalProps {
  onToggle?: ( id:number) => void
}

const styleActive = { background: '#49A2F2', color: '#fff', borderRadius:"40px"}

const ModalTransferNFT: React.FC<Proptype> = ({
  onDismiss,
  onBack,
  onToggle,
  children,
  hideCloseButton = false,
  bodyPadding = "8px",
  headerBackground = "transparent",
  minWidth = "340px",
  ...props
}) => {

  const [ activeIndex, setActiveIndex ] = useState(0)
  const { t } = useTranslation()
  const handleClick = (newIndex) => {setActiveIndex(newIndex); onToggle(newIndex)}

  return (
    <CustomModalContainer minWidth={minWidth} {...props}>
      <ModalHeader>
        <ModalTitleLogo>
            <Wrapper>
                <CustomButtonMenu activeIndex={activeIndex} scale="sm" variant="primary"  onItemClick={handleClick}>
                    <CustomButtonMenuItem style={activeIndex === 0 ? styleActive : undefined}>
                        Redeem
                    </CustomButtonMenuItem>
                    <CustomButtonMenuItem style={activeIndex === 1 ? styleActive : undefined}>
                        Transfer
                    </CustomButtonMenuItem>
                    <CustomButtonMenuItem style={activeIndex === 2 ? styleActive : undefined}>
                        Sell
                    </CustomButtonMenuItem>
                </CustomButtonMenu>
            </Wrapper>
        </ModalTitleLogo>
        {!hideCloseButton && <ModalCloseButton onDismiss={onDismiss} />}
      </ModalHeader>
      <ModalBody p={bodyPadding}>{children}</ModalBody>
    </CustomModalContainer>
  );
};

export default ModalTransferNFT;

const Wrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items: center;
    width:100%;
    background: ${({ theme }) => theme.colors.modalHeader};
    display: flex;
    padding: 12px 24px;
`
const CustomButtonMenu = styled(ButtonMenu)`
    border-radius: 40px;
    background:${({ theme }) =>  theme.colors.background};
    @media only screen and (max-width: 600px) {
        margin-left:-1rem;
    }
`
const CustomButtonMenuItem = styled(ButtonMenuItem)`
    display:flex;
    align-items:center;
    justify-content:center;
    height:35px;
    width: 112px;
    color:${({ theme }) => theme.colors.text};
    @media only screen and (max-width: 600px) {
        width: 100px;
    }
`
const CustomModalContainer = styled(ModalContainer)`
  @media only screen and (max-width: 600px) {
    width: 100% !important;
  }
`