import React, { useState } from 'react'
import { Heading, Skeleton, Text, TokenPairImage } from 'components/Pancake-uikit'
import { Button, Flex } from '@phamphu19498/runtogether-uikit'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import Balance from 'components/Balance'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { usePriceLtdBusd } from 'state/farms/hooks'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
import useHarvestFarm from '../../../hooks/useHarvestFarm'
import { ActionContainer, ActionTitles, ActionContent, ActionContentHarvest } from './styles'


const StyledHeading = styled(Heading)`
  font-size:20px !important;
  color: ${({ theme }) => theme.colors.text};
  font-weight:600;
  margin-left: 1rem;
`
const CustomActionContainer = styled(ActionContainer)`
  border-radius:5px;
  /* background:${({ theme }) => theme.isDark ? theme.colors.input : theme.colors.backgroundTab}; */
  border:none !important;
`
const CustomButton = styled(Button)`
  background-color: none;
  border-radius: 90px !important;
  border: 2px solid #E6E8EC;
  color: #000;

`

interface HarvestActionProps extends FarmWithStakedValue {
  userDataReady: boolean
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({ pid, userData, userDataReady }) => {
  const { toastSuccess, toastError } = useToast()
  const earningsBigNumber = new BigNumber(userData.earnings)
  const cakePrice = usePriceLtdBusd()
  let earnings = BIG_ZERO
  let earningsBusd = 0
  let displayBalance = userDataReady ? earnings.toLocaleString() : <Skeleton width={60} />
  
  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceAmount(earningsBigNumber, 18)
    earningsBusd = earnings.multipliedBy(cakePrice).toNumber()
    displayBalance = earnings.toFixed(3, BigNumber.ROUND_DOWN)
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestFarm(pid)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  return (
    <CustomActionContainer>
      <ActionTitles>
        <Text textTransform="uppercase" color="#FF592C" fontWeight='600' fontSize="16px" pr="4px">
          RUN
        </Text>
        <Text textTransform="uppercase" color="#B1B5C3" fontWeight='600' fontSize="16px">
          {t('Earned')}
        </Text>
      </ActionTitles>
      <ActionContentHarvest>
        <Flex justifyContent='center' alignItems='center'>
          <img src='/images/Run_Logo.svg' alt='token'/>
          <StyledHeading>{displayBalance}</StyledHeading> 
          {earningsBusd > 0 && (
            <Balance fontSize="12px" color="text" decimals={2} value={earningsBusd} unit=" RUN" prefix="~"/>
          )}
        </Flex>
        <CustomButton
          variant='text'
          disabled={earnings.eq(0) || pendingTx || !userDataReady}
          onClick={async () => {
            setPendingTx(true)
            try {
              await onReward()
              toastSuccess(
                `${t('Harvested')}!`,
                t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'RUN' }),
              )
            } catch (e) {
              toastError(
                t('Error'),
                t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
              )
              console.error(e)
            } finally {
              setPendingTx(false)
            }
            dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
          }}
        >
          {t('Harvest')}
        </CustomButton>
      </ActionContentHarvest>
    </CustomActionContainer>
  )
}

export default HarvestAction
