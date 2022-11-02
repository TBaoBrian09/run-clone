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

export const useApproveFee = () => {
  const [requestedApproFee, setRequestedApproFee ] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const tokenContract = useERC20(getAddress(tokens.Run.address))
  const transferContract = getAddress(contract.withdrawNftRun)
  const [ pendingFee, setPenddingFee ] = useState(false)
  const handleApproveFee = useCallback(async () => {
    setPenddingFee(true)
    try {
      const tx = await callWithGasPrice(tokenContract, 'approve', [transferContract, ethers.constants.MaxUint256])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Contract Enabled'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedApproFee(true)
        setPenddingFee(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproFee(false)
        setPenddingFee(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPenddingFee(false)
    }
  }, [
    tokenContract,
    transferContract,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
  ])

  return { handleApproveFee, requestedApproFee, pendingFee }
}
