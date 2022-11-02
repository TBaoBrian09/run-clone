import React, { useCallback, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import BigNumber from 'bignumber.js'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import tokens from 'config/constants/tokens'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { usePoolRunContract } from 'hooks/useContract'

export const useUnStaked = (amount, onRefresh) => {
  const [requestedUnStake, setRequestedUnStake] = useState(false)
  const [ isClose, setClose ] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const poolRunContract = usePoolRunContract(getAddress(contract.poolRun))
  const [ pendingUnStaked, setPendingUnStaked ] = useState(false)
  const converDeposit = new BigNumber((amount*1E18).toString()).toString();
  const handleUnStaked = useCallback(async () => {
    setPendingUnStaked(true)
    try {
      
      const tx = await callWithGasPrice(poolRunContract, 'withdraw', [converDeposit])
      const receipt = await tx.wait()

      if (receipt.status) {
        toastSuccess(
          t('Successful UnStake'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedUnStake(true)
        setPendingUnStaked(false)
        setClose(true)
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
    }
  }, [
    poolRunContract,
    t,
    converDeposit,
    toastError,
    toastSuccess,
    callWithGasPrice,
    setPendingUnStaked,
    onRefresh
  ])

  return { handleUnStaked, requestedUnStake, pendingUnStaked, isClose }
}
