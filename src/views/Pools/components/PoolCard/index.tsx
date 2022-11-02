import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { CardBody, Flex, Text, CardRibbon } from '@phamphu19498/runtogether-uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from 'contexts/Localization'
import { BIG_ZERO } from 'utils/bigNumber'
import { Pool } from 'state/types'
import useTheme from 'hooks/useTheme'
import AprRow from './AprRow'
import { StyledCard } from './StyledCard'
import CardFooter from './CardFooter'
import StyledCardHeader from './StyledCardHeader'
import CardActions from './CardActions'
import TotalStackedRow from './TotalStakedRow'
import EndingRow from './EndingRow'
import DepositFeeRow from './DepositFeeRow'

const CustomCardBody = styled(CardBody)`
  background: ${({ theme }) => (theme.isDark ? theme.colors.background : theme.colors.backgroundModal)} !important;
`

const PoolCard: React.FC<{ pool: Pool; account: string }> = ({ pool, account }) => {
  const { sousId, stakingToken, earningToken, isFinished, userData } = pool
  const { t } = useTranslation()
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const accountHasStakedBalance = stakedBalance.gt(0)
  const { theme } = useTheme()
  return (
    <StyledCard
      isFinished={isFinished && sousId !== 0}
      ribbon={isFinished && <CardRibbon variantColor="textDisabled" text={t('Finished')} />}
    >
      <StyledCardHeader
        isStaking={accountHasStakedBalance}
        earningToken={earningToken}
        stakingToken={stakingToken}
        isFinished={isFinished && sousId !== 0}
      />
      <CustomCardBody style={{padding:"2px", paddingTop:"12px"}}>
        <AprRow pool={pool} stakedBalance={stakedBalance} />
        <TotalStackedRow pool={pool} account={account}/>
        <EndingRow pool={pool} account={account}/>
        <DepositFeeRow/>
        <Flex mt="5px" flexDirection="column" style={{padding:"5px 24px"}}>
          {account ? (
            <CardActions pool={pool} stakedBalance={stakedBalance} />
          ) : (
            <>
              <Text mb="10px" textTransform="uppercase" color="textSecondary">
                {t('Start earning')}
              </Text>
              <ConnectWalletButton />
            </>
          )}
        </Flex>
      </CustomCardBody>
      <CardFooter pool={pool} account={account} />
    </StyledCard>
  )
}

export default PoolCard
