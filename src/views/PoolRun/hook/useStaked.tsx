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

export const useStaked = (amount, onRefresh) => {
  const [requestedStake, setRequestedStake] = useState(false)
  const [ isClose, setClose ] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const poolRunContract = usePoolRunContract(getAddress(contract.poolRun))
  const [ pendingStaked, setPendingStaked ] = useState(false)
  const converDeposit = new BigNumber((amount*1E18).toString()).toString();
  const handleStaked = useCallback(async () => {
    setPendingStaked(true)
    try {
      
      const tx = await callWithGasPrice(poolRunContract, 'deposit', [converDeposit])
      const receipt = await tx.wait()

      if (receipt.status) {
        toastSuccess(
          t('Successful staking'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedStake(true)
        setPendingStaked(false)
        setClose(true)
        onRefresh(Date.now())
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedStake(false)
        setPendingStaked(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingStaked(false)
    }
  }, [
    poolRunContract,
    t,
    converDeposit,
    toastError,
    toastSuccess,
    callWithGasPrice,
    setPendingStaked,
    onRefresh
  ])

  return { handleStaked, requestedStake, pendingStaked, isClose }
}
