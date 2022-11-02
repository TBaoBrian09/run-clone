import React, { useCallback, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import tokens from 'config/constants/tokens'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { useRunTogether } from 'hooks/useContract'
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from 'react-redux'
import { AppDispatch } from "state/index"
import { fetchBalanceNft } from 'state/marketplace/hook/fectDataMarketPlace';
import { fetchBalance } from "state/marketplace/actions"

export const useTransferAnotherWallet = (targetWallet, nftId, onRefresh) => {
    const [requested, setRequested] = useState(false)
    const { toastSuccess, toastError } = useToast()
    const { callWithGasPrice } = useCallWithGasPrice()
    const { t } = useTranslation()
    const { account } = useWeb3React()
    const runBoxContract = useRunTogether(getAddress(tokens.RunTogetherBox.address)) 
    const [pendingTx, setPendingTx] = useState(false)
    const [isClose, setClose] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const handleTransferToAnotherWallet = useCallback(async () => {
        setPendingTx(true)
        try {
            const tx = 	await callWithGasPrice(runBoxContract, 'transferFrom', [account, targetWallet, nftId])
            const receipt = await tx.wait()
            if (receipt.status) {
                toastSuccess(
                t('Successfully'),
                <ToastDescriptionWithTx txHash={receipt.transactionHash}>
                    {t('You successfully transfer boxes to another wallet')}
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
            setPendingTx(false);
            try {
                const result = await fetchBalanceNft(account)
                dispatch(fetchBalance(result))
            } catch (e) {
                console.log(e)
            }
        }
  }, [
    runBoxContract,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
    dispatch,
    account,
    targetWallet,
    nftId,
    onRefresh
  ])

  return { handleTransferToAnotherWallet, requested, pendingTx, isClose }
}
