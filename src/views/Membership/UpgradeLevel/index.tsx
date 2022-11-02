import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import PageFullWidth from 'components/Layout/PageFullWidth';
import Container from 'components/Layout/Container';
import { useTranslation } from 'contexts/Localization'
import  MembershipHeader from '../components/MembershipHeader'
import Header from './components/Header'
import Body from './components/Body'

const CustomContainer = styled(Container)`
  margin-top:2rem;
  @media only screen and (max-width: 600px) {
    padding-left:0px;
    padding-right:0px;
  }
`
const UpgradeLevel = () => {
  const { t } = useTranslation()
  const { level }: { level: string } = useParams()
  return (
    <PageFullWidth>
       <MembershipHeader 
        pagetitle={t("Membership")}
        title={t("Become a member to enjoy more interests")}
        subtitle={t("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")}
      />
      <CustomContainer>
        <Header/>
        <Body level={level}/>
      </CustomContainer>
    </PageFullWidth>
  )
}

export default UpgradeLevel
