import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Flex } from '@phamphu19498/runtogether-uikit'
import { Text, HelpIcon, useTooltip } from 'components/Pancake-uikit'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getAddress } from 'utils/addressHelpers'
import { getBscScanLink } from 'utils'
import { Link } from 'react-router-dom'
import { startTimeStake } from 'config'
import Icon from 'components/Pancake-uikit/components/Svg/Icons/LinkView'
import HarvestAction from './HarvestAction'
import StakedAction from './StakedAction'
import FarmTooltip from './FarmTooltip'
import Apr, { AprProps } from '../Apr'
import Multiplier, { MultiplierProps } from '../Multiplier'
import Liquidity, { LiquidityProps } from '../Liquidity'

export interface ActionPanelProps {
  apr: AprProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
  userDataReady: boolean
  expanded: boolean
}

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0px;
  }
`

const Container = styled.div<{ expanded }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  border-radius: 16px;
  background: ${({ theme }) => (theme.isDark ? theme.colors.background : '#F8F8F8')};
  filter: drop-shadow(0px 4px 18px rgba(115, 184, 246, 0.1));
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 24px;
  align-items:flex-start;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    padding: 16px 32px;
  }
`

const StyledLinkExternal = styled.div`
color: ${({ theme }) => theme.colors.textSubtle};
&:hover {
  filter: brightness(0.8);
  text-decoration-line: underline;
  color: ${({ theme }) => theme.colors.primaryBright};
  > a > svg {
    fill: ${({ theme }) => theme.colors.primaryBright};
  }
  > svg {
    fill: ${({ theme }) => theme.colors.primaryBright};
  }
}
  font-weight: 400;
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const InfoContainer = styled.div`
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    display: block;
  }
  margin: 4px 0px;
  color:#fff !important;
`

const ExpandIcon = styled(Icon)`
  width: 10px;
`

const LinkWrapper = styled.div`
  text-align: right;
  margin-top:10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    text-align: left;
  }
`
const Wrapper = styled.div`
  width:100%;
  display:flex;
  flex-direction: column;
  padding-bottom:10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLine};
  @media only screen and (min-width: 600px) {
   display:none;
  }
`
const RowWrapper = styled.div`
  width:100%;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom:5px;
`


const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({
  details,
  apr,
  multiplier,
  liquidity,
  userDataReady,
  expanded,
}) => {
  const farm = details

  const { t } = useTranslation()
  const isActive = farm.multiplier !== '0X'
  const { quoteToken, token, dual } = farm
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const lpAddress = getAddress(farm.lpAddresses)
  const bsc = getBscScanLink(lpAddress, 'address')
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet ullamcorper neque tellus arcu in. Non egestas est pharetra, eget nec at sit eu tempus. Porta proin feugiat gravida morbi ornare. '),
    { placement: 'top-end', tooltipOffset: [20, 10] },
  )
  const currentTime = Date.now()
  const timeCanStake = currentTime > startTimeStake
  return (
    <Container expanded={expanded}>
      {tooltipVisible && tooltip}
      <InfoContainer>
        {/* <WrapperFeeDesktop>
          <Text bold>Fee: </Text>
          <Text bold> 0.00 %</Text>
          <FarmTooltip/>
        </WrapperFeeDesktop> */}
        <LinkWrapper>
          <StyledLinkExternal style={{paddingTop:'5px', color: '#A95EEA', fontWeight: 'bold'}}><Link to={`/add/${liquidityUrlPathParts}`}>{t('Get %symbol%', { symbol: lpLabel })} <ExpandIcon width="9px" /></Link></StyledLinkExternal>
          <StyledLinkExternal style={{paddingTop:'5px', color: '#A95EEA', fontWeight: 'bold'}}><a href={bsc}>{t('View Contract')}</a> <ExpandIcon width="9px" /></StyledLinkExternal>
        </LinkWrapper>
      </InfoContainer>
      <Wrapper>
        <RowWrapper>
          <Flex width="100%" justifyContent="space-between">
            <Text>{t('TVL')}:</Text>
            <Liquidity {...liquidity} />
          </Flex>
          { !timeCanStake && 
            <Flex mt="1.5rem" width="100%">
              <Text textAlign="left" color='primaryBright'>{t("Farming RUN-BUSD pairs active at 1 PM UTC (8 PM GMT+7)")}</Text>
            </Flex>
          }
        </RowWrapper>
        {/* <RowWrapper>
          <WrapperFee>
            <Text bold>Fee:</Text>
            <FarmTooltip/>
          </WrapperFee>
          <Text bold>0.00 %</Text>
        </RowWrapper> */}
      </Wrapper>
      <ActionContainer>
        <HarvestAction {...farm} userDataReady={userDataReady} />
        <StakedAction {...farm} userDataReady={userDataReady} lpLabel={lpLabel} displayApr={apr.value} />
      </ActionContainer>
    </Container>
  )
}

export default ActionPanel
