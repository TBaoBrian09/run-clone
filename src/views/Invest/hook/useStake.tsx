import React, { useCallback, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import BigNumber from 'bignumber.js'
import { AppDispatch } from 'state'
import { useDispatch, useSelector } from 'react-redux'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { fetchData } from "state/poolProposals/fetchDataUser"
import { investPool } from 'config/constants/investPool';
import { fetchDataPool } from "state/poolProposals/actions"
import { usePoolProposalsContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'

export const useStaked = (amount, contract, onUpdateAmount, onRefresh) => {
  const [requestedStake, setRequestedStake] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const poolRunContract = usePoolProposalsContract(contract)
  const [ pendingStaked, setPendingStaked ] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const partAmount = new BigNumber(amount)
  const convertAmountDeposit = partAmount.multipliedBy(1E18).toString()
  const handleStaked = useCallback(async () => {
    setPendingStaked(true)
    try {
      
      const tx = await callWithGasPrice(poolRunContract, 'deposit', [convertAmountDeposit, account])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Successful staking'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedStake(true)
        setPendingStaked(false)
        onUpdateAmount(Date.now())
        onRefresh(Date.now())
        
      } else {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedStake(false)
        setPendingStaked(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingStaked(false)
    } finally {
        try {
          const result = await fetchData(account, investPool)
            dispatch(fetchDataPool(result))
        } catch (e) {
            console.log(e)
        }
    }
  }, [
    poolRunContract,
    t,
    dispatch,
    account,
    convertAmountDeposit,
    toastError,
    toastSuccess,
    callWithGasPrice,
    setPendingStaked,
    onUpdateAmount,
    onRefresh
  ])

  return { handleStaked, requestedStake, pendingStaked }
}
