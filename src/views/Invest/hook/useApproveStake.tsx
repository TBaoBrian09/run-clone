import React, { useCallback, useState } from 'react'
import { ethers } from 'ethers'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useERC20 } from 'hooks/useContract'

export const useApprove = (tokenStakeAddress, contractAddress, onRefresh) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const token = useERC20(tokenStakeAddress)
  const [ pendingTxApproval, setPendingTxApproval ] = useState(false)
  const handleApprove = useCallback(async () => {
    setPendingTxApproval(true)
    try {
      
      const tx = await callWithGasPrice(token, 'approve', [contractAddress, ethers.constants.MaxUint256])
      const receipt = await tx.wait()

      if (receipt.status) {
        toastSuccess(
          t('Contract Enabled'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedApproval(true)
        setPendingTxApproval(false)
        onRefresh(Date.now())
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
        setPendingTxApproval(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingTxApproval(false)
    } finally {
        setPendingTxApproval(false)
    }
  }, [
    contractAddress,
    t,
    token,
    toastError,
    toastSuccess,
    callWithGasPrice,
    setPendingTxApproval,
    onRefresh
  ])

  return { handleApprove, requestedApproval, pendingTxApproval }
}
