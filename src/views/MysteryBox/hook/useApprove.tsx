import React, { useCallback, useState } from 'react'
import { ethers } from 'ethers'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import tokens from 'config/constants/tokens'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { useERC20 } from 'hooks/useContract'

export const useApprove = () => {
  const { t } = useTranslation();
  const [ requestedApproval, setRequestedApproval ] = useState(false);
  const { toastSuccess, toastError } = useToast();
  const { callWithGasPrice } = useCallWithGasPrice();
  const tokenContract = useERC20(getAddress(tokens.busd.address));
  const mysteryBoxContract = getAddress(contract.mysteryBox);
  const [ pendingTx, setPendingTx ] = useState(false);
  const handleApprove = useCallback(async () => {
    setPendingTx(true)
    try {
      setRequestedApproval(true)
      const tx = await callWithGasPrice(tokenContract, 'approve', [mysteryBoxContract, ethers.constants.MaxUint256])
      const receipt = await tx.wait();
      if (receipt.status) {
        toastSuccess(
          t('Contract Enabled'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedApproval(false)
        setPendingTx(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
        setPendingTx(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingTx(false)
    }
  }, [
    tokenContract,
    mysteryBoxContract,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
    setPendingTx,
  ]);

  return { handleApprove, requestedApproval, pendingTx }
}
