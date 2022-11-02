import React from 'react'
import styled, { css } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router'
import { DEFAULT_META, getCustomMeta } from 'config/constants/meta'
import tokens from 'config/constants/tokens'
import { usePriceRunBusd, useTokenPrice } from 'state/farms/hooks'
import Container from './Container'



const ContainerPage = styled(Container) `
  
  min-height: calc(100vh - 64px);
  // padding: 16px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  width:100%;
  @media only screen and (max-width: 600px) {
    padding:0px;
  }
`

const StyledPage = styled(Container)`
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-bottom: 24px;
    padding-left: 0px;
    padding-right: 0px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-bottom: 32px;
    // padding-left: 30px;
    // padding-right: 30px;
  }
  max-width: none;
`
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width:100%;
    background: url("/images/MaskBG.svg") ${({ theme }) =>theme.isDark ? "#011226" : "#FFFFFF"};
`

const PageMeta = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const cakePriceUsd = useTokenPrice(tokens.Run.address[56]).toNumber();
  const runPriceBUSD = cakePriceUsd !==0 ? `$ ${cakePriceUsd.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""

  const pageMeta = getCustomMeta(pathname, t) || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
  const pageTitle = title

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Helmet>
  )
}

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  const isBackgroundImage = true
  return (
    <Wrapper>
      <PageMeta />
      <ContainerPage {...props} isBackgroundImage={isBackgroundImage}>
        <StyledPage {...props} isBackgroundImage={false} background="transparent">{children}</StyledPage>
      </ContainerPage>
    </Wrapper>
  )
}

export default Page
