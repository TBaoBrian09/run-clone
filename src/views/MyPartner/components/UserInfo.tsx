import React, { useState } from "react";
import { Text, Flex, Button, useModal } from "@phamphu19498/runtogether-uikit";
import styled from "styled-components";
import { useTranslation } from "contexts/Localization";
import { Link } from "react-router-dom";
import copy from "copy-to-clipboard";
import { DecryptsUserInfo } from "config/api/decrypts";
import { GetReferralCode, GetUser,GetParentPartner } from "state/account";
import RegisterModal from "components/Menu/GlobalSettings/RegisterModal";
import { definePartner } from "../helper";


const UserInfo = () =>{
    const { t } = useTranslation()
    const [ user ] = GetUser(true)
    const [isOpenTooltip, setOpenTooltip] = useState(false);
    const [isOpenTooltipLink, setOpenTooltipLink] = useState(false);
    const dataUser = DecryptsUserInfo()   
    const [ referralCode ] = GetReferralCode() 
    const referralLink = dataUser ? `${dataUser?.referral_code.substring(0, 17)}...${dataUser?.referral_code.substring(dataUser?.referral_code.length - 6)}` : null;
    const [partnerparent] = GetParentPartner()
     
    const copyLinkReferralCode = () => {
        if (navigator.clipboard && navigator.permissions) {
          navigator.clipboard.writeText(referralCode).then(() => displayTooltipCode())
        } else if (document.queryCommandSupported('copy')) {
          const ele = document.createElement('textarea')
          ele.value = referralCode
          document.body.appendChild(ele)
          ele.select()
          document.execCommand('copy')
          document.body.removeChild(ele)
          displayTooltipCode()
        }
      }
    
      function displayTooltipCode() {
        setOpenTooltip(true)
        setTimeout(() => {
            setOpenTooltip(false)
        }, 3000)
      }

    const copyLinkReferralLink = () => {
        if (navigator.clipboard && navigator.permissions) {
          navigator.clipboard.writeText(dataUser?.referral_code).then(() => displayTooltipLink())
        } else if (document.queryCommandSupported('copy')) {
          const ele = document.createElement('textarea')
          ele.value = dataUser?.referral_code
          document.body.appendChild(ele)
          ele.select()
          document.execCommand('copy')
          document.body.removeChild(ele)
          displayTooltipLink()
        }
      }
    
      function displayTooltipLink() {
        setOpenTooltipLink(true)
        setTimeout(() => {
            setOpenTooltipLink(false)
        }, 3000)
      }

    return(
        <Container>
            <CustomCol>
                {  partnerparent?.name ? ( 
                        <>
                            <Flex flexWrap="wrap" alignItems="flex-end">
                            <CustomFlex flexDirection="column">
                                    <Text bold>Your superior</Text>
                                </CustomFlex>
                                <CustomFlex flexDirection="column" alignItems="flex-end">
                                    <Text bold>{partnerparent.name}</Text>
                                    <Text color="#80868B" fontSize="12px">{partnerparent.partner_role.en}</Text>
                                </CustomFlex>
                            </Flex> 
                            <Flex>
                                <BorderHr/>
                            </Flex>
                        </>
                    )
                    :  
                    (
                        <>   
                            <Flex>
                                <Text mb="20px"> </Text>
                            </Flex>                              
                        </>
                    ) 
                }            
                <Flex flexWrap="wrap" mt="1rem">
                    <CustomFlex flexDirection="column">
                        <Text bold>{dataUser ? dataUser?.name : 'Your name'}</Text>
                        <Text color="#80868B">{dataUser ? dataUser?.email : ''}</Text>
                    </CustomFlex>
                    <CustomFlex justifyContent="flex-end" mt="5px">
                        <BorderLeader>
                            <Text fontSize="16px" bold>{dataUser ? definePartner(dataUser?.partner_role): 'No Data'}</Text>     
                        </BorderLeader>
                    </CustomFlex>
                </Flex> 
            </CustomCol>
            <Col>
                <BgReferal>
                    <CustomFlex height="86px">
                        <Flex width="100%" flexDirection="column" >
                            <Text textTransform="uppercase" color="#353945" bold>{t("Referral link")}</Text>
                            <InputReferal>
                                {referralLink ?
                                <>
                                    <TextReferralLink>{referralLink}</TextReferralLink>
                                    <ButtonCoppy onClick={copyLinkReferralLink}>
                                        Coppy
                                    </ButtonCoppy>
                                    <Tooltip isTooltipDisplayed={isOpenTooltipLink}>Copied</Tooltip>
                                </>
                                :
                                <TextReferralLink bold>No Data</TextReferralLink>
                                }
                            </InputReferal>
                        </Flex>
                    </CustomFlex>
                    <CustomFlex height="86px">
                        <Flex width="100%" flexDirection="column">
                            <Text textTransform="uppercase" color="#353945" bold>{t("Referral Code")}</Text>
                            <InputReferal>
                                {dataUser ?
                                    <>
                                        <Text bold>{dataUser ? dataUser?.referral_code_invite : ''}</Text>
                                        <ButtonCoppy onClick={copyLinkReferralCode}>
                                            Coppy
                                        </ButtonCoppy>
                                        <Tooltip isTooltipDisplayed={isOpenTooltip}>Copied</Tooltip>
                                    </>
                                    :
                                    <Text bold>No Data</Text>
                                }
                            </InputReferal>
                        </Flex>
                    </CustomFlex>
                </BgReferal> 
            </Col>
        </Container>
    )
}
export default UserInfo

