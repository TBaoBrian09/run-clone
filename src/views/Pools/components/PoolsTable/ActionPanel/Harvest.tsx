import React from 'react'
import { Button, Text, useModal, Flex, Skeleton, Heading } from '@phamphu19498/runtogether-uikit'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { PoolCategory } from 'config/constants/types'
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { BIG_ZERO } from 'utils/bigNumber'
import { Pool } from 'state/types'

import { ActionContainer, ActionTitles, ActionContent } from './styles'
import CollectModal from '../../PoolCard/Modals/CollectModal'



interface HarvestActionProps extends Pool {
  userDataLoaded: boolean
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({
  sousId,
  poolCategory,
  earningToken,
  userData,
  userDataLoaded,
  earningTokenPrice,
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  const earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals)
  const earningTokenDollarBalance = getBalanceNumber(earnings.multipliedBy(earningTokenPrice), earningToken.decimals)
  const hasEarnings = earnings.gt(0)
  const fullBalance = getFullDisplayBalance(earnings, earningToken.decimals)
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3)
  const isCompoundPool = sousId === 0
  const isBnbPool = poolCategory === PoolCategory.BINANCE

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      fullBalance={fullBalance}
      earningToken={earningToken}
      earningsDollarValue={earningTokenDollarBalance}
      sousId={sousId}
      isBnbPool={isBnbPool}
      isCompoundPool={isCompoundPool}
    />,
  )

  const actionTitle = (
    <>
      <Text fontSize="16px" bold color="primaryBright" as="span" textTransform="uppercase">
        {earningToken.symbol}{' '}
      </Text>
      <Text fontSize="16px" bold color="textSubtle" as="span">
        {t('Earned')}
      </Text>
    </>
  )

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <ActionContent>
          <Heading fontSize='16px' color='primary'>0</Heading>
          <Button variant='primary' style={{borderRadius:"10px"}} disabled>{isCompoundPool ? t('Collect') : t('Harvest')}</Button>
        </ActionContent>
      </ActionContainer>
    )
  }

  if (!userDataLoaded) {
    return (
      <ActionContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <ActionContent>
          <Skeleton width={180} height="32px" marginTop={14} />
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <ActionTitles>{actionTitle}</ActionTitles>
      <ActionContent>
        <Flex flex="1" pt="16px" flexDirection="column" alignSelf="flex-start">
          <>
            {hasEarnings ? (
              <>
                <Balance  color="primaryBright" lineHeight="1" bold fontSize="20px" decimals={5} value={earningTokenBalance} />
                {earningTokenPrice > 0 && (
                  <Balance
                    display="inline"
                    fontSize="20px"
                    color="primaryBright"
                    decimals={2}
                    prefix="~"
                    value={earningTokenDollarBalance}
                    unit=" USD"
                  />
                )}
              </>
            ) : (
              <>
                <Heading fontSize='16px'>0</Heading>
                <Text fontSize="16px" color="text">
                  ~0.000000 USD
                </Text>
              </>
            )}
          </>
        </Flex>
        <Button 
          disabled={!hasEarnings} 
          onClick={onPresentCollect} 
          variant='primary' 
          style={{borderRadius:"10px"}}
        >
          {isCompoundPool ? t('Collect') : t('Harvest')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
