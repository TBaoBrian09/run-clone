import React, { useCallback, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import BigNumber from 'bignumber.js'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { usePoolProposalsContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { fetchData } from "state/poolProposals/fetchDataUser"
import { investPool } from 'config/constants/investPool';
import { fetchDataPool } from "state/poolProposals/actions"
import { AppDispatch } from 'state'
import { useDispatch, useSelector } from 'react-redux'

export const useUnStaked = (amount, contract, onUpdateAmount, onRefresh) => {
  const [requestedUnStake, setRequestedUnStake] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const poolRunContract = usePoolProposalsContract(contract)
  const [ pendingUnStaked, setPendingUnStaked ] = useState(false)
  const partAmount = new BigNumber(amount)
  const convertAmount = partAmount.multipliedBy(1E18).toString()
  const dispatch = useDispatch<AppDispatch>()
  const handleUnStaked = useCallback(async () => {
    setPendingUnStaked(true)
    try {
      
      const tx = await callWithGasPrice(poolRunContract, 'withdraw', [convertAmount, account])
      const receipt = await tx.wait()

      if (receipt.status) {
        toastSuccess(
          t('Successful UnStake'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedUnStake(true)
        setPendingUnStaked(false)
        onUpdateAmount(Date.now())
        onRefresh(Date.now())
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedUnStake(false)
        setPendingUnStaked(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingUnStaked(false)
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
    convertAmount,
    onUpdateAmount,
    t,
    account,
    dispatch,
    toastError,
    toastSuccess,
    callWithGasPrice,
    setPendingUnStaked,
    onRefresh
  ])

  return { handleUnStaked, requestedUnStake, pendingUnStaked }
}