const CustomTotalReward = styled(Flex)`
@media(max-width:600px){
    flex-direction:column;
}

`


const Container = styled(Flex)`
    width:100%;
    flex-wrap:wrap;
    height: auto;
`

const WrapCountRun = styled.div`
    display:flex;
    align-items: center;
    @media (max-width:600px){
        padding-top:10px;
    }
`
const Col = styled(Flex)`
    flex-direction:column;
    padding-right:1rem;
    padding-left:1rem;
    width:50%;
    @media screen and (max-width: 1080px) {
        width: 100%;
        padding:0;
    }
`
const CustomCol = styled(Col)`
    padding-right:.5rem;
    padding-left:.5rem;
    @media screen and (max-width: 600px) {
        padding-left:5px;
    } 
`
const ImgRun = styled.img`
    width:48px;
`
const BorderLeader = styled.div`
    border: 2px solid #E6E8EC;
    border-radius: 90px;
    padding: 1px 15px;
    gap: 12px;
    height:30px;
    @media screen and (max-width: 1080px) {
        margin-top:1rem;
    }
`
const BorderHr = styled.hr`
  border: 1px solid #E6E8EC;
  width:100%;
  /* height:1px;  */
`

const BgReferal = styled.div`
    background: #F1F2F4;
    border-radius: 16px;
    height: 100%;
    width: 100%;
    padding:15px;
    display:flex;
    flex-wrap: wrap;
    align-items: center;
    @media screen and (max-width: 1080px) {
        margin-top:1.5rem;
    }
    @media screen and (max-width: 600px) {
        height: 230px;
        justify-content: space-between;
    }
`

const CustomFlex = styled(Flex)`
    width:50%;
    @media screen and (max-width: 600px) {
        width:100%;
        display:flex;
        justify-content:flex-start;
        align-items:flex-start;
    }
`
const InputReferal = styled.div`
    width: 296px;
    height: 60px;
    background: #FCFCFD;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left:10px;
    padding-right:10px;
    position: relative;
    margin-top: 10px;
    @media screen and (max-width: 600px) {
        width: 100%;      
    }
`
const ButtonCoppy = styled.button`
    background: #23262F;
    border-radius: 4px;
    width: 61px;
    height: 26px;
    display: flex;
    font-size: 12px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color:#fff;
    text-transform: uppercase;
`
const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline-block' : 'none')};
  position: absolute;
  padding: 8px;
  top: -35px;
  right: -15px;
  text-align: center;
  background-color: #fff;
  color: #000;
  border-radius: 16px;
  width: 100px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
`

const TextReferralLink = styled(Text)`
 
  cursor:pointer;
  @media screen and (max-width: 320px) {
    font-size: 12px;
  }
`