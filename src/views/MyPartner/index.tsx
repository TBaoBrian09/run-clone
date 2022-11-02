import React from 'react'
import styled from 'styled-components'
import { Flex, Text } from '@phamphu19498/runtogether-uikit'
import PageFullWidth from 'components/Layout/PageFullWidth'
import Container from 'components/Layout/Container'
import Header from 'components/HeaderGlobal/Header'
import { useTranslation } from 'contexts/Localization'
import { GetListReferal, GetPartnerConfig } from 'state/account'
import CardPartner from './components/CardPartner'
import Row from './components/Row'
import RowPartner from './components/RowPartner'
import InputReferal from './components/InputReferal'
// eslint-disable-next-line import/no-named-as-default
import UserInfo from './components/UserInfo'
import { definePartner } from './helper'

const MyPartner = () => {
  const { t } = useTranslation()
  const [ partnerConfig ] = GetPartnerConfig();
  const [listreferal] = GetListReferal();
  return (
    <PageFullWidth>
      <Header
        nameTitle="RUN TOGETHER"
        namePlace="Partners"
        imgIcon="./images/runMarketplace/imgBanner.png"
        bgColor="#6C5DD3"
      />
      <CustomContainer>
        <UserInfo />
        <Flex width="100%" mt="1rem" justifyContent="flex-start" flexDirection="column">
          <Flex width="100%" mt="1rem" justifyContent="center" flexDirection="column" alignItems="center">
            <SubHeading>{t('Your Partners')}</SubHeading>
          </Flex>
          <Flex flexDirection="column" mt="1rem" mb="3rem">
            <HeaderTablePartner>
              <Col>
                <Text color="#fff" bold>
                  {t('AVATAR')}
                </Text>
              </Col>
              <Col>
                <Text color="#fff" bold>
                  {t('NAME')}
                </Text>
              </Col>
              <Col>
                <Text color="#fff" bold>
                  {t('LEVEL')}
                </Text>
              </Col>
            </HeaderTablePartner>
           { 
           listreferal.length > 0 ? listreferal?.map((val,index)=>{            
             return (
             <RowPartner
              idRow={index}
              avatar={val?.avatar ? val?.avatar : "./images/account/avatarnull.png"}
              name={val?.name ? val?.name : "No Data"}
              level={val?.partner_role === Number(val?.partner_role) ? definePartner(val?.partner_role): "No Data"}
              commision="10%"
              manipulation="/images/runWorking.png"
            />)
           }) : ""
          }
          </Flex>
        </Flex>

        <Flex width="100%" mt="1rem" justifyContent="center" flexDirection="column" alignItems="center">
          <CustomHeading>{t('Retailers advantages')}</CustomHeading>
          <SubHeading>{t('Preferential policy')}</SubHeading>
        </Flex>
        <Flex flexDirection="column" mt="1rem" mb="5rem">
          <HeaderTable>
            <Col>
              <Text color="#fff" bold>
                {t('LEVEL')}
              </Text>
            </Col>
            <Col>
              <Text color="#fff" bold>
                {t('COMMISSION PER NFT BOX')}
              </Text>
            </Col>
            <Col>
              <Text color="#fff" bold>
                {t('CONDITION')}
              </Text>
            </Col>
          </HeaderTable>
          <Row idRow={0} level="Collaborators" commision="10%" coefficient="" />
          <Row idRow={1} level="TEAM LEADER" commision="5%" coefficient="" />
          <Row idRow={2} level="CLUB" commision="4%" coefficient="" />
          <Row idRow={3} level="PREMIUM" commision="3%" coefficient="5 Collaborators" />
          <Row idRow={4} level="REGION" commision="2%" coefficient="5 Collaborators" />
          <Row idRow={5} level="COUNTRY" commision="5%" coefficient="5 Collaborators" />
        </Flex>
      </CustomContainer>
    </PageFullWidth>
  )
}
export default MyPartner

const CustomContainer = styled(Container)`
  width: 100%;
  @media screen and (max-width: 500px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`
const CustomHeading = styled(Text)`
  font-weight: 700;
  font-size: 48px;
  line-height: 56px;
  @media screen and (max-width: 500px) {
    font-size: 28px;
  } 
  @media screen and (max-width: 320px) {
    font-size: 24px;
  }
`
const SubHeading = styled(Text)`
  font-weight: 700;
  font-size: 32px;
  line-height: 56px;
  @media screen and (max-width: 500px) {
    font-size: 26px;
  }
  @media screen and (max-width: 400px) {
    font-size: 22px;
  }
`
const HeaderTable = styled(Flex)`
  height: 45px;
  align-items: center;
  border-radius: 8px;
  background: #6c5dd3;
  @media screen and (max-width: 500px) {
    display: none;
  }
`

const HeaderTablePartner = styled(HeaderTable)`
  background: #d080ff;
`
const Col = styled.div`
  width: 33.33%;
  display: flex;
  justify-content: center;
  justify-content: center;
  align-items: center;
`
const CustomCol = styled.div`
  max-width: 50%;
  width: 50%;
  @media (max-width: 600px) {
    width: 100%;
    margin: 0;
    /* padding-left:10px;  */
    max-width: 100%;
  }
`
const WrapCountRun = styled.div`
  display: flex;
  align-items: center;
`
const ImgRun = styled.img`
  width: 48px;
`
const BorderLeader = styled.div`
  border: 2px solid #e6e8ec;
  border-radius: 90px;
  padding: 8px 16px;
  gap: 12px;
  width: auto;
  display: flex;
  flex-direction: row;
`
const BgReferal = styled.div`
  background: #f1f2f4;
  border-radius: 16px;
`
const WrapReferal = styled.div``
