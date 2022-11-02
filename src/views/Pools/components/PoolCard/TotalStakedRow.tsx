import React from 'react'
import BigNumber from 'bignumber.js'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import {
  Flex,
  Text,
  TimerIcon,
  Skeleton,
  Link,
  HelpIcon,
} from '@phamphu19498/runtogether-uikit'
import { useTooltip } from 'components/Pancake-uikit'
import { useCakeVault } from 'state/pools/hooks'
import { Pool } from 'state/types'
import Balance from 'components/Balance'
import styled from 'styled-components'

const CustomText = styled(Text)`
  font-size: 16px;
`
const CustomBalance = styled(Balance)`
  font-size: 16px;
`

interface ExpandedFooterProps {
  pool: Pool
  account: string
}


const TotalStackedRow: React.FC<ExpandedFooterProps> = ({ pool, account }) => {
  const { t } = useTranslation()
  const {
    totalCakeInVault,
    fees: { performanceFee },
  } = useCakeVault()

  const {
    stakingToken,
    totalStaked,
    sousId,
    isAutoVault,
  } = pool

  const isManualCakePool = sousId === 0

  const getTotalStakedBalance = () => {
    if (isAutoVault) {
      return getBalanceNumber(totalCakeInVault, stakingToken.decimals)
    }
    if (isManualCakePool) {
      const manualCakeTotalMinusAutoVault = new BigNumber(totalStaked).minus(totalCakeInVault)
      return getBalanceNumber(manualCakeTotalMinusAutoVault, stakingToken.decimals)
    }
    return getBalanceNumber(totalStaked, stakingToken.decimals)
  }

  const {
    targetRef: totalStakedTargetRef,
    tooltip: totalStakedTooltip,
    tooltipVisible: totalStakedTooltipVisible,
  } = useTooltip(t('Total amount of %symbol% staked in this pool', { symbol: stakingToken.symbol }), {
    placement: 'bottom',
  })

  return (
    <Flex alignItems="center" justifyContent="space-between" style={{padding:"5px 24px"}}>
      <CustomText color="textSecondary">{t('TVL')}:</CustomText>
      <Flex alignItems="flex-start">
        {totalStaked && totalStaked.gte(0) ? (
          <>
            {/* <CustomBalance value={getTotalStakedBalance()} decimals={0} unit={` ${stakingToken.symbol}`} />
            <span ref={totalStakedTargetRef}>
              <HelpIcon color="textSubtle" width="20px" mr="6px" ml="6px" mt="1px" />
            </span> */}
             <CustomBalance value={getTotalStakedBalance()} decimals={0}/>
          </>
        ) : (
          <Skeleton width="90px" height="21px" />
        )}
        {totalStakedTooltipVisible && totalStakedTooltip}
      </Flex>
    </Flex>
  )
}

export default React.memo(TotalStackedRow)