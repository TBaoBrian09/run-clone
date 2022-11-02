import React, { useCallback, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'state'
import BigNumber from 'bignumber.js'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { useVotingContract } from 'hooks/useContract'
import { fetchCountProposals, fetchVoting, fetchVotingData } from 'state/votingProposals/fetchDataVoting'
import { fetchListProposals, fetchSnapShortVoting } from 'state/votingProposals/actions'

export const useVoting = (votingId, amount, options, onRefresh) => {
  const [requestedVoting, setRequestedVoting] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const partAmount = new BigNumber(amount)
  const converAmount = partAmount.multipliedBy(1E18).toString()
  const votingContract = useVotingContract(getAddress(contract.votingProposals))
  const [ pendingVoting, setPendingVoting ] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const handleVoting = useCallback(async () => {
    setPendingVoting(true)
    try {
      const tx = await callWithGasPrice(votingContract, 'stakeToVote', [votingId, converAmount, options])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Voting successful'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedVoting(true)
        setPendingVoting(false)
        onRefresh(Date.now())
       
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
    } finally {
        try { 
          const result = await fetchVotingData(Number(votingId))
          const resultVotingCount = await fetchCountProposals()
          const resultVoting = await fetchVoting(resultVotingCount.countProposals)
          dispatch(fetchSnapShortVoting(result))
          dispatch(fetchListProposals(resultVoting))
        } catch (e) {
            console.log(e)
        }
        setPendingVoting(false)
    }
  }, [
    converAmount,
    votingId,
    options,
    votingContract,
    dispatch,
    onRefresh,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
    setPendingVoting,
  ])

  return { handleVoting, requestedVoting, pendingVoting }
}
