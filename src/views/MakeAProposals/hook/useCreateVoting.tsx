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
import { useVotingContract } from 'hooks/useContract'

export const useCreateVoting = () => {
  const [requestedVoting, setRequestedVoting] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const tokenContract = useVotingContract(getAddress(contract.votingProposals))
  const [ pendingVoting, setPendingVoting ] = useState(false)
  const handleVoting = useCallback(async () => {
    setPendingVoting(true)
    try {
      const tx = await callWithGasPrice(tokenContract, 'stakeToOpenProposal', [])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Successful voting creation'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedVoting(true)
        setPendingVoting(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedVoting(false)
        setPendingVoting(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingVoting(false)
    }
  }, [
    tokenContract,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
    setPendingVoting,
  ])

  return { handleVoting, requestedVoting, pendingVoting }
}
