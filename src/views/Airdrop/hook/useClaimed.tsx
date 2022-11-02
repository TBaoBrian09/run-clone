import React, { useCallback, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import tokens from 'config/constants/tokens'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { useAirdopContract } from 'hooks/useContract'

export const useClaimed = (contractAddress) => {
  const [requestedClaimed, setRequestedClaimed] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const airdropContract = useAirdopContract(getAddress(contractAddress));
  const [ pendingTx, setPendingTx ] = useState(false)
  const handleClaimed = useCallback(async () => {
    setPendingTx(true)
    try {
        setRequestedClaimed(true)
      const tx = await callWithGasPrice(airdropContract, 'claim', [])
      const receipt = await tx.wait()

      if (receipt.status) {
        toastSuccess(
          t('Successful'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            {t('You can view Tx')}
          </ToastDescriptionWithTx>,
        )
        setRequestedClaimed(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedClaimed(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    } finally {
        setPendingTx(false)
    }
  }, [
    airdropContract,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
    setPendingTx,
  ])

  return { handleClaimed, requestedClaimed, pendingTx }
}
