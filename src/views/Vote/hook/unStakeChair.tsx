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

export const useUnStakeChair = (votingId) => {
    const [requestedUnStakeChair, setRequestedUnStakeChair] = useState(false)
    const { toastSuccess, toastError } = useToast()
    const { callWithGasPrice } = useCallWithGasPrice()
    const { t } = useTranslation()
    const votingContract = useVotingContract(getAddress(contract.votingProposals))
    const [ pendingUnStakeChair, setPendingUnStakeChair ] = useState(false)
    const handleUnStakeChair = useCallback(async () => {
        setPendingUnStakeChair(true)
        try {
        const tx = await callWithGasPrice(votingContract, 'unstakeChair', [votingId])
        const receipt = await tx.wait()
        if (receipt.status) {
            toastSuccess(
            t('UnStake successful'),
            <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
            )
            setRequestedUnStakeChair(true)
            setPendingUnStakeChair(false)
        } else {
            // user rejected tx or didn't go thru
            toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
            setRequestedUnStakeChair(false)
            setPendingUnStakeChair(false)
        }
        } catch (e) {
        console.error(e)
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setPendingUnStakeChair(false)
        } finally {
            setPendingUnStakeChair(false)
        }
    }, [
        votingId,
        votingContract,
        t,
        toastError,
        toastSuccess,
        callWithGasPrice,
        setPendingUnStakeChair,
    ])

  return { handleUnStakeChair, requestedUnStakeChair, pendingUnStakeChair }
}
