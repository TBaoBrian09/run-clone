import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading } from '@phamphu19498/runtogether-uikit'
import { CommunityTag, CoreTag } from 'components/Tags'
import { Token } from 'config/constants/types'
import { useMatchBreakpoints } from 'components/Pancake-uikit'
import { getAddress } from 'utils/addressHelpers'
import tokens from 'config/constants/tokens'
import  TokenPairImage  from 'components/Pancake-uikit/components/Image/TokenPairImage'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  token: Token
  quoteToken: Token
}

const Wrapper = styled(Flex)`
  padding-top:0px;
  svg {
    margin-right: 4px;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
  color: #FFFFFF !important;
  background: ${({theme}) => theme.colors.failure};
`
const CustomHeading = styled(Heading)`
  /* color:${({theme}) => theme.colors.textSecondary}; */
  color: #fff;
  font-size:14px;
  font-weight: 400;
`
const getImageUrlFromToken = (token: Token) => {
  const address = getAddress(token.symbol === 'BNB' ? tokens.wbnb.address : token.address)
  return `/images/coins/${address}.png`
}
const CardHeading: React.FC<ExpandableSectionProps> = ({ lpLabel, multiplier, isCommunityFarm, token, quoteToken }) => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false

  return (
    <Wrapper justifyContent="space-between" alignItems="start">
      <TokenPairImage variant="default" primarySrc={getImageUrlFromToken(token)} secondarySrc={getImageUrlFromToken(quoteToken)} thirdSrc="/images/Run_Logo.svg" width={100} height={100} />
      <Flex width='60%' flexDirection="column" alignItems="start" style={{marginTop:isMobile ? "5px" : "0px"}}>
        <Flex justifyContent="start">
          {isCommunityFarm ? <CommunityTag /> : <CoreTag />}
          {/* <MultiplierTag variant="primary">{multiplier}</MultiplierTag> */}
        </Flex>
        <Heading mt="4px" color='#fff'>{lpLabel.split(' ')[0]}</Heading>
        <CustomHeading mt="5px">Earn RUN</CustomHeading>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
