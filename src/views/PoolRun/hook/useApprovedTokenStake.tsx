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
import { useERC20 } from 'hooks/useContract'

export const useApproveTokenStake = () => {
  const [requestedApprovalTokenStake, setRequestedApprovalTokenStake] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const tokenContract = useERC20(getAddress(tokens.Run.address))
  const poolRunContract = getAddress(contract.poolRun)
  const [ pendingTx, setPendingTx ] = useState(false)
  const handleApprove = useCallback(async () => {
    setPendingTx(true)
    try {
      const tx = await callWithGasPrice(tokenContract, 'approve', [poolRunContract, ethers.constants.MaxUint256])
      const receipt = await tx.wait()

      if (receipt.status) {
        toastSuccess(
          t('Contract Enabled'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedApprovalTokenStake(true)
        setPendingTx(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApprovalTokenStake(false)
        setPendingTx(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingTx(false)
    }
  }, [
    tokenContract,
    poolRunContract,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
    setPendingTx,
  ])

  return { handleApprove, requestedApprovalTokenStake, pendingTx }
}
