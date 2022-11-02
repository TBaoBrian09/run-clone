import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, useMatchBreakpoints } from '@phamphu19498/runtogether-uikit'
import { useTranslation } from 'contexts/Localization'
import { useCakeVault } from 'state/pools/hooks'
import { Pool } from 'state/types'
import { BIG_ZERO } from 'utils/bigNumber'
import { TokenPairImage } from 'components/TokenImage'
import CakeVaultTokenPairImage from '../../CakeVaultCard/CakeVaultTokenPairImage'
import BaseCell, { CellContent } from './BaseCell'



interface NameCellProps {
  pool: Pool
}

const StyledCell = styled(BaseCell)`
  flex: 5;
  flex-direction: row;
  padding-left: 12px;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 150px;
    padding-left: 32px;
  }
`

const NameCell: React.FC<NameCellProps> = ({ pool }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { sousId, stakingToken, earningToken, userData, isFinished, isAutoVault } = pool
  const {
    userData: { userShares },
  } = useCakeVault()

  const hasVaultShares = userShares && userShares.gt(0)

  const stakingTokenSymbol = stakingToken.symbol
  const earningTokenSymbol = earningToken.symbol

  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const isStaked = stakedBalance.gt(0)
  // const isManualCakePool = sousId === 0

  const showStakedTag = isAutoVault ? hasVaultShares : isStaked

  const title = `${t('Earn')} ${earningTokenSymbol}`
  const subtitle = `${t('Stake')} ${stakingTokenSymbol}`
  const showSubtitle = sousId !== 0 || (sousId === 0 && !isMobile)

  // if (isAutoVault) {
  //   title = t('Auto CAKE')
  //   subtitle = t('Automatic restaking')
  // } else if (isManualCakePool) {
  //   title = t('Manual CAKE')
  //   subtitle = `${t('Earn')} CAKE ${t('Stake').toLocaleLowerCase()} CAKE`
  // }

  return (
    <StyledCell role="cell">
      {isAutoVault ? (
        <CakeVaultTokenPairImage mr="8px" width={60} height={60} />
      ) : (
        <TokenPairImage primaryToken={earningToken} secondaryToken={stakingToken} mr="8px" width={60} height={60} />
      )}
      <CellContent>
        {showSubtitle && (
            <Text fontSize="16px" bold color="text">
              {subtitle}
            </Text>
          )}
        {showStakedTag && (
          <Text fontSize="16px" bold color={isFinished ? 'failure' : 'secondary'} textTransform="uppercase">
            {t('Staked')}
          </Text>
        )}
        <Text bold={!isMobile} small={isMobile} color="textSecondary">
          {title}
        </Text>
        
      </CellContent>
    </StyledCell>
  )
}

export default NameCell
