import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Heading, IconButton, ArrowBackIcon, NotificationDot } from 'components/Pancake-uikit'
import { Link } from 'react-router-dom'
import { useExpertModeManager } from 'state/user/hooks'
import GlobalSettings from 'components/Menu/GlobalSettings/ControlSetting'
import Transactions from './Transactions'
import QuestionHelper from '../QuestionHelper'

interface Props {
  title: string
  subtitle: string
  helper?: string
  backTo?: string
  noConfig?: boolean
}

const AppHeaderContainer = styled.div`
  /* align-items: center; */
  /* justify-content: space-between; */
  width: 100%;
  margin-bottom: 36px;
  /* padding-left:20px;
  padding-right:20px; */
  background: '#fff';
  /* height: 98px; */
  display: block;
  border-radius: 5px 5px 0px 0px;
`

const HeadingDetail = styled.div`
  font-weight: 700;
  font-size: 48px;
  line-height: 41px;
  letter-spacing: -0.114286px;
  color: ${({ theme }) => (theme.isDark ? theme.colors.textSubtle : '#202224')};
  text-align: center;
  @media (max-width:600px){
    font-size:36px;
  }
`

const DetailDescription = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-style: normal;
`

const ImageFlex = styled.div`
  img {
    filter: ${({ theme }) =>
      theme.isDark
        ? 'invert(64%) sepia(7%) saturate(770%) hue-rotate(180deg) brightness(90%) contrast(88%)'
        : 'invert(0%) sepia(0%) saturate(4728%) hue-rotate(336deg) brightness(86%) contrast(107%)'};
  }
`
const CustomFlex = styled(Flex)`
  @media screen and (max-width: 600px) {
    padding: 0px;
  }
`
const WrapArrBack = styled.div`
@media (max-width:600px){
   margin:-1px 9px;
}

` 


const AppHeader: React.FC<Props> = ({ title, subtitle, helper, backTo, noConfig = false }) => {
  const [expertMode] = useExpertModeManager()

  return (
    <AppHeaderContainer>
      {backTo && (
        <WrapArrBack>
          <IconButton as={Link} to={backTo} >
            <ArrowBackIcon width="32px" />
          </IconButton>
         </WrapArrBack>
        )}
      <CustomFlex
        // style={{
        //   borderRight: '1px solid rgba(0, 0, 0, 0.1)',
        //   paddingRight: '5px',
        //   flex: 1,
        // }}
        alignItems="center"
        // mr={noConfig ? 0 : '16px'}
      >
        <Flex flexDirection="column" style={{ justifyContent: 'center', width: '100%', paddingTop: '10px' }}>
          <HeadingDetail>{title}</HeadingDetail>
          <CustomHeaderFlex alignItems="center" justifyContent="space-between" paddingTop="20px">
            {helper && <QuestionHelper text={helper} />}
            {subtitle && <DetailDescription>{subtitle}</DetailDescription>}
            {!noConfig && (
              <ImageFlex>
                <NotificationDot show={expertMode}>
                  <GlobalSettings />
                </NotificationDot>
                <Transactions />
              </ImageFlex>
            )}
          </CustomHeaderFlex>
        </Flex>
      </CustomFlex>
    </AppHeaderContainer>
  )
}

export default AppHeader

const CustomHeaderFlex = styled(Flex)`
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`
