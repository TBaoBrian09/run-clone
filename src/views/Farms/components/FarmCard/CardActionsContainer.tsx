import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Text } from '@phamphu19498/runtogether-uikit'
import { getAddress } from 'utils/addressHelpers'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { useERC20 } from 'hooks/useContract'
import ConnectWalletButton from 'components/ConnectWalletButton'
import ConnectWalletButtonFarms from 'components/ConnectWalletButtonFarms'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'
import useApproveFarm from '../../hooks/useApproveFarm'

const Action = styled.div`
  padding-top: 16px;
`
export interface FarmWithStakedValue extends Farm {
  apr?: number
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  account?: string
  addLiquidityUrl?: string
  cakePrice?: BigNumber
  lpLabel?: string
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, account, addLiquidityUrl, cakePrice, lpLabel }) => {
  const { t } = useTranslation()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses } = farm
  const {
    allowance: allowanceAsString = 0,
    tokenBalance: tokenBalanceAsString = 0,
    stakedBalance: stakedBalanceAsString = 0,
    earnings: earningsAsString = 0,
  } = farm.userData || {}
  const allowance = new BigNumber(allowanceAsString)
  const tokenBalance = new BigNumber(tokenBalanceAsString)
  const stakedBalance = new BigNumber(stakedBalanceAsString)
  const earnings = new BigNumber(earningsAsString)
  const lpAddress = getAddress(lpAddresses)
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const dispatch = useAppDispatch()
  const lpContract = useERC20(lpAddress)

  const { onApprove } = useApproveFarm(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, dispatch, account, pid])
  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={farm.lpSymbol}
        pid={pid}
        apr={farm.apr}
        lpLabel={lpLabel}
        cakePrice={cakePrice}
        addLiquidityUrl={addLiquidityUrl}
      />
    ) : (
      <ButtonEnable mt="8px" width="100%" variant='primary' disabled={requestedApproval} onClick={handleApprove} style={{borderRadius:"10px"}}>
        {t('Enable Contract')}
      </ButtonEnable>
    )
  }

  return (
    <Action>
      <Flex>
        <Text bold textTransform="uppercase" color="primaryBright" fontSize="14px" pr="4px">
          Run
        </Text>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="14px">
          {t('Earned')}
        </Text>
      </Flex>
      <HarvestAction earnings={earnings} pid={pid} />
      <Flex justifyContent='space-between'>
        <Flex>
          <Text bold textTransform="uppercase" color="primaryBright" fontSize="14px" pr="4px">
            {farm.lpSymbol}
          </Text>
          <Text bold textTransform="uppercase" color="textSubtle" fontSize="14px">
            {t('Staked')}
          </Text>
        </Flex>
      </Flex>
      {!account ? <ConnectWalletButtonFarms mt="8px" width="100%" /> : renderApprovalOrStakeButton()}
    </Action>
  )
}

export default CardActions

const ButtonEnable = styled(Button)`
  padding: 24px 16px;
  border-radius: 90px !important;
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #fff;
  background: #FF592C;
  border: 2px solid #e6e8ec;
  box-shadow: none;
  margin-top: 1rem;
  margin-bottom: -1rem;
`