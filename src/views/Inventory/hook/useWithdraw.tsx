import React, { useCallback, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import tokens from 'config/constants/tokens'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { useWithdrawNftRun } from 'hooks/useContract'

export const useTransfertoOffChain = (nftId, onRefresh) => {
    const [requested, setRequested] = useState(false)
    const { toastSuccess, toastError } = useToast()
    const { callWithGasPrice } = useCallWithGasPrice()
    const { t } = useTranslation()
    const widthdrawnContract = useWithdrawNftRun(getAddress(contract.withdrawNftRun));
    const [pendingTx, setPendingTx] = useState(false)
    const [isClose, setClose] = useState(false)
    
    const handleTransferToOffChain = useCallback(async () => {
        setPendingTx(true)
        try {
            const tx = 	await callWithGasPrice(widthdrawnContract, 'mintBoxOffChain', [nftId])
            const receipt = await tx.wait()
            if (receipt.status) {
                toastSuccess(
                t('Successfully'),
                <ToastDescriptionWithTx txHash={receipt.transactionHash}>
                    {t('You successfully tranfer boxes to off chain')}
                </ToastDescriptionWithTx>,
                )
                setRequested(true)
                setClose(true)
                onRefresh(Date.now())
            } else {
                // user rejected tx or didn't go thru
                toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
                setRequested(false)
            }
        } catch (e) {
            console.error(e)
            toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        } finally{
            setPendingTx(false)
        }
  }, [
    widthdrawnContract,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
    nftId,
    onRefresh
  ])

  return { handleTransferToOffChain, requested, pendingTx, isClose }
}
