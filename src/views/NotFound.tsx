import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Flex } from '@phamphu19498/runtogether-uikit'
import PageFullWidth from 'components/Layout/PageFullWidth'
import { useTranslation } from 'contexts/Localization'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: flex-start;
  padding-top:2rem;
`
const Container = styled.div`
    width:100%;
    max-width: 1300px;
    display:flex;
    justify-content:center;
    align-items:center;
    padding-top:1.5rem;
    padding-bottom:1.5rem;
    flex-direction: column;
`
const NotFound = () => {
  const { t } = useTranslation()

  return (
    <PageFullWidth>
      <Container>
        <Flex flexDirection="column" width="100%" justifyContent="center" alignItems="center">
          <Heading scale="xxl">Page not found</Heading>
          <CustomButton as="a" href="/">
            {t('Back to Marketplace')}
          </CustomButton>
        </Flex>
        <ContainerImg/>
      </Container>
      
    </PageFullWidth>
  )
}

const Page = styled.div``

export default NotFound

const CustomButton = styled(Button)`
  width: 374px;
  height: 48px;
  background: #FF592C;
  border-radius: 90px;
  font-weight: 700;
  margin-top:2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  @media only screen and (max-width: 600px) {
     width: 96%;
  }
`
const ContainerImg = styled(Flex)`
    width:100%;
    height: 595px;
    background-image:url("/images/background_comming_soon.png");
    background-size:contain;
    background-repeat:no-repeat;
    @media only screen and (min-width: 768px) and (max-width: 1000px) {
      height: 400px;
    }
    @media only screen and (max-width: 600px) {
      margin-top:2rem;
      height: 470px;
      width: 100%;
      background-image:url("/images/page_not_found_mobile.png");
      background-size:cover;
    }
`