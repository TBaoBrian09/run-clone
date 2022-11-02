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

export const useUnStake = (votingId) => {
    const [requestedUnStake, setRequestedUnStake] = useState(false)
    const { toastSuccess, toastError } = useToast()
    const { callWithGasPrice } = useCallWithGasPrice()
    const { t } = useTranslation()
    const votingContract = useVotingContract(getAddress(contract.votingProposals))
    const [ pendingUnStake, setPendingUnStake ] = useState(false)
    const handleUnStake = useCallback(async () => {
        setPendingUnStake(true)
        try {
        const tx = await callWithGasPrice(votingContract, 'unstakeVoter', [votingId])
        const receipt = await tx.wait()
        if (receipt.status) {
            toastSuccess(
            t('UnStake successful'),
            <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
            )
            setRequestedUnStake(true)
            setPendingUnStake(false)
        } else {
            // user rejected tx or didn't go thru
            toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
            setRequestedUnStake(false)
            setPendingUnStake(false)
        }
        } catch (e) {
        console.error(e)
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setPendingUnStake(false)
        } finally {
            setPendingUnStake(false)
        }
    }, [
        votingId,
        votingContract,
        t,
        toastError,
        toastSuccess,
        callWithGasPrice,
        setPendingUnStake,
    ])

  return { handleUnStake, requestedUnStake, pendingUnStake }
}
