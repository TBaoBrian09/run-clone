import React from 'react'
import styled, { css } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Helmet } from 'react-helmet'
import MetaTags from 'react-meta-tags'
import { useLocation } from 'react-router'
import { DEFAULT_META, getCustomMeta } from 'config/constants/meta'
import { usePriceRunBusd } from 'state/farms/hooks'



const PageMeta = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const cakePriceUsd = usePriceRunBusd()
  const cakePriceUsdDisplay = cakePriceUsd.gt(0)
    ? `$${cakePriceUsd.toNumber().toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      })}`
    : ''

  const pageMeta = getCustomMeta(pathname, t) || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
  const pageTitle = title
  
  return (
    <MetaTags>
      <title>{pageTitle}</title>
      <meta name="description" content={description}/>
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
    </MetaTags>
  )
}

const PageFullWidth: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
        <Wrapper>
            <PageMeta />
            {children}
        </Wrapper>
  )
}

export default PageFullWidth

const Wrapper = styled.div`
    width:100%;
    height: auto;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
`