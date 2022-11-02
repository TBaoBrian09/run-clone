import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Card, Flex, Text, Skeleton, useModal } from '@phamphu19498/runtogether-uikit'
import { Farm } from 'state/types'
import { getBscScanLink } from 'utils'
import { useTranslation } from 'contexts/Localization'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { CalculateIcon } from 'components/Pancake-uikit'
import { BASE_ADD_LIQUIDITY_URL, startTimeStake } from 'config'
import { getAddress } from 'utils/addressHelpers'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import RoiCalculatorModal from 'components/RoiCalculatorModal'
import tokens from 'config/constants/tokens'
import { BIG_ZERO } from 'utils/bigNumber'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'

export interface FarmWithStakedValue extends Farm {
  apr?: number
  lpRewardsApr?: number
  liquidity?: BigNumber
}

const StyledCard = styled.div`
  align-self: baseline;
  background: ${({ theme }) => (theme.isDark ? theme.colors.background : theme.colors.backgroundModal )};
  border-radius: ${({theme}) => theme.radii.card};
  box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  text-align: center;
  min-width: 300px;
  overflow: hidden;
  filter: ${({theme}) => theme.isDark ? "drop-shadow(0px 4px 18px rgba(115, 184, 246, 0.1))" : "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.05))"};
`

const FarmCardInnerContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  overflow: hidden;
`

const ExpandingWrapper = styled.div`
  padding: 24px;
  overflow: hidden;
  background:none;
`

const HeaddingContainer = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  border:none !important;
  padding: 24px 24px 14px 24px;
  background: url('/images/farms/bg_card_heading.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
`
const CustomText = styled(Text)`
  font-size: 16px;
`


interface FarmCardProps {
  farm: FarmWithStakedValue
  displayApr: string
  removed: boolean
  cakePrice?: BigNumber
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, displayApr, removed, cakePrice, account }) => {
  const { t } = useTranslation()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const totalValueFormatted =
    farm.liquidity && farm.liquidity.gt(0)
      ? `$${farm.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 0 })}`
      : ''

  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const earnLabel = farm.dual ? farm.dual.earnLabel : t('CAKE + Fees')

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: farm.quoteToken.address,
    tokenAddress: farm.token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  const lpAddress = getAddress(farm.lpAddresses)
  const isPromotedFarm = farm.token.symbol === 'CAKE'
  const currentTime = Date.now()
  const timeCanStake = currentTime > startTimeStake
  // Modal
  const [showRoiCalculator, setShowRoiCalculator] = useState(false)
  const [ openModal ] = useModal(
    <RoiCalculatorModal
        earningTokenPrice={1.0025}
        stakingTokenPrice={0.009}
        apr={20}
        linkLabel={t('Get %symbol%', { symbol: tokens.Run.symbol })}
        linkHref="https://bscscan.com/token/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7"
        stakingTokenBalance={BIG_ZERO}
        stakingTokenSymbol="RUN"
        earningTokenSymbol="BUSD"
        onBack={() => setShowRoiCalculator(false)}
        initialValue="1000"
      />
)

  return (
    // <StyledCard isActive={isPromotedFarm}>
    <StyledCard>
      <HeaddingContainer>
        <CardHeading
          lpLabel={lpLabel}
          multiplier={farm.multiplier}
          isCommunityFarm={farm.isCommunity}
          token={farm.token}
          quoteToken={farm.quoteToken}
        />
      </HeaddingContainer>
      <FarmCardInnerContainer>
        {!removed && (
          <Flex justifyContent="space-between" alignItems="center" height="32px">
            <CustomText>{t('APR')}:</CustomText>
            <Text bold style={{ display: 'flex', alignItems: 'center' }}>
              {farm.apr ? (
                <ApyButton
                  variant="text-and-button"
                  pid={farm.pid}
                  lpSymbol={farm.lpSymbol}
                  multiplier={farm.multiplier}
                  lpLabel={lpLabel}
                  addLiquidityUrl={addLiquidityUrl}
                  cakePrice={cakePrice}
                  apr={farm.apr}
                  displayApr={displayApr}
                />
              ) : (
                <Skeleton height={30} width={80} />
              )}
            </Text>
          </Flex>
        )}
        <Flex justifyContent="space-between">
          <CustomText>{t('TVL')}:</CustomText>
          <Text bold>{totalValueFormatted}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <CustomText>{t('Earn')}:</CustomText>
          <CustomText>{earnLabel}</CustomText>
        </Flex>
        <CardActionsContainer
          farm={farm}
          lpLabel={lpLabel}
          account={account}
          cakePrice={cakePrice}
          addLiquidityUrl={addLiquidityUrl}
        /> 
        { !timeCanStake &&
           <Flex mt="1.5rem" width="100%">
            <Text textAlign="left" color='primaryBright'>{t("Farming RUN-BUSD pairs active at 1 PM UTC (8 PM GMT+7)")}</Text>
          </Flex>
        }
       
      </FarmCardInnerContainer>
      
      <ExpandingWrapper>
        <ExpandableSectionButton
          onClick={() => setShowExpandableSection(!showExpandableSection)}
          expanded={showExpandableSection}
        />
        {showExpandableSection && (
          <DetailsSection
            removed={removed}
            bscScanAddress={getBscScanLink(lpAddress, 'address')}
            infoAddress={`https://pancakeswap.info/pool/${lpAddress}`}
            totalValueFormatted={totalValueFormatted}
            lpLabel={lpLabel}
            addLiquidityUrl={addLiquidityUrl}
          />
        )}
      </ExpandingWrapper>
    </StyledCard>
  )
}

export default FarmCard
