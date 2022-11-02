import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Flex, Text, useMatchBreakpoints, useModal } from '@phamphu19498/runtogether-uikit'
import { Heading } from 'components/Pancake-uikit'
import PageFullWidth from 'components/Layout/PageFullWidth'
import Container from 'components/Layout/Container'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import MembershipHeader from './components/MembershipHeader'
import { Processes, Conditions, YourRight } from './config'
import Process from './components/Process'
import Condition from './components/Condition'
import RowYourRights from './components/YourRights'

import { fetchDataBountyPublic } from './hooks/fetchDataBounty'

const BodyWrapper = styled.div`
  margin-top: 32px;
  position: relative;
  display: flex;
  border-radius: 20px;
  flex-direction: column;

  .header-wrapper {
    text-align: center;
    padding: 24px;
    h2 {
      text-transform: uppercase;
    }
  }
  @media only screen and (max-width: 1025px) {
    padding:0px;
    .header-wrapper{
      padding:5px;
      margin-bottom:20px;
    }
  }
`

const ProcessesWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
    @media only screen and (max-width: 1025px) {
      flex-direction:row !important;
      flex-wrap:wrap;
      justify-content: space-around;
      width:100%;
      padding:0px;
      .process-object {
        width: 80%;
        margin-bottom: 25px;
        padding:0px !important;
    }
   
  }
`

const ConditionWrapper = styled.div`
  padding-top:1.75rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-wrap:wrap;
  width:100%;
  @media only screen and (max-width: 1280px) and (min-width: 900px){
    justify-content: space-around;
  }
  @media only screen and (max-width: 800px){
    justify-content: center;
  }
`

const Colreverse = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
`
const CustomFlex = styled(Flex)`
  @media only screen and (max-width: 1080px) {
    display:none;
  }
`
const CustomContainer = styled(Container)`
  @media only screen and (max-width: 600px) {
    padding-left:0px;
    padding-right:0px;
  }
`
const CustomHeading = styled(Text)`
  @media only screen and (max-width: 600px) {
    padding-left:20px;
    
  }
`
const Membership = () => {
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false
  const { account } = useWeb3React()

  const processes = Processes(t)
  const [conditions, setConditions] = useState(Conditions)
  const YourRights = YourRight(t)
  const { isDark } = useTheme()

  useEffect(() => {
    async function fetchDataMembership() {
      const result = await fetchDataBountyPublic()
      setConditions(result)
    }
    fetchDataMembership()

  }, [account, t])
  
  const ListConditions = conditions.sort((a, b) => (a.order_id - b.order_id))
  return (
    <PageFullWidth>
      <MembershipHeader 
        pagetitle={t("Membership")}
        title={t("Become a member to enjoy more interests")}
      />
      <CustomContainer>
        <Colreverse>
          <BodyWrapper>
            <CustomHeading fontSize='32px' bold>{t("NFT Collections")}</CustomHeading>
            <ConditionWrapper>
              {ListConditions.map((item) => {
                return (
                  <Condition 
                    title={item.title} 
                    backgroundurl={item.backgroundurl} 
                    DataRemaining={item.Remaining} 
                    backgroundReamining={item.backgroundRemaining} 
                    ConditionImg={item.image}
                    ConditionName={item.title}
                    LTDRequired={item.ltdRequired}
                    Maximumsupply={item.maxarmorial}
                    contractAddress={item.contractAddress}
                    maxNftPerUser={item.Maximumsupply}
                  />
                )
              })}
            </ConditionWrapper> 
            <RowYourRights data={YourRights}/>
            <CustomFlex style={{justifyContent:"flex-start"}} paddingLeft="2rem" mt="15px">
                    <Text mt="10px" color="textSecondary" textAlign="left" width="80%">
                        * {t("Membership NFTs are redeemable by the original owners but forfeit their redeemability after transferring ownership.")}
                    </Text>
                </CustomFlex>
                <CustomFlex style={{justifyContent:"flex-start"}} paddingLeft="2rem">
                    <Text mt="10px" color="textSecondary" textAlign="left" width="80%">
                    {t("A 1.25% fee will be applied when redeeming the NFTs for LTD.")}
                    </Text>
                </CustomFlex>
          </BodyWrapper>
          <BodyWrapper>
            <ProcessesWrapper>
              {processes.map((item) => {
                return (
                  <Process image={item.image} description={item.description} title={item.title} />
                )
              })}
            </ProcessesWrapper>
            </BodyWrapper>
        </Colreverse>
      </CustomContainer>
      
    </PageFullWidth>
  )
}

export default Membership
