import React, { useCallback, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import BigNumber from 'bignumber.js'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { investPool } from 'config/constants/investPool';
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { usePoolProposalsContract } from 'hooks/useContract'
import { fetchData } from 'state/poolProposals/fetchDataUser'
import { fetchDataPool } from 'state/poolProposals/actions'

export const useWithdrawProposalsPoolProposals = (userAddress, contractAddress, onRefresh) => {
  const [requestedWithdrawProposals, setRequestedWithdrawProposals] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const PoolProposalsContract = usePoolProposalsContract(contractAddress)
  const [ pendingWithdrawProposals, setPendingWithdrawProposals ] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const handleWithdrawProposals = useCallback(async () => {
    setPendingWithdrawProposals(true)
    try {
      
      const tx = await callWithGasPrice(PoolProposalsContract, 'withdraw', [0, userAddress])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Successful Withdraw'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedWithdrawProposals(true)
        setPendingWithdrawProposals(false)
        onRefresh(Date.now())
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedWithdrawProposals(false)
        setPendingWithdrawProposals(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingWithdrawProposals(false)
    } finally {
      try {
          const result = await fetchData(userAddress, investPool)
          dispatch(fetchDataPool(result))
      } catch (e) {
          console.log(e)
      }
    }
  }, [
    PoolProposalsContract,
    t,
    dispatch,
    userAddress,
    toastError,
    toastSuccess,
    callWithGasPrice,
    setPendingWithdrawProposals,
    onRefresh
  ])

  return { handleWithdrawProposals, requestedWithdrawProposals, pendingWithdrawProposals }
}
