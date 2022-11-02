import React, { useState, useEffect } from "react";
import { Text, Flex, Button, Modal, CloseIcon } from "@phamphu19498/runtogether-uikit";
import { Overlay } from "components/Pancake-uikit";
import styled from "styled-components";
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from "contexts/Localization";
import { GetUser } from 'state/account'


export const ModalAlert = () => {
    const { t } = useTranslation()
    const userAddress = sessionStorage.getItem('userAddress')
    const isDifferent = sessionStorage.getItem('isDifferent')
    const [ user ] = GetUser(true)
    const token = localStorage.getItem('serviceToken');
    const { account } = useWeb3React()
    function handleCilck(){
      sessionStorage.setItem('isDifferent', "false");
      sessionStorage.setItem('isClose', "false");
    }
    const [windowSize, setWindowSize] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])
    const isClose = sessionStorage.getItem('isClose');
    useEffect(() => {
      sessionStorage.setItem('isClose', "true")
      if( account && token && user?.address ){
        if (account.toLocaleUpperCase() !== userAddress.toLocaleUpperCase()){
          sessionStorage.setItem('isDifferent', "true");
        }
      }
    }, [account]) // eslint-disable-line react-hooks/exhaustive-deps
    function renderAddress(address){
      if ( address ) {
        if (windowSize>1080){
          return address
        } return `${address.substring(0, 6)}...${address.substring(address.length - 6)}`
      }
      return "No data"
    }
    return(
      <>
        { (isDifferent === "true" && isClose === "true") &&
          <ModalWrapper>
              <CustomContainer>
                    <ContainerButton onClick={handleCilck}>
                      <CloseIcon/>
                    </ContainerButton>
                  <Text textAlign="center" color="failure" mt="1rem" bold fontSize="20px">{t("The current user wallet address is not the same as the connect wallet address. ")}</Text>
                  <Text textAlign="center" color="failure" bold fontSize="20px">{t("Please connect the correct wallet")}</Text>
                  <ContainerAddress>
                      <Text width="100%" textAlign="center">Your address connected</Text>
                      <Text mt="10px" width="100%" textAlign="center">{renderAddress(user?.address)}</Text>
                  </ContainerAddress>
              </CustomContainer>
          </ModalWrapper>
        }
      </>
    )
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndices.modal - 1};
  background: rgba(220, 224, 225, 0.601);
`;
const CustomContainer = styled(Flex)`
    width: 100%;
    max-width: 500px;
    height: 300px;
    border-radius: 16px;
    background:#fff;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    z-index:50;
    position:relative;
    padding:15px;
    @media screen and (max-width: 600px) {
      width:350px;
      height: 400px;
      padding:0px 10px 0px 10px;
    }
`
const ContainerButton = styled(Flex)`
  position: absolute;
  top: 15px;
  right: 15px;
  background: black;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    fill: #fff;
  }
`
const ContainerAddress = styled(Flex)`
    width:100%;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    border:2px solid rgba(101, 100, 101, 0.184);
    border-radius:12px;
    margin-top:10px;
    padding:15px 0px 15px 0px;
`